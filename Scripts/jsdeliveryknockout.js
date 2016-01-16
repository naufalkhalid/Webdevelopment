
/// <reference path="knockout-3.2.0.js" />


var GridMyDeliveries = function () {

    var ShowMyDeliveries = function () {

        var table = $('#grdDeliveries');

        var oTable = table.dataTable({
            "lengthMenu": [
                [10, 20, -1],
                [10, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "columnDefs": [{ // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "asc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#grdDeliveries_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            ShowMyDeliveries();
        }

    };

}();

function Delivery(data) {

    this.CreatedDate =  ko.observable(data.CreatedDate);
    this.OpenDeliveries = ko.observable(data.OpenDeliveries);
    this.Comments = ko.observable(data.Comments);
    this.Status = ko.observable(data.Status);
    this.ReceipientName = ko.observable(data.ReceipientName);

}



function DeliveryViewModel() {
    var self = this;
    
    self.Deliverys = ko.observableArray([]);
    
    self.DeleteDelivery = function (delivery) {
        
        //self.Deliverys.remove(delivery);
        $('#grdDeliveries').dataTable().fnDestroy();
        self.Deliverys.remove(delivery);
        //GridMyDeliveries.init();

    };

    $.ajax({
        type: "POST",
        url: 'MyDeliveries.aspx/GetDeliverys',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (results) {
            
            var deliveries = $.map(results.d, function (item) {
                return new Delivery(item)
            });
            self.Deliverys(deliveries);
        },
        error: function (err) {
            alert(err.status + " - " + err.statusText);
        }
    })
    

}

ko.bindingHandlers.doSomething = {
    update: function (element, valueAccessor) {
        
        if (ko.utils.unwrapObservable(valueAccessor()).length > 0) {
            GridMyDeliveries.init();
        }
        
    }
}


ko.bindingHandlers.date = {
    
    update: function (element, valueAccessor, allBindingsAccessor) {
        
        
        var value = ko.utils.unwrapObservable(valueAccessor());
        
        var allBindings = allBindingsAccessor();
        
        var format = allBindings.format || 'DD-MMM-YYYY hh:mm:ss'; // default format.
        
        if (value && value != 'Invalid Date') {

            var formattedDate = moment(value).format(format);
            if ($(element).is('input')) {
                $(element).val(formattedDate);
            } else {
                $(element).text(formattedDate);
            }
        } else {
            if ($(element).is('input')) {
                $(element).val('');
            } else {
                $(element).text('');
            }
        }
    }
};

$(document).ready(function () {  
    ko.applyBindings(new DeliveryViewModel());
   // GridMyDeliveries.init();
});
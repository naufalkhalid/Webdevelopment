

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

$(document).ready(function () {


    var Recp = "";
    GridMyDeliveries.init();
    $("#ContentPlaceHolder1_rptrDeliveries_thAction").removeClass("sorting");

    function ClearDelvFields() {
        Recp = "";
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $('#SelRecepient').val("");
        $('#txtDelivery').val("");
        $('#SelDelvstatus').val("");
        $('#txtDelvComments').val("");
        
    }

    function GetRecepients() {

        $.ajax({
            url: "MyDeliveries.aspx/GetRecepientInfo",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: RecepientsListSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }
    
    function RecepientsListSuccess(response) {

        var objRecepients = JSON.parse(response.d);
        $('#SelRecepient').empty();
        $('#SelRecepient').append("<option value=''>-------------------------------------Select-------------------------------------</option>");
        $.each(objRecepients, function (key, value) {
            $('#SelRecepient').append($("<option></option>").val(value.ID).html(value.FirstName + ' ' + value.LastName + ' (Unit: ' + value.Unit + ')'));
        });
        if(Recp == '')
            $('#SelRecepient').val('');
        else
            $('#SelRecepient').val(Recp);
            
    }
    $("#btnAddDelivery").click(function () {
        ClearDelvFields();
        GetRecepients();
        $("#hdnDelvRecID").val('0');
        $('#dialog-delivery-form').modal('show');
    });

    $("#btnAddDelv").click(function () {
        ValidateDeliveryForm();
    });

    function ValidateDeliveryForm() {
        var formDelv = $('#form_Delivery');
        var error1 = $('.alert-danger', formDelv);
        var success1 = $('.alert-success', formDelv);

        formDelv.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",  // validate all fields including form hidden input
            messages: {
                select_multi: {
                    maxlength: jQuery.validator.format("Max {0} items allowed for selection"),
                    minlength: jQuery.validator.format("At least {0} items must be selected")
                }
            },
            rules: {

                SelRecepient: {
                    required: true
                },

                txtDelivery: {
                    required: true
                },

                SelDelvstatus: {
                    required: true
                },

                txtDelvComments: {
                    required: true
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label) {

                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            submitHandler: function (form) {
                error1.hide();
                $('#dialog-delivery-form').modal('hide');
                var Delivery = {
                    ID: $("#hdnDelvRecID").val(),
                    OpenDeliveries: $("#txtDelivery").val(),
                    Comments: $("#txtDelvComments").val(),
                    Status: $("#SelDelvstatus option:selected").text()
                }
                var RecepientID = $("#SelRecepient option:selected").val();
                
                
                $.ajax({
                    url: "MyDeliveries.aspx/AddUpdateDelivery",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: "{'Delivery':" + JSON.stringify(Delivery) + "," + "'RecepientID':'" + RecepientID + "'}",
                    dataType: "json",
                    success: OnDeliveryAddUpdateSuccess,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });
               
            }
        });
    }

    function ValidateNotificationForm() {

            var formDelvNotif = $('#form_DeliveryNotification');
            var error1 = $('.alert-danger', formDelvNotif);
            var success1 = $('.alert-success', formDelvNotif);

            formDelvNotif.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                messages: {
                    select_multi: {
                        maxlength: jQuery.validator.format("Max {0} items allowed for selection"),
                        minlength: jQuery.validator.format("At least {0} items must be selected")
                    }
                },
                rules: {

                    txtMessage: {
                        required: true
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    success1.hide();
                    error1.show();
                    Metronic.scrollTo(error1, -200);
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {

                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    error1.hide();
                    var RecID = $("#hdnDelvRecID").val();
                    var NotifyMsg = $("#txtMessage").val();

                    $.ajax({
                        url: "MyDeliveries.aspx/SendDeliveryNotification",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: '{"RecID":"' + RecID + '","NotifyMsg":"' + NotifyMsg + '"}',
                        dataType: "json",
                        success: OnAddNotificationSuccess,
                        failure: function (response) {
                            //alert(response.d);
                        }
                    });

                }
            });
        }
    

    function OnDeliveryAddUpdateSuccess(response) {

        if (response.d == 'UnSuccessful') {
            if ($("#hdnDelvRecID").val() == '0')
                $(".msgtext").text('Delivery is not added.')
            else
                $(".msgtext").text('Delivery is not updated.');
            $('#dialog-message-Model').modal('show');

        }

        else {

            if ($("#hdnDelvRecID").val() == '0') {
                $(".msgtext").text('Delivery is added successfully.');
                $('#dialog-message-Model').modal('show');
                $('#grdDeliveries').dataTable().fnDestroy();
            }
            else {
                var deliveryid = '#' + $("#hdnDelRecID").val();
                $(".msgtext").text('Delivery is updated successfully.')
                $('#dialog-message-Model').modal('show');
                $('#grdDeliveries').dataTable().fnDestroy();
                $(deliveryid).remove();
            }

            $('#grdDeliveries > tbody').append(response.d);
            GridMyDeliveries.init();
            $("#ContentPlaceHolder1_rptrDeliveries_thAction").removeClass("sorting");
        }
    }


        $('#grdDeliveries').on('click', '.editDelivery', function (e) {
        GetRecepients();
        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelRecID").val(trid);
        $("#hdnDelvRecID").val($(this).attr("id"));
        var RecID = $("#hdnDelvRecID").val();
        
        $.ajax({
            url: "MyDeliveries.aspx/GetEditDelivery",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnEditDeliverySuccess,
            failure: function (response) {
                //alert(response.d);
            }
        }); 
    });

        $('#grdDeliveries').on('click', '.deleteDelivery', function (e) {
        
        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelRecID").val(trid);
        $("#hdnDelvRecID").val($(this).attr("id"));
        $('#deleteDeliveryModal').modal('show');

       });

        $('#grdDeliveries').on('click', '.notifydelivery', function (e) {

        var row_index = $(this).closest('tr').index();
        //var col_index = $(this).index();
        var row = $('input:first').val();
        var column = $('input:eq(5)').val();
        RecepentName = $('#sample_editable_1 tbody tr:eq(' + row_index + ') td:eq(4)').text() + ".";
        var Recep = "Delivery Notification To " + $('#sample_editable_1 tbody tr:eq(' + row_index + ') td:eq(4)').text();
        $("#hdnDelvRecID").val($(this).attr("id"));
        $("#hdelNotify").text(Recep);
        $('#delNotificationModel').modal('show');

    });

    $("#btnNotifyYes").click(function () {
        ValidateNotificationForm();
    });

    function OnAddNotificationSuccess(response) {
        
        $('#delNotificationModel').modal('hide');
        $(".msgtext").text(response.d + RecepentName)
        $('#dialog-message-Model').modal('show');
    }

    $("#btnDeliveryYes").click(function () {
    
    
        var RecID = $("#hdnDelvRecID").val();

        $.ajax({
            url: "MyDeliveries.aspx/DeleteDelivery",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnDeleteDeliverySuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });

    });

    function OnDeleteDeliverySuccess(response) {
        switch(response.d)
        {
            case "True": 
                var deliveryid = '#' + $("#hdnDelRecID").val();
                $(".msgtext").text("Delivery is deleted successfully.")
                $('#dialog-message-Model').modal('show');
                $('#grdDeliveries').dataTable().fnDestroy();
                $(deliveryid).remove();
                GridMyDeliveries.init();
                $("#ContentPlaceHolder1_rptrDeliveries_thAction").removeClass("sorting");
                break;

            case "False":
                $(".msgtext").text("Delivery is not deleted.");
                $('#dialog-message-Model').modal('show');
                break;
        }
}

    

    function OnEditDeliverySuccess(response) {
        var objDelivery = JSON.parse(response.d);
        $.each(objDelivery, function (key, value) {
            Recp = value.CustProdID;
            $('#SelRecepient').val(value.CustProdID);
            $("#txtDelivery").val(value.OpenDeliveries);
            $("#txtDelvComments").val(value.Comments);
            $('[id=SelDelvstatus] option').filter(function () {
                return ($(this).text() == value.Status);
            }).prop('selected', true);
        });
        $('#dialog-delivery-form').modal('show');
    }
    
});

var goTablel;
var gnRow;
var TableEditableVehicle = function () {

    var handleTable = function () {


        function editRow(oTable, nRow) {
            clearvehicle();
            var aData = oTable.fnGetData(nRow);
            goTablel = oTable;
            gnRow = nRow;
            $('#hfVehicleId').val(aData[0]);
            $('#color').val(aData[1]);
            $('#year').val(aData[2]);
            $('#make').val(aData[3]);
            $('#model').val(aData[4]);
            $('#license').val(aData[5]);
            $('#state').val(aData[6]);
            $('#location').val(aData[7]);
            $('#comments').val(aData[8]);
            if (aData[9] == 'True') {
                var active = $('#isactive');
                active.parent('span').addClass('checked');
            }
            else {
                var active = $('#isactive');
                active.parent('span').removeClass('checked');
            }
            $('#users').val(aData[10]);

            $("#dialog-Vehicle").modal('show');
            $('#btnaddvehicle').css('display', 'none');
            $('#btnupdatevehicle').css('display', 'normal');
        }
        var table = $('#sample_editable_1_Vehicle');
        var oTable = table.dataTable({
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 5,

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

        table.on('click', '.edit', function (e) {
            e.preventDefault();
            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];
            editRow(oTable, nRow);
        });
    }
    return {
        //main function to initiate the module
        init: function () {
            handleTable();
            var isactive = true;
            $('#showinactive').on('click', function () {
                if ($("#showinactive").parent().attr('class') == 'checked') {
                    isactive = false;
                }
                else {
                    isactive = true;
                }
                $.ajax({
                    url: "Profile.aspx/loadVehicle",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function (e) { $('#loadingmessage').show(); },
                    data: '{"active":"' + isactive + '"}',
                    dataType: "json",
                    success: onloadVehiclesucess,
                    complete: function (e) { $('#loadingmessage').hide(); },
                    failure: function (response) {
                        //alert(response.d);
                    }
                });

            });
        }
    };
}();


$('#btnShowAddVehicle').on('click', function () {
    $("#dialog-Vehicle").modal('show');
    $('#btnaddvehicle').css('display', '');
    $('#btnupdatevehicle').css('display', 'none');
    clearvehicle();
});
function ongetusersucess(response) {
    var obj = $.parseJSON(response.d);
    $.each(obj, function (key, value) {
        $('#users').append("<option  value='" + key + "'>" + value + "</option>")
    });
}
$('#btnaddvehicle').on('click', function () {
    $("#btnAddupdate").val($("#btnaddvehicle").val());
    ValidateVehicle();
});
function OnAddVehicleSuccess(response) {
    if (response.d != null) {
        $('#rptVehicles').html(response.d);
        $("#showinactive").parent().removeAttr('class')
        $("#EmgrContactInfo").text("Vehicle Added Sucessfully...");
        $('#dialog-EmgrContactInfo').modal('show');
    }
    else {
        $("#EmgrContactInfo").text("Vehicle Not Added...");
        $('#dialog-EmgrContactInfo').modal('show');
    }
    TableEditableVehicle.init();
}
$('#btnupdatevehicle').on('click', function () {
    $("#btnAddupdate").val($("#btnupdatevehicle").val());

    ValidateVehicle();
});
function OnUpdateVehicleSuccess(response) {
    if (response.d != null) {
        $('#rptVehicles').html(response.d);
        $("#showinactive").parent().removeAttr('class')
        $("#EmgrContactInfo").text("Vehicle Updated Sucessfully...");
        $('#dialog-EmgrContactInfo').modal('show');
    }
    else {
        $("#EmgrContactInfo").text("Vehicle Not Updated ...");
        $('#dialog-EmgrContactInfo').modal('show');
    }
    TableEditableVehicle.init();
}
function clearvehicle() {
    $('#hfVehicleId').val('0');
    $('#color').val('');
    $('#year').val('');
    $('#make').val('');
    $('#model').val('');
    $('#license').val('');
    $('#state').val('');
    $('#location').val('');
    $('#comments').val('');
    var active = $('#isactive');
    active.parent('span').removeClass('checked');

}
// Naufal Code
//Naufal Code
function AddVehicle() {
    var color = $('#color').val();
    var year = $('#year').val();
    var make = $('#make').val();
    var model = $('#model').val();
    var license = $('#license').val();
    var state = $('#state').val();
    var location = $('#location').val();
    var comments = $('#comments').val();
    var user = $("#users option:selected").val();
    var active = false;
    if ($('#isactive').parents('.checked').length) {
        active = true;
    }

    var Vehicle = {
        Colour: color,
        Year: year,
        Make: make,
        Model: model,
        License: license,
        State: state,
        Location: location,
        Comments: comments,
        IsActive: active,
        UserId: user
    };
    $.ajax({
        url: "Profile.aspx/AddVehicle",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        data: "{Vehicle:" + JSON.stringify(Vehicle) + "}",
        dataType: "json",
        success: function (response) {
            OnAddVehicleSuccess(response);
        },
        complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });

}
function UpdateVehicle() {
    var vehicleid = $('#hfVehicleId').val();
    var color = $('#color').val();
    var year = $('#year').val();
    var make = $('#make').val();
    var model = $('#model').val();
    var license = $('#license').val();
    var state = $('#state').val();
    var location = $('#location').val();
    var comments = $('#comments').val();
    var user = $("#users option:selected").val();
    // var active = $('#isactive').prop('checked');
    var active = false;
    if ($('#isactive').parents('.checked').length > 0) {
        active = true;
    }
    var Vehicle = {
        VehicleId: vehicleid,
        Colour: color,
        Year: year,
        Make: make,
        Model: model,
        License: license,
        State: state,
        Location: location,
        Comments: comments,
        IsActive: active,
        UserId: user
    };
    $.ajax({
        url: "Profile.aspx/UpdateVehicle",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        data: "{ 'Vehicle':" + JSON.stringify(Vehicle) + "}",
        dataType: "json",
        success: function (response) {
            OnUpdateVehicleSuccess(response);
        },
        complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });



}
function ValidateVehicle() {

    var formep = $('#form_Profile');
    var error1 = $('.alert-danger', formep);
    var success1 = $('.alert-success', formep);

    formep.validate({

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

            users: {
                required: true
            },

            color: {
                required: true
            },

            make: {
                required: true
            },

            year: {
                required: true
            },
            model: {
                required: true

            },
            license: {
                required: true
            },
            state: {
                required: true
            },
            location: {
                required: true
            },

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
            if ($("#btnAddupdate").val() == "Update") {

                UpdateVehicle();
                $("#dialog-Vehicle").modal('hide');
            }
            if ($("#btnAddupdate").val() == "Add") {

                AddVehicle();
                $("#dialog-Vehicle").modal('hide');
            }
        }
    });

    $("#btnactive").click(function () {
        alert("activate");


    });
}
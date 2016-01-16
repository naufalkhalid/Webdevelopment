/// <reference path="../bootstrap-formhelpers.js" />

var GridMasters = function () {

    var GridMastersTable = function () {

        var table = $('#grdMasters');

        var oTable = table.dataTable({
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
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

        var tableWrapper = $("#grdMasters_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridMastersTable();
        }

    };

}();

$(document).ready(function () {

    GridMasters.init();
    function ValidateMasterForm() {
        var MastersForm = $('#FormMasters');
        var error1 = $('.alert-danger', MastersForm);
        var success1 = $('.alert-success', MastersForm);

        MastersForm.validate({
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

                SelTitle: {
                    required: true
                },

                SelDeveloper: {
                    required: true
                },

                txtBuilding: {
                    required: true
                },

                txtAddr1: {
                    required: true
                },

                txtAddr2: {
                    required: true
                },
                txtPhone: {
                    required: true
                },
                txtContact: {
                    required: true
                },
                txtEmail: {
                    required: true
                },
                SelCountry: {
                    required: true
                },
                SelState: {
                    required: true
                },
                txtCity: {
                    required: true
                },
                txtZip: {
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
                $('#dialog_masters_form').modal('hide');

                var ID = $('#hdnID').val();

                var Title = $('#SelTitle option:selected').text();
                var Developer = $('#txtDeveloper').val();
                var Building = $('#txtBuilding').val();
                var Addr1 = $('#txtAddr1').val();
                var Addr2 = $('#txtAddr2').val();
                var Phone = $('#txtPhone').val();
                var Contact = $('#txtContact').val();
                var Email = $('#txtEmail').val();
                var Country = $('#SelCountry option:selected').val();
                var State = $('#SelState option:selected').val();
                var City = $('#txtCity').val();
                var Zip = $('#txtZip').val();

                $.ajax({
                    url: "BuildingDevelopers.aspx/AddMaster",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: '{"ID":"' + ID + '","Title":"' + Title + '","Developer":"' + Developer + '","Building":"' + Building + '","Addr1":"' + Addr1 + '","Addr2":"' + Addr2 + '","Phone":"' + Phone + '","Contact":"' + Contact + '","Email":"' + Email + '","Country":"' + Country + '","State":"' + State + '","City":"' + City + '","Zip":"' + Zip + '"}',
                    dataType: "json",
                    beforeSend: function () {
                        $('body').loader('show', { overlay: true });
                    },
                    success: OnAddMasterSuccess,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });
            }
        });
    }


    function OnAddMasterSuccess(response) {

        if (response.d == "UnSuccessful") {

            if ($('#hdnID').val() == "0") {
                $('body').loader('hide');
                $('#MastMsg').text("Building Master is not added!");
                $('#MsgMasterModel').modal('show');
            }

            else {
                $('body').loader('hide');
                $('#MastMsg').text("Building Master is not updated!");
                $('#MsgMasterModel').modal('show');
            }
        }

        else {
            if ($('#hdnID').val() == "0") {
                $('body').loader('hide');
                $('#MastMsg').text("Building Master is added successfully!");
                $('#MsgMasterModel').modal('show');
                $('#grdMasters').dataTable().fnDestroy();
                $('#grdMasters > tbody').append(response.d);
                GridMasters.init();
            }

            else {
                var masterid = '#' + $("#hdnDelCatID").val();
                $('body').loader('hide');
                $('#MastMsg').text("Building Master is updated successfully!");
                $('#MsgMasterModel').modal('show');
                $('#grdMasters').dataTable().fnDestroy();
                $(masterid).remove();
                $('#grdMasters > tbody').append(response.d);
                GridMasters.init();
            }
        }
    }

    $("#btnAddMaster").click(function () {
        $('#hdnID').val('0');
        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            $('#dialog_masters_form').modal('show');
        }, 2000);
    });

    $('#dialog_developers_form').on('show.bs.modal', function () {
        $('body').loader('hide');
    });

    $('#grdMasters').on('click', '.editMaster', function (e) {


        $('body').loader('show', { overlay: true });
        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $('#hdnID').val(trid);
        var RecID = $('#hdnID').val();

        $.ajax({
            url: "BuildingDevelopers.aspx/GetMasterByID",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"ID":"' + RecID + '"}',
            dataType: "json",
            success: OnEditMasterSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });

    });

    function OnEditMasterSuccess(response) {
        var objMaster = JSON.parse(response.d);
        $.each(objMaster, function (key, value) {
            $("#SelTitle").val(value.Title);
            $("#txtDeveloper").val(value.DeveloperName);
            $("#txtAddr1").val(value.Addr1);
            $("#txtAddr2").val(value.Addr2);
            $("#txtPhone").val(value.Phone);
            $("#txtContact").val(value.Contact);
            $("#txtEmail").val(value.Email);
            $("#SelCountry").val(value.Country);
            $("#txtCity").val(value.City);
            $("#txtZip").val(value.Zip);
        });

        $('#dialog_masters_form').modal('show');
    }

    $('#grdMasters').on('click', '.delMaster', function (e) {

        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $('#hdnID').val(trid);
        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            $('#DeleteMastModel').modal('show');
        }, 2000);
    });

    $('#DeleteMastModel').on('show.bs.modal', function () {
        $('body').loader('hide');
    });

    $('#dialog_masters_form').on('show.bs.modal', function () {
        $('body').loader('hide');
    });


    $("#btnSubmitMaster").click(function () {
        ValidateMasterForm();
    });


    $("#btndelmastYes").click(function () {

        $('body').loader('show', { overlay: true });

        var RecID = $('#hdnID').val();

        $.ajax({
            url: "BuildingDevelopers.aspx/DeleteMaster",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"ID":"' + RecID + '"}',
            dataType: "json",
            success: OnDeleteMasterSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnDeleteMasterSuccess(response) {

        if (response.d == "Successful") {
            var masterid = '#' + $('#hdnID').val();
            $("#MastMsg").text("Building Master is deleted successfully!")
            $('#MsgMasterModel').modal('show');
            $('#grdMasters').dataTable().fnDestroy();
            $(masterid).remove();
            GridMasters.init();
        }
        else {
            $("#MastMsg").text("Building Master is not deleted.");
            $('#MsgMasterModel').modal('show');
        }
    }

    $("#SelCountry").change(function () {
        
    });
});


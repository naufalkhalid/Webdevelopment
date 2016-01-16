
var nRow;
function callonreadyServiceCompanydetail() {

    var TableEditableServiceComDetail = function () {

        var handleTable = function () {
            function editSerComDet(oTable, nRow) {
                clearSerComDet();
                var aData = oTable.fnGetData(nRow);
                goTablel = oTable;
                gnRow = nRow;
                $('#hfSerComDetId').val($(aData[0]).text());
                $('#companyname').val($(aData[1]).text());
                //$('#companyname').addClass('select2-allowclear')
                $('#status').val($(aData[3]).text());
                $('#evalvisitamount').val($(aData[4]).text());
                $('#repamtoven').val($(aData[5]).text());
                $('#repamtfrigh').val($(aData[6]).text());
                $('#repamtdw').val($(aData[7]).text());
                $('#repamtwasher').val($(aData[8]).text());
                $('#repamtdryer').val($(aData[9]).text());
                $('#comppercentage').val($(aData[10]).text());
                $('#pemspercentage').val($(aData[11]).text());
                $('#corpredevper').val($(aData[12]).text());
                $('#startdate').datepicker("setDate", $(aData[13]).text());
                $('#enddate').datepicker("setDate", $(aData[14]).text());

                $("#dialog-ServiceComDet").modal('show');
                $('#btnaddupdateSerCompDet').text('Update Service Company Detail');
                //$('#btnaddvehicle').css('display', 'none');
            }

            function deleteSerComDet(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                goTablel = oTable;
                gnRow = nRow;
                $('#hfSerComDetId').val($(aData[0]).text());
                deleteServiceCompanyDetail($(aData[0]).text());
            }

            var table = $('#editable_SerComDet');
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
                nRow = $(this).parents('tr')[0];
                editSerComDet(oTable, nRow);
            });
            table.on('click', '.delete', function (e) {
                e.preventDefault();
                /* Get the row as a parent of the link that was clicked on */
                nRow = $(this).parents('tr')[0];
                deleteSerComDet(oTable, nRow);
            });
        }
        return {
            //main function to initiate the module
            init: function () {
                handleTable();
                var isactive = true;
            }
        };
    }();
    $('#addSERVICECODET').click(function () {
        nRow = null;
        clearSerComDet();
        $('#dialog-ServiceComDet').modal('show');
    });
    TableEditableServiceComDetail.init();
    $('#btnSerComDetCancel').click(function () {
        //clearSerComDet();
    });
    function OnsaveServiceCompantDetailsSuccess(response) {
        if (response != "False") {
            if (nRow != null) {
                $('#editable_SerComDet').dataTable().fnDestroy();
                $(nRow).remove();
            }
            else {
                $('#editable_SerComDet').dataTable().fnDestroy();
            }
            $('#editable_SerComDet > tbody').append(response);
            TableEditableServiceComDetail.init();
            $('#msgSerComDet').text("Service Company Detail Inserted/Updated Sucessfully...");
            $('#dialog-ServiceCompanayDetail').modal('show');
        }
        else {
            $('#msgSerComDet').text("Service Company Detail Inserted/Updated Unsucessfully...");
            $('#dialog-ServiceCompanayDetail').modal('show');
        }
    }
    function addServiceCompanyDetail() {
        var obj = {
            CO_ID: $('#companyname').val(),
            STATUS: $('#status').val(),
            EVAL_VISIT_AMOUNT: $('#evalvisitamount').val(),
            REP_AMT_OVEN: $('#repamtoven').val(),
            REP_AMT_FRIG: $('#repamtfrigh').val(),
            REP_AMT_DW: $('#repamtdw').val(),
            REP_AMT_WASHER: $('#repamtwasher').val(),
            REP_AMT_DRYER: $('#repamtdryer').val(),
            COMP_PERCENTAGE: $('#comppercentage').val(),
            PREM_S_PERCENTAGE: $('#pemspercentage').val(),
            CORP_RE_DEV_PERCENTAGE: $('#corpredevper').val(),
            START_DATE: $('#startdate').val(),
            END_DATE: $('#enddate').val(),
            SVCE_CO_DET_ID: $('#hfSerComDetId').val()

        };
        var formData = new FormData();
        formData.append('insertupdate', true);
        formData.append('SerComDetail', JSON.stringify(obj));
        $("#dialog-ServiceComDet").modal('hide');
        $.ajax({
            url: "Controls/ServiceCompanyDetail.ashx",
            type: "POST",
            beforeSend: function (e) { $('#loadingmessage').show(); },
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: OnsaveServiceCompantDetailsSuccess,
            complete: function (respose) {
                $('#loadingmessage').hide();
            },
            failure: function (response) {
                $('#loadingmessage').hide();
                $('#msgSerComDet').text(response.d);
                $('#dialog-ServiceCompanayDetail').modal('show');
                ////alert(response.d);
            }
        });
    }
    function Validate() {

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
                companyname: {
                    required: true
                },

                status: {
                    required: true
                }
                ,
                evalvisitamount: {
                    required: true,
                    number: true,
                    maxlength: 6
                },

                repamtoven: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                repamtfrigh: {
                    required: true,
                    number: true,
                    maxlength: 6

                },
                repamtdw: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                repamtwasher: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                repamtdryer: {
                    required: true,
                    number: true,
                    maxlength: 6
                }
                ,
                comppercentage: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                pemspercentage: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                corpredevper: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                startdate: {
                    required: true,
                    date: true
                },
                enddate: {
                    required: true,
                    date: true
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
                var StartDate = $("#startdate").val().replace("-", "");
                var EndDate = $("#enddate").val().replace("-", "");

                var Date1 = new Date(StartDate);
                var Date2 = new Date(EndDate);

                if ((Date1 - Date2) > 0) {
                    alert('End Date should be greater than Start Date.');
                    return false;
                }

                //if ($("#btnaddupdateSerCompDet").text() == "Add Service Company Detail") {
                //    addServiceCompanyDetail();
                //    //$("#dialog-Vehicle").modal('hide');
                //}
                //if ($("#btnaddupdateSerCompDet").text() == "Update Service Company Detail") {
                //    updateServiceCompanyDetail();
                //    //$("#dialog-Vehicle").modal('hide');
                //}
                addServiceCompanyDetail();
            }
        });

        //$("#btnactive").click(function () {
        //    alert("activate");


        //});
    }
    $('#btnaddupdateSerCompDet').button().click(function () {
        Validate();
    });
    function clearSerComDet() {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $("input:text").val('');
        $("select").val('');

    }

    function deleteServiceCompanyDetail(SerComDetId) {
        var formData = new FormData();
        formData.append('delete', true);
        formData.append('SerComDetailId', SerComDetId);
        $.ajax({
            url: "Controls/ServiceCompanyDetail.ashx",
            type: "POST",
            beforeSend: function (e) { $('#loadingmessage').show(); },
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: OndeleteServiceCompantDetailsSuccess,
            complete: function (response) {
                $('#loadingmessage').hide();
            },
            failure: function (response) {
                $('#loadingmessage').hide();
                //alert(response.d);
            }
        });
    }
    function OndeleteServiceCompantDetailsSuccess(response) {
        if (response != "False") {
            if (nRow != null) {
                $('#editable_SerComDet').dataTable().fnDestroy();
                $(nRow).remove();
                TableEditableServiceComDetail.init();
            }
            $('#msgSerComDet').text("Service Company Detail Delete Sucessfully...");
            $('#dialog-ServiceCompanayDetail').modal('show');
        }
        else {
            $('#msgSerComDet').text("Service Company Detail Delete Unsucessfully...");
            $('#dialog-ServiceCompanayDetail').modal('show');
        }
    }

}
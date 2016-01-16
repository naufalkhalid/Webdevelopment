
var nRow;
function callonreadyInsuranceDetail() {

    var TableEditableInsuranceDetail = function () {

        var handleTable = function () {
            function editInsDet(oTable, nRow) {
                clearInsDet();
                var aData = oTable.fnGetData(nRow);
                goTablel = oTable;
                gnRow = nRow;
                $('#hfInsDetId').val($(aData[0]).text());
                $('#companyname').val($(aData[1]).text());
                $('#clientname').val($(aData[2]).text());
                $('#clinettype').val($(aData[5]).text());
                $('#productname').val($(aData[6]).text());
                $('#type').val($(aData[7]).text());
                $('#corpamount').val($(aData[8]).text());
                $('#psamount').val($(aData[9]).text());
                $('#term').val($(aData[10]).text());
                $('#startdate').val($(aData[11]).text());
                $('#enddate').val($(aData[12]).text());
                $('#inputpercentage').val($(aData[13]).text());
                $('#clientpercentage').val($(aData[14]).text());
                $('#refername').val($(aData[15]).text());
                $('#referpercentage').val($(aData[16]).text());

                $("#dialog-InsDet").modal('show');
                $('#btnaddupdateInsDet').text('Update Insurance Detail');
                //$('#btnaddvehicle').css('display', 'none');
            }

            function deleteInsDet(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                goTablel = oTable;
                gnRow = nRow;
                $('#hfInsDetId').val($(aData[0]).text());
                deleteInsuranceDetail($(aData[0]).text());
            }

            var table = $('#editable_InsDet');
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
                editInsDet(oTable, nRow);
            });
            table.on('click', '.delete', function (e) {
                e.preventDefault();
                /* Get the row as a parent of the link that was clicked on */
                nRow = $(this).parents('tr')[0];
                deleteInsDet(oTable, nRow);
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
    $('#addINSDET').click(function () {
        nRow = null;
        clearInsDet();
        $('#dialog-InsDet').modal('show');
    });
    TableEditableInsuranceDetail.init();
    //$('#btnSerComDetCancel').click(function () {
    //    //clearInsDet();
    //});
    function OnsaveInsuranceDetailsSuccess(response) {
        if (response != "False") {
            if (nRow != null) {
                $('#editable_InsDet').dataTable().fnDestroy();
                $(nRow).remove();
            }
            else {
                $('#editable_InsDet').dataTable().fnDestroy();
            }
            $('#editable_InsDet > tbody').append(response);
            TableEditableInsuranceDetail.init();
            $('#msgInsDet').text("Insurance Detail Inserted/Updated Sucessfully...");
            $('#dialog-InsDetail').modal('show');
        }
        else {
            $('#msgInsDet').text("Insurance Detail Inserted/Updated Unsucessfully...");
            $('#dialog-InsDetail').modal('show');
        }
    }
    function addInsuranceDetail() {
        var obj = {
            INS_DETAIL_ID: $('#hfInsDetId').val(),
            CO_ID: $('#companyname').val(),
            CLIENT_ID: $('#clientname').val(),
            CLIENTTYPE: $('#clinettype').val(),
            PRODUCT_ID: $('#productname').val(),
            TYPE: $('#type').val(),
            CO_AMOUNT: $('#corpamount').val(),
            PS_AMOUNT: $('#psamount').val(),
            TERM: $('#term').val(),
            STARTDATE: $('#startdate').val(),
            ENDDATE: $('#enddate').val(),
            INPUT_PERCENTAGE: $('#inputpercentage').val(),
            CLIENT_PERCENTAGE: $('#clientpercentage').val(),
            REFER_ID: $('#refername').val(),
            REFER_ID_PERCENTAGE: $('#referpercentage').val()
        };
        var formData = new FormData();
        formData.append('insertupdate', true);
        formData.append('InsDetail', JSON.stringify(obj));
        $("#dialog-InsDet").modal('hide');
        $.ajax({
            url: "Controls/InsuranceDetail.ashx",
            type: "POST",
            beforeSend: function (e) { $('#loadingmessage').show(); },
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: OnsaveInsuranceDetailsSuccess,
            complete: function (respose) {
                $('#loadingmessage').hide();
            },
            failure: function (response) {
                $('#loadingmessage').hide();
                $('#msgInsDet').text(response.d);
                $('#dialog-InsDetail').modal('show');
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
                clientname: {
                    required: true
                },
                clinettype: {
                    required: true
                },
                productname: {
                    required: true
                },
                type: {
                    required: true
                },
                corpamount: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                psamount: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                term: {
                    required: true
                },
                startdate: {
                    required: true,
                    date: true
                },
                enddate: {
                    required: true,
                    date: true
                },
                inputpercentage: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                clientpercentage: {
                    required: true,
                    number: true,
                    maxlength: 6
                },
                refername: {
                    required: true
                },
                referpercentage: {
                    required: true,
                    number: true,
                    maxlength: 6
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
                addInsuranceDetail();
            }
        });
    }
    $('#btnaddupdateInsDet').button().click(function () {
        Validate();
    });
    function clearInsDet() {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $("input:text").val('');
        $("select").val('');

    }

    function deleteInsuranceDetail(InsDetId) {
         var formData = new FormData();
         formData.append('delete', true);
         formData.append('InsDetailId', InsDetId);
         $.ajax({
             url: "Controls/InsuranceDetail.ashx",
             type: "POST",
             beforeSend: function (e) { $('#loadingmessage').show(); },
             contentType: false,
             processData: false,
             data: formData,
             dataType: "json",
             success: OndeleteInsuranceDetailsSuccess,
             complete: function (response) {
                 $('#loadingmessage').hide();
             },
             failure: function (response) {
                 $('#loadingmessage').hide();
                 //alert(response.d);
             }
         });
     }
    function OndeleteInsuranceDetailsSuccess(response) {
         if (response != "False") {
             if (nRow != null) {
                 $('#editable_InsDet').dataTable().fnDestroy();
                 $(nRow).remove();
                 TableEditableInsuranceDetail.init();
             }
             $('#msgInsDet').text("Insurance Detail Delete Sucessfully...");
             $('#dialog-InsDetail').modal('show');
         }
         else {
             $('#msgInsDet').text("Insurance Detail Delete Unsucessfully...");
             $('#dialog-InsDetail').modal('show');
         }
     }
      
}
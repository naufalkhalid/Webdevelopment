var GridProvince = function () {

    var GridProvinceTable = function () {

        var table = $('#grdProvince');

        var oTable = table.dataTable({
            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
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
            "saveState": true,
            "order": [[0, "desc"]] // set first column as a default sort by asc
        });

        var tableWrapper = $("#grdProvince_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridProvinceTable();
        }

    };

}();

$(document).ready(function () {
    GridProvince.init();
    $.fn.datepicker.defaults.format = "mm/dd/yyyy";
    $("#btnOpenprovinceForm").click(function () {
        $('body').loader('show', { overlay: true });
        clear();
        LoadProvince();
        $("#hdnRecordID").val("0");
        $("#dialog-province").modal("show");
        $('body').loader('hide');
    });

    function clear() {
        $("input[type=text]").val("");
        $("#txttaxinfo").val("");
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $("#SelState").removeAttr("disabled");
        $('.alert-danger').hide();
        $("#Hdr_MyCal_Form").text("Add Province");
    }
    $("#btnmanagetax").click(function () {
        window.location.href = "Province.aspx";
    });
    $("#btnCancelEvent").click(function () {
        $('body').loader('hide');

    });

    function LoadProvince() {
        $.ajax({
            url: "Provincetax.aspx/GetProvince",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            async: false,
            success: OnGetProvince,

            error: function () {
                $('body').loader('hide');
                //alert("error ");

            }
        });
    }
    function OnGetProvince(response) {

        $("#SelState").empty();


        $("#SelState").append($("<option></option>").val("").html("----Select----"));

        var objRecord = JSON.parse(response.d);
        $.each(objRecord, function (key, value) {
            //$("#Status").parent().find('.select2-chosen').text(value.statusID);

            $("#SelState").append($("<option></option>").val(value.Province_ID).html(value.ProvinceName));


        });
    }

    $("#startdate").focusin(function () {

        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
        $('#startdate').datepicker({
            startDate: today,
            autoclose: true


        });
    });
    $("#enddate").focusin(function () {

        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
        $('#enddate').datepicker({
            startDate: today,
            autoclose: true

        });
    });
    $("#btnSubmitEvent").click(function () {

        ValidateProvince();


    });
    function ValidateProvince() {
        var Formprovince = $('#Formprovince');
        var error1 = $('.alert-danger', Formprovince);
        var success1 = $('.alert-success', Formprovince);

        Formprovince.validate({
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

                txtgst: {
                    required: true,
                    number: true
                },
                txtpst: {
                    required: true,
                    number: true
                },
                txthst: {
                    required: true,
                    number: true
                },
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
                txttaxinfo: {
                    required: true
                },
                SelState: {
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
               

                var ID = $("#hdnRecordID").val();
                var txtPval = $(".bfh-states").val();
                var txtgst = $("#txtgst").val();
                var txtpst = $("#txtpst").val();
                var txthst = $("#txthst").val();
                var txttaxinfo = $("#txttaxinfo").val();
               

                var StartDate = $('#startdate').val();
                var endDate = $('#enddate').val();
                var Date1 = new Date(endDate);

                var Date2 = new Date(StartDate);
                
                if ((Date2 - Date1) > 0) {

                    //alert('End Date should be greater than Start Date.');
                    $("#msg_txt1").text("End Date should be greater than Start Date.");
                    $("#success1").modal("show");
                    return false;
                    
                }
                else {
                  
                    $.ajax({
                        url: "Provincetax.aspx/AddUpdateTask",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: '{"ID":"' + ID + '","Pval":"' + txtPval + '","GST":"' + txtgst + '","PST":"' + txtpst + '","HST":"' + txthst + '","Info":"' + txttaxinfo + '","startdate":"' + StartDate + '","enddate":"' + endDate + '"}',
                        dataType: "json",
                        success: OnAddEventSuccess,
                        failure: function (response) {
                            //alert(response.d);
                        }
                    });
                }
            }
        });
    }


    function OnAddEventSuccess(response) {
        if (response.d == "Repeat") {
            $("#msg_txt1").text("Province Taxes Are Already Added");
            $("#success1").modal("show");
        }
        else {
            $("#msg_txt1").text("Success");
            $("#success1").modal("show");
            $("#dialog-province").modal("hide");
            var ClientID = "0";
            var recordid = '#' + $("#hdnRecordID").val();
            $('#grdProvince').dataTable().fnDestroy();
            $(recordid).remove();
            $('#grdProvince > tbody').append(response.d);
            GridProvince.init();
            Currentpage($('#hfcurrpage').val());
        }
    }
    
    $('#grdProvince').on('click', '.EditServRepairs', function (e) {
        $('body').loader('show', { overlay: true });
        $("#hfcurrpage").val($('.pagination .active a').text());
        $("#hdnRecordID").val($(this).closest("tr").attr("id"));
        var trids = $(this).closest("tr").attr("id");

        $.ajax({
            url: "Provincetax.aspx/GetRepairRecord",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + trids + "'}",
            async: true,
            success: OnGetRepairRecord,

            error: function () {
                //alert("error ");

            }
        });
    });
    $('#grdProvince').on('click', '.DeleteServRepairs', function (e) {
        $('body').loader('show', { overlay: true });
        var trids = $(this).closest("tr").attr("id");
        $("#hdnRecordID").val($(this).closest("tr").attr("id"));
        $("#dialog-del-message-Model").modal("show");
        $('body').loader('hide');
    });


    function OnGetRepairRecord(response) {
        $("#Hdr_MyCal_Form").text("Update Service Request:");
        $("#dialog-province").modal("show");
        $("#SelState").attr("disabled", "disabled");
        var objEditres = JSON.parse(response.d);

        $.each(objEditres, function (key, value) {

            //$("#txtpname").val(value.ProvinceName);
            //$("#txtPabbri").val(value.ProvinceAbbreviation);
            LoadProvince();
            $('#SelState').val(value.Province_ID);
            $("#SelState").parent().find(".select2-chosen").text(value.ProvinceName);

            $("#txtgst").val(value.GSTPercentage);
            $("#txtpst").val(value.PSTPercentage);
            $("#txthst").val(value.HSTPercentage);
            $("#txttaxinfo").val(value.ProTaxInfo);
            var d = new Date(value.startdate);
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();
            var serdate = curr_month + "/" + curr_date + "/" + curr_year;


            $('#startdate').datepicker("setDate", serdate);

            var d = new Date(value.enddate);
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();
            var serdate = curr_month + "/" + curr_date + "/" + curr_year;
            $("#enddate").datepicker("setDate", serdate);



        });
        $('body').loader('hide');
    }

    $("#btnSRDelYes").click(function () {
        var id = $("#hdnRecordID").val();

        $.ajax({
            url: "Provincetax.aspx/DeleteRecord",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "'}",
            async: true,
            success: OnDeleteSuccess,

            error: function () {
                //alert("error ");

            }
        });
    });
    function OnDeleteSuccess() {
        var recordid = '#' + $("#hdnRecordID").val();
        $('#grdProvince').dataTable().fnDestroy();

        $(recordid).remove();

        GridProvince.init();
    }
    function Currentpage(val) {
        for (i = 0; i < val - 1; i++) {
            $("#grdProvince_next").click();
        }
        $('#hfcurrpage').val('1');
    }
});
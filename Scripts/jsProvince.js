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
    function ProvinceFill() {
        $('#txtpname').empty();
        $("#txtpname").parent().find(".select2-chosen").text("-------------Select-------------");
        $('#txtpname').append('<option value="">-------------Select-------------</option>');

        for (state in BFHStatesList["CA"]) {
            if (BFHStatesList["CA"].hasOwnProperty(state)) {
                 $('#txtpname').append('<option value="' + BFHStatesList["CA"][state].code + '">' + BFHStatesList["CA"][state].name + '</option>');
            }
        }
       
     
    }
    GridProvince.init();
    $("#btnOpenprovinceForm").click(function () {
        $('body').loader('show', { overlay: true });
        clear();

        ProvinceFill();
       
        $("#hdnRecordID").val("0");
        $("#dialog-province").modal("show");
        $('body').loader('hide');
    });

    function clear() {
        $("input[type=text]").val("");
        $('span').closest('.form-group').removeClass('has-error');
        $('.alert-danger').hide();
        $("#Hdr_MyCal_Form").text("Add Province");
    }
    $("#btnSubmitEvent").click(function () {

        ValidateProvince();


    });
    $("#txtpname").change(function () {
        $("#txtpabbri").val($("#txtpname :selected").val());
        
    });

   
    $("#btnmanagetax").click(function () {
        window.location.href = "Provincetax.aspx";
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


                txtpname: {
                    required: true
                },

                txtpabbri: {
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
                var txtpname = $("#txtpname :selected").text();
                var txtPabbri = $("#txtpabbri").val();
              
                $.ajax({
                    url: "Province.aspx/AddupdateProvince",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: '{"ID":"' + ID + '","Pname":"' + txtpname + '","Pabbri":"' + txtPabbri + '"}',
                    dataType: "json",
                    success: OnAddEventSuccess,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });

            }
        });
    }


    function OnAddEventSuccess(response) {
        if (response.d == "Already Added") {
            $("#msg_txt1").text("Province Is Already Added");
            $("#success1").modal("show");
            return false;
        }
        else {
            $('#dialog-province').modal('hide');
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
                url: "Province.aspx/GetRepairRecord",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{'id':'" + trids + "'}",
                async: false,
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

        ProvinceFill();
        
        var objEditres = JSON.parse(response.d);
        
        $.each(objEditres, function (key, value) {
            $('[id=txtpname] option').filter(function () {
                return ($(this).val() == value.ProvinceAbbreviation);
            }).prop('selected', true);
            $("#txtpname").parent().find(".select2-chosen").text(value.ProvinceName);
            $("#txtpabbri").val(value.ProvinceAbbreviation);
           
        });
        $("#dialog-province").modal("show");
        $('body').loader('hide');
    }



    $("#btnSRDelYes").click(function () {
        var id = $("#hdnRecordID").val();

            $.ajax({
                url: "Province.aspx/DeleteRecord",
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
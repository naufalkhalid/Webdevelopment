/// <reference path="../../homelifefrontier/CategoriesManagement/ManageCategories.aspx" />
/// <reference path="../../homelifefrontier/CategoriesManagement/ManageCategories.aspx" />
/// <reference path="../../homelifefrontier/CategoriesManagement/ManageCategories.aspx" />
var table_ServiceandRepairs = "";
var GridComments = function () {

    var GridCommentsTable = function () {

        var table = $('#grdComments');

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
                [0, "desc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#grdComments_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridCommentsTable();
        }

    };

}();
var GridSerRepairs = function () {

    var GridSerRepairsTable = function () {

        var table = $('#grdServiceandRepairs');

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
            "order": [
                [0, "desc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#grdServiceandRepairs_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridSerRepairsTable();
        }

    };

}();

$(document).ready(function () {
    if ($("#HdnRoles").val() == "SuperAdmin") {
        $("#btnOpenManageCategories").val("Manage Categories");
    }
    table_ServiceandRepairs = $('#grdServiceandRepairs').clone();
    GridSerRepairs.init();
    //GridComments.init();

    $.ajax({
        url: "ServiceandRepairs.aspx/LoadCustomers",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: "{}",
        async: true,
        success: function (response) {
            OnLoadCustomer(response, 0);
        },
        error: function () {
            $('body').loader('hide');
            //alert("error ");
        }
    });

    //var hfUsers = $('[id$=hfUsers]').val();
    //var users = JSON.parse(hfUsers);
    //$.each(users, function (value,key) {
    //    $("#select_searchbyuser").append($("<option></option>").val(key).html(key));
    //});

    $.fn.datepicker.defaults.format = "mm/dd/yyyy";
    if ($("#HdnRoles").val().indexOf("User") > -1) {//////////////////////////////////////////////////////////Client///////////////////////////////////////////////////////
        $('[id=Users] option').filter(function () {
            return ($(this).text() == "Alan Smith");
        }).prop('selected', true);
        
        $("#Status").css('display', "block");
        $('#SerRepCat').attr('disable', true)
    }
    else {/////////////////////////////////////////////////////////Admin///////////////////////////////////////////////////////////////
        $("#lblstatus").css('display', "normal");
       
        $("#Status").css('display', "block");
         $("#btnOpenManageCategories").css('display', "normal");
    }

    $("#btnOpenServiceRepairForm").click(function () {
        $('body').loader('show', { overlay: true });
        clear();
        $('#serreqstartdate').datepicker('remove');
        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
        $('#serreqstartdate').datepicker({
            startDate: today, autoclose: true
        });

        $("#hdnRecordID").val("0");
        if ($("#HdnRoles").val().indexOf("User") > -1) {
            $('#Status').prop('disabled', true);
            $('#Status').selectpicker('refresh');
        }

        LoadStatus();
        LoadCategories();
        LoadCustomers();
        $("#commentsdiv").hide();
        $("#lblserviceid").text("");
        $("#FormServiceAndRepairs").modal("show");
        $('body').loader('hide');
    });
    function LoadStatus() {
        $.ajax({
            url: "ServiceandRepairs.aspx/GetStatus",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            async: false,
            success: OnGetStatus,
            error: function () {
                $('body').loader('hide');
                //alert("error ");
            }
        });
    }
    function OnGetStatus(response) {
        $("#Status").empty();
        var objRecord = JSON.parse(response.d);
        $.each(objRecord, function (key, value) {
            //$("#Status").parent().find('.select2-chosen').text(value.statusID);
            $("#Status").append($("<option></option>").val(value.statusID).html(value.Status));
            $('[id=Status] option').filter(function () {
                return ($(this).text() == "Opened");
            }).prop('selected', true);
            $("#Status").parent().find(".select2-chosen").text("Opened");

        });
    }
    function LoadCategories() {
        $.ajax({
            url: "ServiceandRepairs.aspx/GetCategories",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            async: false,
            success: OnGetCategories,

            error: function () {
                $('body').loader('hide');
                //alert("error ");
            }
        });
    }
    function OnGetCategories(response) {
        $("#SerRepCat").empty();
        $("#SerRepCat").parent().find(".select2-chosen").text("-----Select-----");
        $("#SerRepCat").append($("<option></option>").val("").html("-----Select-----"));
        var objRecord = JSON.parse(response.d);
        $.each(objRecord, function (key, value) {
            //$("#Status").parent().find('.select2-chosen').text(value.statusID);
            $("#SerRepCat").append($("<option></option>").val(value.ServiceID).html(value.ServiceName));
        });
    }
    function LoadCustomers() {////////////////////////////////////////////////////////Coorporate///////////////////////////////////////////////////
        if ($("#HdnCustomerType").val().indexOf("Corporate") > -1) {
            $.ajax({
                url: "CoorpServiceandRepairs.aspx/LoadCorpCustomers",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{}",
                async: false,
                success: OnLoadCoorpCustomer,

                error: function () {
                    $('body').loader('hide');
                    // alert("error ");
                }
            });
        }
        else {
            /////////////////////////////////////////////////////////////////Residential///////////////////////////////////////////////
            $.ajax({
                url: "ServiceandRepairs.aspx/LoadCustomers",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{}",
                async: false,
                success: function (response) {
                    OnLoadCustomer(response, 1);
                },
                error: function () {
                    $('body').loader('hide');
                    //alert("error ");
                }
            });
        }
    }
    function OnLoadCoorpCustomer(response) {
        $("#Users").empty();
        var objRecord = JSON.parse(response.d);
        $.each(objRecord, function (key, value) {
            //$("#Status").parent().find('.select2-chosen').text(value.statusID);
            $("#Users").append($("<option></option>").val(value.CustID).html(value.CustName + " " + "(Store Name:" + " " + value.StoreName + ")"));
        });
    }
    function OnLoadCustomer(response, flag) {
        $("#Users").empty();
        var objRecord = JSON.parse(response.d);
        if (flag == 0)
            $("#select_searchbyuser").append($("<option></option>").val('00000000-0000-0000-0000-000000000000').html('Show All Users'));

        $("#Users").parent().find(".select2-chosen").text("-----Select-----");
        $("#Users").append($("<option></option>").val("").html("-----Select-----"));
        $.each(objRecord, function (key, value) {
            if (flag == 1)
                $("#Users").append($("<option></option>").val(value.CustID).html(value.CustName));
            else {
                $("#select_searchbyuser").append($("<option></option>").val(value.CustID).html(value.CustName));
            }
        });
    }

    $("#btnOpenManageCategories").click(function () {
        window.location.href = "../CategoriesManagement/ManageCategories.aspx?f=SR";
    });
    $("#btnSerSubmit").click(function () {
        $('body').loader('show', { overlay: true });

        ValidateRepairandServiceForm();
    });
    function ValidateRepairandServiceForm() {

        var formserrep = $('#form_ServiceandRepairs');
        var error1 = $('.alert-danger', formserrep);
        var success1 = $('.alert-success', formserrep);

        formserrep.validate({
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
                Users: {
                    required: true
                },
                SerRepCat: {
                    required: true
                },

                txtSRProbDesc: {
                    required: true
                },

                SerRepCompany: {
                    required: true
                },

                serreqstartdate: {
                    required: true
                },
                serreqenddate: {
                    required: true
                },
                txtServiceCharge:
                    {
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

                $("#FormServiceAndRepairs").modal("hide");

                var RecordID = $("#hdnRecordID").val();
                var ServiceCategory = $("#SerRepCat :selected").val();
                var ProbDescription = $("#txtSRProbDesc").val().replace(/(['"])/g, "\\$1");//.replace("'","\\'");
                var Status = $("#Status :selected").val();
                var UserNo = $("#Users :selected").val();
                var StartDate = $('#serreqstartdate').val();

                $.ajax({
                    url: "ServiceandRepairs.aspx/AddUpdateServiceRequest",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: "{'RecordID':'" + RecordID + "','ServiceCategory':'" + ServiceCategory + "','ProblemDescription':'" + ProbDescription + "','StartDate':'" + StartDate + "','Status':'" + Status + "','CustNo':'" + UserNo + "'}",
                    async: true,
                    success: OnAddUpdateServiceRequest,

                    error: function (response) {
                        $('body').loader('hide');
                        //alert(response.d);
                    }
                });

            }//end here submitt
        });
    }


    function OnAddUpdateServiceRequest(response) {
        var recordid = '#' + $("#hdnRecordID").val();
        $('#grdServiceandRepairs').dataTable().fnDestroy();
        $(recordid).remove();
        $('#grdServiceandRepairs > tbody').append(response.d);
        table_ServiceandRepairs.find(recordid).remove();
        table_ServiceandRepairs.find("tbody").append(response.d);
        GridSerRepairs.init();
        Currentpage($('#hfcurrpage').val());
        $('body').loader('hide');

    }
    $("#btnSerCancel").click(function () {
        $('body').loader('hide');

    });
    $('#grdServiceandRepairs').on('click', '.EditServRepairs', function (e) {
        $('body').loader('show', { overlay: true });
        $("#hfcurrpage").val($('.pagination .active a').text());
        $("#hdnRecordID").val($(this).closest("tr").attr("id"));
        var trids = $(this).closest("tr").attr("id");
        if ($("#HdnCustomerType").val().indexOf("Corporate") > -1) {///////////////////////////Corporate///////////////
            $.ajax({
                url: "CoorpServiceandRepairs.aspx/GetRepairRecord",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{'id':'" + trids + "'}",
                async: true,
                success: OnGetRepairRecord,

                error: function () {
                    $('body').loader('hide');
                    //alert("error ");

                }
            });
        }
        else {//////////////////////////////////Residential////////////////////////////////////////////////////////////

            $.ajax({
                url: "ServiceandRepairs.aspx/GetRepairRecord",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{'id':'" + trids + "'}",
                async: true,
                success: OnGetRepairRecord,

                error: function () {
                    $('body').loader('hide');
                    //alert("error ");

                }
            });
        }
    });
    $('#grdServiceandRepairs').on('click', '.DeleteServRepairs', function (e) {
        $('body').loader('show', { overlay: true });
        var trids = $(this).closest("tr").attr("id");
        $("#hdnRecordID").val($(this).closest("tr").attr("id"));
        $("#dialog-del-message-Model").modal("show");
        $('body').loader('hide');
    });
    $("#btnSRDelYes").click(function () {
        var id = $("#hdnRecordID").val();

        if ($("#HdnCustomerType").val().indexOf("Corporate") > -1) {///////////////////////////Corporate///////////////

            $.ajax({
                url: "CoorpServiceandRepairs.aspx/DeleteRepairRecord",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{'id':'" + id + "'}",
                async: true,
                success: OnDeleteSuccess,

                error: function () {
                    $('body').loader('hide');
                    //alert("error ");

                }
            });
        }
        else {

            $.ajax({
                url: "ServiceandRepairs.aspx/DeleteRecord",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{'id':'" + id + "'}",
                async: true,
                success: OnDeleteSuccess,

                error: function () {
                    $('body').loader('hide');
                    //alert("error ");

                }
            });
        }
    });
    function OnDeleteSuccess() {
        var recordid = '#' + $("#hdnRecordID").val();
        $('#grdServiceandRepairs').dataTable().fnDestroy();

        $(recordid).remove();

        GridSerRepairs.init();
    }
    function OnGetRepairRecord(response) {
        $("#LabelHeadingAddUpdateService").text("Update Service Request:");
        $("#FormServiceAndRepairs").modal("show");
        $("#lblserviceid").text($("#" + $("#hdnRecordID").val()).closest('tr').find("[id*=lblReqID]").text());
        var objEditres = JSON.parse(response.d);
        $("#Status").removeAttr("disabled");
        LoadStatus();
        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
        //$('#serreqstartdate').datepicker({
        //    startDate: today,
        //});
        LoadCategories();
        LoadCustomers();
        $.each(objEditres, function (key, value) {

            $('[id=SerRepCat] option').filter(function () {
                return ($(this).val() == value.ServiceID);
            }).prop('selected', true);

            $('[id=Status] option').filter(function () {
                return ($(this).val() == value.statusID);
            }).prop('selected', true);
            $('[id=Users] option').filter(function () {
                return ($(this).val() == value.CustID);
            }).prop('selected', true);


            $("#Status").parent().find(".select2-chosen").text(value.Status);
            $("#Users").parent().find(".select2-chosen").text(value.CustName);
            $("#SerRepCat").parent().find(".select2-chosen").text(value.ServiceName);
            $("#txtSRProbDesc").val(value.Problem);
            //$("#serreqstartdate").val(value.ServiceDate);

            var d = new Date(value.ServiceDate);
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();
            var serdate = curr_month + "/" + curr_date + "/" + curr_year;
            $('#serreqstartdate').datepicker('remove');
            $("#serreqstartdate").val(serdate);
            $('#serreqstartdate').datepicker({ startDate: serdate, autoclose: true });

            if ($("#HdnRoles").val().indexOf("User") > -1) {
                $('#Status').prop('disabled', true);
                $('#Status').selectpicker('refresh');

                $('#SerRepCat').prop('disabled', true);
                $('#SerRepCat').selectpicker('refresh');
            }

            //$("#serreqenddate").val(value.CompDate);
            // $("#txtServiceCharge").val(value.ServiceCharges);
            // $("#txtCustomerNo").val(value.CustNum);
            //$("#Users").append($("<option></option>").val(value.CustID).html(value.CustName));
            //$("#Status").append($("<option></option>").val(value.statusID).html(value.Status));
            //$("#SerRepCat").append($("<option></option>").val(value.ServiceID).html(value.ServiceName));


        });
        $('body').loader('hide');
        $("#commentsdiv").show();
        OnViewComment();
    }
    $("#reloadcomments").click(function () {
        OnViewComment();
    });

    $("#select_searchbyuser").click(function () {

        var userid = $("#select_searchbyuser").val();

        $('#grdServiceandRepairs').dataTable().fnDestroy();
        $('#grdServiceandRepairs').remove();
        var temp_table_ServiceandRepairs = table_ServiceandRepairs.clone();
        $('#div_ServiceAndRepair').append(temp_table_ServiceandRepairs);

        if (userid == '00000000-0000-0000-0000-000000000000' || userid == '') {
            GridSerRepairs.init();
            callagain();
            return;
        }
        else {
            $('#grdServiceandRepairs tr').each(function (i) {
                if ($(this).attr('data-id') != userid && i > 0) {
                    $(this).remove();
                }
            });
        }
        GridSerRepairs.init();

        callagain();
        function callagain() {
            $('#grdServiceandRepairs').on('click', '.EditServRepairs', function (e) {
                $('body').loader('show', { overlay: true });
                $("#hfcurrpage").val($('.pagination .active a').text());
                $("#hdnRecordID").val($(this).closest("tr").attr("id"));
                var trids = $(this).closest("tr").attr("id");
                if ($("#HdnCustomerType").val().indexOf("Corporate") > -1) {///////////////////////////Corporate///////////////
                    $.ajax({
                        url: "CoorpServiceandRepairs.aspx/GetRepairRecord",
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: "{'id':'" + trids + "'}",
                        async: true,
                        success: OnGetRepairRecord,

                        error: function () {
                            $('body').loader('hide');
                            //alert("error ");

                        }
                    });
                }
                else {//////////////////////////////////Residential////////////////////////////////////////////////////////////
                    $.ajax({
                        url: "ServiceandRepairs.aspx/GetRepairRecord",
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: "{'id':'" + trids + "'}",
                        async: true,
                        success: OnGetRepairRecord,

                        error: function () {
                            $('body').loader('hide');
                            //alert("error ");

                        }
                    });
                }
                $('body').loader('hide');
            });
            $('#grdServiceandRepairs').on('click', '.DeleteServRepairs', function (e) {
                var trids = $(this).closest("tr").attr("id");
                $("#hdnRecordID").val($(this).closest("tr").attr("id"));
                $("#dialog-del-message-Model").modal("show");
            });
            function OnAddUpdateServiceRequest(response) {
                var recordid = '#' + $("#hdnRecordID").val();
                $('#grdServiceandRepairs').dataTable().fnDestroy();
                $(recordid).remove();
                $('#grdServiceandRepairs > tbody').append(response.d);
                GridSerRepairs.init();
            }
            function OnDeleteSuccess() {
                var recordid = '#' + $("#hdnRecordID").val();
                $('#grdServiceandRepairs').dataTable().fnDestroy();

                $(recordid).remove();

                GridSerRepairs.init();
            }

        }


    });



    function clear() {
        $("input[type=text]").val("");
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $(".select2-chosen").text("");
        $("textarea").val("");
        $("select").val("");
        $("#LabelHeadingAddUpdateService").text("Add Service Request");
        $('#Status').prop('disabled', false);
        $('#Status').selectpicker('refresh');

        $('#SerRepCat').prop('disabled', false);
        $('#SerRepCat').selectpicker('refresh');
    }
    //$("#Users").change(function () {
    //    var recordId = $("#Users :selected").val();

    //    if (recordId > 0) {
    //        if ($("#HdnCustomerType").val().indexOf("Corporate") > -1) {
    //            $.ajax({
    //                url: "CoorpServiceandRepairs.aspx/LoadCorpCustomerNo",
    //                type: "POST",
    //                dataType: "json",
    //                contentType: "application/json; charset=utf-8",
    //                data: "{'RecordId':'" + recordId + "'}",
    //                async: true,
    //                success: OnGetCustomerNo,

    //                error: function () {
    //                    alert("error ");

    //                }
    //            });

    //        }
    //        else {
    //            $.ajax({
    //                url: "ServiceandRepairs.aspx/LoadCustomerNo",
    //                type: "POST",
    //                dataType: "json",
    //                contentType: "application/json; charset=utf-8",
    //                data: "{'RecordId':'" + recordId + "'}",
    //                async: true,
    //                success: OnGetCustomerNo,

    //                error: function () {
    //                    alert("error ");

    //                }
    //            });
    //        }
    //    }

    //});

    //function OnGetCustomerNo(response) {
    //    var objRecord = JSON.parse(response.d);
    //    $.each(objRecord, function (key, value) {
    //        //$("#Status").parent().find('.select2-chosen').text(value.statusID);

    //        //$("#txtCustomerNo").val(value.CustNum);
    //    });
    //}

    //$("#SerRepCat").change(function () {
    //    var ID = $("#SerRepCat :selected").val();
    //    $.ajax({
    //        url: "ServiceandRepairs.aspx/GetPrice",
    //        type: "POST",
    //        dataType: "json",
    //        contentType: "application/json; charset=utf-8",
    //        data: "{'RecordID':'" + ID + "'}",
    //        async: true,
    //        success: OnGetPrice,

    //        error: function () {
    //            alert("error ");

    //        }
    //    });
    //});
    //function OnGetPrice(response) {
    //    var objResponse = JSON.parse(response.d);
    //    $.each(objResponse, function (key, value) {
    //        $("#txtServiceCharge").val(value.spamnt);

    //    });
    //}

    //yehandler mae chal rha tha



    //if ($("#hdnRecordID").val() == 0) {
    //    var StartDate = $("#serreqstartdate").val().replace("-", "");
    //    var EndDate = $("#serreqenddate").val().replace("-", "");
    //    var Date1 = new Date(StartDate);
    //    var Date2 = new Date(EndDate);
    //}
    //else {
    //    if ($("#serreqstartdate").val().indexOf("T") > -1 || $("#serreqenddate").val().indexOf("T") > -1) {

    //        var StartDate = $("#serreqstartdate").val().replace("T", " ");
    //        var EndDate = $("#serreqenddate").val().replace("T", " ");
    //    }
    //    else {
    //        var StartDate = $("#serreqstartdate").val().replace("-", " ");
    //        var EndDate = $("#serreqenddate").val().replace("-", " ");
    //    }
    //    var Date1 = new Date(StartDate);
    //    var Date2 = new Date(EndDate);
    //}
    //if ((Date1 - Date2) > 0) {
    //    alert('End Date should be greater than Start Date.');
    //    return false;

    //}

    //else {
    //    /////////////////////////////////////////////////////CLient/////////////////////////////////////////
    //    if ($("#HdnRoles").val().indexOf("User") > -1) {
    //        ///////////////////////////////////////////////////////CorpClient///////////////////////////////////
    //        if ($("#HdnCustomerType").val().indexOf("Corporate") > -1) {

    //            $.ajax({
    //                url: "CoorpServiceandRepairs.aspx/AddUpdateCorpServiceRequestClient",
    //                type: "POST",
    //                dataType: "json",
    //                contentType: "application/json; charset=utf-8",
    //                data: "{'RecordID':'" + RecordID + "','ServiceCategory':'" + ServiceCategory + "','ProblemDescription':'" + ProbDescription + "','ServiceCompany':'" + ServiceCompany + "','StartDate':'" + StartDate + "','EndDate':'" + EndDate + "','Status':'" + Status + "','CostAmt':'" + CostAmt + "'}",
    //                async: true,
    //                success: OnAddUpdateServiceRequest,

    //                error: function () {
    //                    alert("error ");

    //                }
    //            });
    //        }
    //            ////////////////////////////////////////////////Residential///////////////////////////////////////////////////////
    //        else {
    //            $.ajax({
    //                url: "ServiceandRepairs.aspx/AddUpdateServiceRequestClient",
    //                type: "POST",
    //                dataType: "json",
    //                contentType: "application/json; charset=utf-8",
    //                data: "{'RecordID':'" + RecordID + "','ServiceCategory':'" + ServiceCategory + "','ProblemDescription':'" + ProbDescription + "','ServiceCompany':'" + ServiceCompany + "','StartDate':'" + StartDate + "','EndDate':'" + EndDate + "','Status':'" + Status + "','CostAmt':'" + CostAmt + "'}",
    //                async: true,
    //                success: OnAddUpdateServiceRequest,

    //                error: function () {
    //                    alert("error ");

    //                }
    //            });
    //        }
    //    }
    //        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //        /////////////////////////////////////////////////Admin////////////////////////////////////////////////////////

    //    else {
    //        /////////////////////////////////////////////////////////////CoorpAdmin////////////////////////////////////
    //        if ($("#HdnCustomerType").val().indexOf("Corporate") > -1) {

    //            $.ajax({
    //                url: "CoorpServiceandRepairs.aspx/AddUpdateCorpServiceRequest",
    //                type: "POST",
    //                dataType: "json",
    //                contentType: "application/json; charset=utf-8",
    //                data: "{'RecordID':'" + RecordID + "','ServiceCategory':'" + ServiceCategory + "','ProblemDescription':'" + ProbDescription + "','ServiceCompany':'" + ServiceCompany + "','StartDate':'" + StartDate + "','EndDate':'" + EndDate + "','Status':'" + Status + "','CostAmt':'" + CostAmt + "','CustNo':'" + UserNo + "'}",
    //                async: true,
    //                success: OnAddUpdateServiceRequest,

    //                error: function () {
    //                    alert("error ");

    //                }
    //            });
    //        }
    //            ////////////////////////////////////////////////////////////////////////////////////////////////////
    //        else {
    //            $.ajax({
    //                url: "ServiceandRepairs.aspx/AddUpdateServiceRequest",
    //                type: "POST",
    //                dataType: "json",
    //                contentType: "application/json; charset=utf-8",
    //                data: "{'RecordID':'" + RecordID + "','ServiceCategory':'" + ServiceCategory + "','ProblemDescription':'" + ProbDescription + "','ServiceCompany':'" + ServiceCompany + "','StartDate':'" + StartDate + "','EndDate':'" + EndDate + "','Status':'" + Status + "','CostAmt':'" + CostAmt + "','CustNo':'" + UserNo + "'}",
    //                async: true,
    //                success: OnAddUpdateServiceRequest,

    //                error: function () {
    //                    alert("error ");

    //                }
    //            });
    //        }
    //    }
    //} 


    //$("#serreqstartdate").focusin(function () {
    //    if ($('#serreqstartdate').val() == "") {
    //        var nowDate = new Date();
    //        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    //        $("#serreqstartdate").datepicker("destroy");
    //            $('#serreqstartdate').datepicker({
    //                startDate: today,
    //            });
    //        }
    //});


    ////////////Comments////////////////////////////////////////////
    $("#addComment").click(function () {
        if ($("#txtComments").val().length > 0) {
            var trid = $("#hdnRecordID").val();
            var comment = $("#txtComments").val().replace(/(['"])/g, "\\$1");
            $.ajax({
                url: "ServiceandRepairs.aspx/AddComments",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{'RecordID':'" + trid + "','comment':'" + comment + "'}",
                async: true,
                success: OnAddComment,

                error: function () {
                    $('body').loader('hide');
                    //alert("error ");

                }
            });
        }
        else {
            //alert("Please Enter Comments");
       
            $("#msg_txt1").text("Please Enter Comments");
            $("#success1").modal("show");
        }
    });
    function OnAddComment(response) {
        $("#txtComments").val("");
        OnViewComment();

        return false;
    }

    function OnViewComment() {

        var trid = $("#hdnRecordID").val();
        $.ajax({
            url: "ServiceandRepairs.aspx/ViewComments",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'RecordId':'" + trid + "'}",
            async: true,
            success: OnViewCommentssucess,

            error: function () {
                $('body').loader('hide');
                //alert("error ");

            }
        });

    }

    function OnViewCommentssucess(response) {

        $("#Comments").empty();
        $('#Comments').html(response.d);
        $("#FormServiceAndRepairs").modal("show");

    }

    function Currentpage(val) {
        for (i = 0; i < val - 1; i++) {
            $("#grdServiceandRepairs_next").click();
        }
        $('#hfcurrpage').val('1');
    }
});

var GridCategories = function () {

    var GridCategoriesTable = function () {

        var table = $('#grdCategories');

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
            GridCategoriesTable();
        }

    };

}();
var grdQCCategories = function () {

    var grdQCCategoriesTable = function () {

        var table = $('#grdQCCategories');

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
            "order": [
                [0, "desc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#grdQCCategories_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            grdQCCategoriesTable();
        }

    };

}();
var grdpendingCategories = function () {

    var grdpendingCategoriesTable = function () {

        var table = $('#grdpendingCategories');

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
            "order": [
                [0, "desc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#grdpendingCategories_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            grdpendingCategoriesTable();
        }

    };

}();

$(document).ready(function () {
    hideright();
    //if ($("#HdnRoles").val() == "SuperAdmin") {
    //    $(".divForAddCategory").show();
    //    $(".Divforsync").show();
    //}
    //else {
    //    $(".divForAddCategory").hide();
    //    $(".Divforsync").hide();
    //}

    function hideright() {
        if ($("#HdnRoles").val() == "SuperAdmin") {
            $(".tdhide").show();
        }
        else {
            $(".tdhide").hide();
        }
    }

    function hidecategory() {
        if ($("#hfqueryF").val() == "SR") {
            $(".AddLC1").hide();
            $(".Addboth1").hide();
            $(".AddLC").hide();
            $(".Addboth").hide();
        }
        else if ($("#hfqueryF").val() == "LC") {
            $(".AddSR1").hide();
            $(".Addboth1").hide();
            $(".AddSR").hide();
            $(".Addboth").hide();
        }
        else {
            $(".AddSR1").show();
            $(".Addboth1").show();
            $(".AddLC1").show();
            $(".AddSR").show();
            $(".Addboth").show();
            $(".AddLC").show();
        }
    }


    $("#btnback").click(function () {
        window.history.back();
    });
    GridCategories.init();
    grdQCCategories.init();
    grdpendingCategories.init();
    $('.datepicker').datepicker({
        autoclose: true
    });
    $("#btnsync").click(function () {
        $('body').loader('show', { overlay: true });
        OnreloadCategories();
        hidecategory();
        OnreloadupdatedCategories();
        $("#div_sync").modal("show");
        $('body').loader('hide');
    });
    $("#btnOpenCategoriesForm").click(function () {
        $('body').loader('show', { overlay: true });
        clear();
        $("#hdnCategoryID").val("0");
        $("#hffrom").val("PS");
        $("#modaltitle").text("Add Categories");
        $("#ModalFormCategories").modal("show");
        $('body').loader('hide');

        if ($("#hfqueryF").val() == "SR") {
            $('[id=categorytype] option').filter(function () {
                return ($(this).val() == "SR");
            }).prop('selected', true);
            $("#categorytype").parent().find(".select2-chosen").text("SR");
            $("#categorytype").attr("disabled", "disabled");
        }
        else if ($("#hfqueryF").val() == "LC") {
            $('[id=categorytype] option').filter(function () {
                return ($(this).val() == "LC");
            }).prop('selected', true);
            $("#categorytype").parent().find(".select2-chosen").text("LC");
            $("#categorytype").attr("disabled", "disabled");
        }
    });
    //$("#backServiceRepairs").click(function () {
    //    window.location.href = "../ServiceAndRepairModule/ServiceandRepairs.aspx";

    //});

    $("#btnCatSubmit").click(function () {

        $('body').loader('show', { overlay: true });
        ValidCategories();
    });
    $("#btnCatCancel").click(function () {

        $('body').loader('hide');

    });

    function ValidCategories() {

        var formcat = $('#form_Categories');
        var error1 = $('.alert-danger', formcat);
        var success1 = $('.alert-success', formcat);

        formcat.validate({
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

                CatDescription: {
                    required: true
                },
                CatSpAmnt: {
                    number: true
                },
                CatQciAmnt: {
                    number: true
                },
                CatMuAmnt: {
                    number: true
                },
                CatMuPerc: {
                    number: true
                },
                catstartdate: {
                    required: true,

                },
                catenddate: {
                    required: true
                },



            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                success1.hide();
                $("#labelspamt").css("display", "none");
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
                $("#labelspamt").css("display", "none");
                //$("#ModalFormCategories").modal("hide");
                var CategoryType = $("#categorytype :selected").val();
                var CategoryID = $("#hdnCategoryID").val();

                var CatDesc = $("#CatDescription").val().replace(/(['"])/g, "\\$1");
                var SpAmnt = $("#CatSpAmnt").val();
                var QCIAmnt = $("#CatQciAmnt").val();
                var details = $("#txtDetail").val();
                var MuAmnt = $("#CatMuAmnt").val();
                var MuPerc = $("#CatMuPerc").val();
                var addfrom = $("#hffrom").val();
                if ($("#hdnCategoryID").val() == "0") {
                    var StartDate = $("#catstartdate").val().replace("-", "");
                    var EndDate = $("#catenddate").val().replace("-", "");
                    var Date1 = new Date(EndDate);
                    var Date2 = new Date(StartDate);


                }
                else {

                    if ($("#catstartdate").val().indexOf("T") > -1 || $("#catenddate").val().indexOf("T") > -1) {

                        var StartDate = $("#catstartdate").val().replace("T", " ");
                        var EndDate = $("#catenddate").val().replace("T", " ");
                    }
                    else {
                        var StartDate = $("#catstartdate").val().replace("-", " ");
                        var EndDate = $("#catenddate").val().replace("-", " ");
                    }
                    var Date1 = new Date(EndDate);

                    var Date2 = new Date(StartDate);

                }
                if ((Date2 - Date1) > 0) {
                    //alert('End Date should be greater than Start Date.');
                    $("#msg_txt1").text("End Date should be greater than Start Date.");
                    $("#success1").modal("show");
                    return false;
                }

                else {
                    $.ajax({
                        url: "ManageCategories.aspx/InsertCategory",
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: "{'CategoryType':'" + CategoryType + "','CategoryID':'" + CategoryID + "','CatDesc':'" + CatDesc + "','SPAmnt':'" + SpAmnt + "','QCIAmnt':'" + QCIAmnt + "','MUAmnt':'" + MuAmnt + "','MUPer':'" + MuPerc + "','StartDate':'" + StartDate + "','EndDate':'" + EndDate + "','details':'" + details + "','addfrom':'" + addfrom + "','SPID':'" + $("#hfPID").val() + "'}",
                        async: true,
                        success: OnAddUpdate,
                        // clear text here after save complete
                        error: function () {
                            //alert("error ");
                        }
                    });
                }
            }
        });
    }

    function OnAddUpdate(response) {
        if ($("#hffrom").val() == "PS") {
            $('body').loader('hide');
            //alert("Success");
            $("#msg_txt1").text("Success");
            $("#success1").modal("show");
            var recordid = "#" + $("#hdnCategoryID").val();
            $('#grdpendingCategories').dataTable().fnDestroy();
            $(recordid).remove();
            $('#grdpendingCategories > tbody').append(response.d);
            grdpendingCategories.init();
            Currentpage1($('#hfcurrpage').val());
            $("#ModalFormCategories").modal("hide");
        }
        else {
            $("#msg_txt1").text("Success");
            $("#success1").modal("show");
            var recordid = "#" + $("#hdnCategoryID").val();
            $('#grdCategories').dataTable().fnDestroy();
            $('#grdQCCategories').dataTable().fnDestroy();
            $(recordid).remove();
            var recordid1 = "#" + $("#hfPID").val();
            $(recordid1).remove();
            $('#grdCategories > tbody').append(response.d);
            GridCategories.init();
            grdQCCategories.init();
            Currentpage($('#hfcurrpage').val());
            $("#ModalFormCategories").modal("hide");
            $('body').loader('hide');
        }
        hideright();

    }

    $("#grdCategories").on('click', '.EditCategories', function (e) {
        $('body').loader('show', { overlay: true });
        $("#CatQciAmnt").removeAttr("disabled");
        $("#categorytype").removeAttr("disabled");
        $("#hfcurrpage").val($('.pagination .active a').text());
        $("#hdnCategoryID").val($(this).closest("tr").attr("id"));
        var recordId = $(this).closest("tr").attr("id");

        $.ajax({
            url: "ManageCategories.aspx/CategoryRecord",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'RecordID':'" + recordId + "'}",
            async: true,
            success: OnGetRecord,
            // clear text here after save complete




            error: function () {
                //alert("error ");

            }
        });

    });

    $("#grdpendingCategories").on('click', '.EditCategories', function (e) {
        $('body').loader('show', { overlay: true });
        $("#hfpending").val("Pending");
        $("#CatQciAmnt").removeAttr("disabled");
        $("#categorytype").removeAttr("disabled");
        $("#hfcurrpage").val($('.pagination .active a').text());
        $("#hdnCategoryID").val($(this).closest("tr").attr("id"));
        var recordId = $(this).closest("tr").attr("id");

        $.ajax({
            url: "ManageCategories.aspx/CategoryRecord",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'RecordID':'" + recordId + "'}",
            async: true,
            success: OnGetRecord,
            // clear text here after save complete




            error: function () {
                //alert("error ");

            }
        });

    });
    $("#CatQciAmnt").keyup(Calculateamount);
    $("#CatMuAmnt").keyup(function () {
        if ($(this).val().length > 0) {
            Calculateamount.apply(this);
        }
        else {
            clearamounts();
        }
    });
    $("#CatMuPerc").keyup(function () {
        if ($(this).val().length > 0) {
            Calculateamount.apply(this);
        }

        else {
            clearamounts();
        }
    });
    $("#CatSpAmnt").blur(function () {
        if ($(this).val().length > 0) {
            Calculateamount.apply(this);
        }
        else {
            clearamounts();
        }



    });

    function clearamounts() {

        $("#CatMuAmnt").val("");
        $("#CatMuPerc").val("");
        $("#CatSpAmnt").val("");

    }
    function Calculateamount() {
        if ($("#CatQciAmnt").val().length > 0) {

            if (this.id == "CatMuAmnt") {
                var catamnt = (parseFloat($("#CatMuAmnt").val()));
                var muperc = ((parseFloat($("#CatMuAmnt").val()) / parseFloat($("#CatQciAmnt").val())) * 100).toFixed(2);
                var result = (parseFloat($("#CatQciAmnt").val()) + parseFloat($("#CatMuAmnt").val())).toFixed(2);

                if (catamnt > 0) {
                    if (!isNaN(result) && !isNaN(muperc)) {

                        $("#CatSpAmnt").val(result);
                        $("#CatMuPerc").val(muperc);
                        $("#labelspamt").css("display", "none");
                    }
                }
                else {
                    $("#labelspamt").css("display", "none");
                    $("#CatMuAmnt").val("");
                    $("#CatMuPerc").val("");
                    $("#CatSpAmnt").val("");

                }


            }
            if (this.id == "CatSpAmnt") {

                var muamount = (parseFloat($("#CatSpAmnt").val()) - parseFloat($("#CatQciAmnt").val())).toFixed(2);
                var muperc = ((muamount / parseFloat($("#CatQciAmnt").val())) * 100).toFixed(2);
                if (!isNaN(muamount) && !isNaN(muperc)) {
                    if (muamount > 0) {
                        $("#CatMuAmnt").val(muamount);
                        $("#CatMuPerc").val(muperc);
                        $("#labelspamt").css("display", "none");
                    }
                    else {
                        $("#labelspamt").css("display", "normal");
                        $("#CatMuAmnt").val("");
                        $("#CatMuPerc").val("");
                        $("#CatSpAmnt").val("");


                    }
                }

            }


            if (this.id == "CatMuPerc") {
                var muperc = (parseFloat($("#CatMuPerc").val()));

                var muamount = (muperc * parseFloat($("#CatQciAmnt").val()) / 100).toFixed(2);


                var psamount = (parseFloat($("#CatQciAmnt").val()) + (muperc * parseFloat($("#CatQciAmnt").val()) / 100)).toFixed(2);

                if (muperc > 0) {

                    if (!isNaN(muamount) && !isNaN(psamount)) {
                        $("#CatMuAmnt").val(muamount);
                        $("#CatSpAmnt").val(psamount);
                        $("#labelspamt").css("display", "none");
                    }
                }
                else {
                    $("#labelspamt").css("display", "none");
                    $("#CatMuAmnt").val("");
                    $("#CatMuPerc").val("");
                    $("#CatSpAmnt").val("");

                }

            }


        }
        else {
            $("#labelspamt").css("display", "none");
            $("#CatMuAmnt").val("");
            $("#CatMuPerc").val("");
            $("#CatSpAmnt").val("");

        }
    }
    $("#grdCategories").on('click', '.DeleteCategories', function (e) {


        $("#hdnCategoryID").val($(this).closest("tr").attr("id"));
        $("#deleteCategoryModel").modal("show");

    });
    $("#grdpendingCategories").on('click', '.DeleteCategories', function (e) {


        $("#hdnCategoryID").val($(this).closest("tr").attr("id"));
        $("#hfpending").val("Pending");
        $("#deleteCategoryModel").modal("show");

    });
    $("#btnCatDelYes").click(function () {
        $("#ModalFormCategories").modal("hide");
        $('body').loader('show', { overlay: true });
        var recordId = $("#hdnCategoryID").val();
        $.ajax({
            url: "ManageCategories.aspx/DeleteCategory",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'RecordID':'" + recordId + "'}",
            async: true,
            success: OnDeleteRecord,
            // clear text here after save complete




            error: function () {
                //alert("error ");

            }
        });

    });
    function OnDeleteRecord() {

        $('body').loader('hide');
        //alert("Success");
        $("#msg_txt1").text("Success");
        $("#success1").modal("show");


        var recordid = "#" + $("#hdnCategoryID").val();
        if ($("#hfpending").val() == "Pending") {
            $('#grdpendingCategories').dataTable().fnDestroy();

            $(recordid).remove();


            grdpendingCategories.init();
            $("#hfpending").val("");
        }
        else {
            $('#grdCategories').dataTable().fnDestroy();

            $(recordid).remove();


            GridCategories.init();
        }
    }
    function OnGetRecord(response) {

        var objeditresponse = JSON.parse(response.d);
        $("#modaltitle").text("Edit Categories");
        $('body').loader('hide');
        $("#ModalFormCategories").modal("show");


        $.each(objeditresponse, function (key, value) {
            if (value.startdate != null && value.enddate != null) {
                var newstartdate = value.startdate.split("T");
                var newenddate = value.enddate.split("T");
            }
            $("#CatDescription").val(value.description);
            $("#CatSpAmnt").val(value.spamnt);
            $("#CatQciAmnt").val(value.qciamnt);
            $('[id=categorytype] option').filter(function () {
                return ($(this).val() == value.categorytype);
            }).prop('selected', true);
            $("#categorytype").parent().find(".select2-chosen").text(value.categorytype);
            $("#CatMuAmnt").val(value.muamnt);
            $("#CatMuPerc").val(value.muperc);
            $("#catstartdate").val(newstartdate[0]);
            $("#catenddate").val(newenddate[0]);
            $("#hffrom").val(value.Addfrom);
            $("#txtDetail").val(value.details);

        });

    }
    $("body").on("click", ".AddSR", function () {
        $("input[type=text]").val("");
        $("input[type=number]").val("");
        $("#modaltitle").text("Add Categories");
        $("#hdnCategoryID").val("0");
        $("#hffrom").val("QC");
        $("#hfPID").val($(this).parents("tr").first().find(".ProductId").text());
        $("#CatDescription").val($(this).parents("tr").first().find(".ProductName").text());
        $("#txtDetail").val($(this).parents("tr").first().find(".ProductDescription").text());
        $('[id=categorytype] option').filter(function () {
            return ($(this).val() == "SR");
        }).prop('selected', true);
        $("#categorytype").parent().find(".select2-chosen").text("SR");
        $("#CatQciAmnt").val($(this).parents("tr").first().find(".Price").text());
        $("#CatSpAmnt").val($(this).parents("tr").first().find(".ClientPrice").text());
        $("#CatQciAmnt").attr("disabled", "disabled");
        $("#ModalFormCategories").modal("show");
        $("#categorytype").attr("disabled", "disabled");
    });
    $("body").on("click", ".AddLC", function () {
        $("input[type=text]").val("");
        $("input[type=number]").val("");
        $("#modaltitle").text("Add Categories");
        $("#hdnCategoryID").val("0");
        $("#hfPID").val($(this).parents("tr").first().find(".ProductId").text());
        $("#hffrom").val("QC");
        $("#CatDescription").val($(this).parents("tr").first().find(".ProductName").text());
        $("#txtDetail").val($(this).parents("tr").first().find(".ProductDescription").text());
        $('[id=categorytype] option').filter(function () {
            return ($(this).val() == "LC");
        }).prop('selected', true);
        $("#categorytype").parent().find(".select2-chosen").text("LC");
        $("#CatQciAmnt").val($(this).parents("tr").first().find(".Price").text());
        $("#CatSpAmnt").val($(this).parents("tr").first().find(".ClientPrice").text());
        $("#CatQciAmnt").attr("disabled", "disabled");
        $("#ModalFormCategories").modal("show");
        $("#categorytype").attr("disabled", "disabled");
    });
    $("body").on("click", ".Addboth", function () {
        $("input[type=text]").val("");
        $("input[type=number]").val("");
        $("#modaltitle").text("Add Categories");
        $("#hdnCategoryID").val("0");
        $("#hfPID").val($(this).parents("tr").first().find(".ProductId").text());
        $("#hffrom").val("QC");
        $("#CatDescription").val($(this).parents("tr").first().find(".ProductName").text());
        $("#txtDetail").val($(this).parents("tr").first().find(".ProductDescription").text());
        $('[id=categorytype] option').filter(function () {
            return ($(this).val() == "IN BOTH");
        }).prop('selected', true);
        $("#categorytype").parent().find(".select2-chosen").text("IN BOTH");
        $("#CatQciAmnt").val($(this).parents("tr").first().find(".Price").text());
        $("#CatSpAmnt").val($(this).parents("tr").first().find(".ClientPrice").text());
        $("#CatQciAmnt").attr("disabled", "disabled");
        $("#ModalFormCategories").modal("show");
        $("#categorytype").attr("disabled", "disabled");
    });

    function clear() {
        $("input[type=text]").val("");
        $("input[type=number]").val("");
        $("#txtDetail").val("");
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $("#CatQciAmnt").removeAttr("disabled");
        $("#categorytype").removeAttr("disabled");
        $("#hffrom").val("PS");
        $("#labelspamt").css("display", "none");
    }
    function Currentpage(val) {
        for (i = 0; i < val - 1; i++) {
            $("#grdCategories_next").click();
        }
        $('#hfcurrpage').val('1');
    }
    function Currentpage1(val) {
        for (i = 0; i < val - 1; i++) {
            $("#grdpendingCategories_next").click();
        }
        $('#hfcurrpage').val('1');
    }

    $("#reloadCategories").click(function () {
        OnreloadCategories();
    });

    $("#reloadupdateCategories").click(function () {
        OnreloadupdatedCategories();
    });

    function OnreloadCategories() {
        $.ajax({
            url: "ManageCategories.aspx/ViewQCCategoriespage",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: OnViewCommentssucess,
            error: function (response) {
                alert(response.error);

            }
        });

    }

    function OnViewCommentssucess(response) {

        $(".QCcategory").empty();
        $('.QCcategory').html(response.d);
    }

    function OnreloadupdatedCategories() {
        $.ajax({
            url: "ManageCategories.aspx/ViewupdatedQCCategories",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: OnViewupdatedCategories,
            error: function (response) {
                alert(response.error);

            }
        });

    }

    function OnViewupdatedCategories(response) {

        $(".QCupdatecategory").empty();
        $('.QCupdatecategory').html(response.d);
    }


    $("body").on("click", ".upupdated", function () {
        clearall();

        $("#hfprovid").val($(this).parents("tr").first().find(".upProductId").text());
       
        $("#lblnewtitle").text($(this).parents("tr").first().find(".upProductName").text());
        $("#lblnewdesc").text($(this).parents("tr").first().find(".upProductDescription").text());
        
        $("#lblnewqci").text($(this).parents("tr").first().find(".upPrice").text());
        $("#lblnewspprice").text($(this).parents("tr").first().find(".upClientPrice").text());
        getupdatedCategory();
        $("#Categorychanges").modal("show");
       
    });

    function clearall() {
        $("#lbloldtitle").text("");
        $("#lblnewtitle").text("");
        $("#lbloldqci").text("");
        $("#lblnewqci").text("");
        $("#lbloldspprice").text("");
        $("#lblnewspprice").text("");
    }

    function getupdatedCategory() {
        $.ajax({
            url: "ManageCategories.aspx/GetCategorybyproviderid",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            data: "{'RecordID':'" + $("#hfprovid").val() + "'}",
            success: getupdatedCategories,
            error: function (response) {
                alert(response.error);

            }
        });

    }

    function getupdatedCategories(response) {

        var objeditresponse = JSON.parse(response.d);
        $.each(objeditresponse, function (key, value) {
            $("#lbloldtitle").text(value.description);
            $("#lbloldspprice").text(value.spamnt);
            $("#lbloldqci").text(value.qciamnt);
            $("#lblolddesc").text(value.details);
        });
        if ($("#lblnewtitle").text() != $("#lbloldtitle").text())
            $("#lblnewtitle").css("color", "red");
        if ($("#lblnewspprice").text() != $("#lbloldspprice").text())
            $("#lblnewspprice").css("color", "red");
        if ($("#lblnewqci").text() != $("#lbloldqci").text())
            $("#lblnewqci").css("color", "red");
        if ($("#lblnewdesc").text() != $("#lblolddesc").text())
            $("#lblnewdesc").css("color", "red");

    }

    $("#btnupdatecat").click(function () {

       ValidupdateCategories();
    });

    function ValidupdateCategories() {

        var formcat = $('#form2');
        var error1 = $('.alert-danger', formcat);
        var success1 = $('.alert-success', formcat);

        formcat.validate({
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
                //$("#labelspamt").css("display", "none");
                //$("#ModalFormCategories").modal("hide");
                var Providerid = $("#hfprovid").val();
                var Title = $("#lblnewtitle").text().replace(/(['"])/g, "\\$1");
                var SpAmnt = $("#lblnewspprice").text();
                var QCIAmnt = $("#lblnewqci").text();
                var CatDesc = $("#lblnewdesc").text();

                $.ajax({
                    url: "ManageCategories.aspx/UpdateCategory",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: "{'Providerid':'" + Providerid + "','Title':'" + Title + "','Desc':'" + CatDesc + "','SPAmnt':'" + SpAmnt + "','QCIAmnt':'" + QCIAmnt + "'}",
                    async: true,
                    success: OnUpdate,
                    // clear text here after save complete
                    error: function () {
                        //alert("error ");
                    }
                });
            }
        });
    }

    function OnUpdate(response) {
        if (response.d == "successfully") {
            $("#Categorychanges").hide();
            $("#msg_txt1").text("Successfully Update the Category.");
            OnreloadupdatedCategories();
            $("#success1").modal("show");           
        }
        else {
            var values = response.d.split('|');
            var recordid = "#" + values[1];
            $('#grdCategories').dataTable().fnDestroy();
            $(recordid).remove();
            $('#grdCategories > tbody').append(values[0]);
            GridCategories.init();
            $("#Categorychanges").hide();
            $("#msg_txt1").text("Successfully Update the Category.");
            OnreloadupdatedCategories();
            
            $("#success1").modal("show");
        }
        hideright();
    }

    $("#Button2").click(function () {
        $(".modal-backdrop").hide();
    });
});





var GridBulletinItems = function () {

    var ShowBulletinItems = function () {

        var table = $('#grdBulletinItems');

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

        var tableWrapper = $("#grdBulletinItems_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            ShowBulletinItems();
        }

    };

}();
var GridBulletinCategory = function () {

    var ShowBulletinCategory = function () {

        var table = $('#grdBulletinCategory');

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

        var tableWrapper = $("#grdBulletinCategory_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            ShowBulletinCategory();
        }

    };

}();
var GridBulletinPosts = function () {

    var ShowBulletinPosts = function () {

        var table = $('#grdBulletinPost');

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

        var tableWrapper = $("#grdBulletinPost_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            ShowBulletinPosts();
        }

    };

}();

$(document).ready(function () {
    
   
    var jsCategory = "";
    GridBulletinItems.init();
    GridBulletinCategory.init();
    GridBulletinPosts.init();

    function ClearFields() {
        $("#txtItem").val('');
        $(".imgIcon").css("display", "none");
        if ($(".file-preview").length && $(".fileinput-remove-button").length) {
            $(".file-preview").css("display", "none");
            $(".fileinput-remove-button").css("display", "none");
        }
    }
    

    $("#btnAddBulletinItem").click(function () {
        ClearFields();
        $("#hdnBullItemID").val('0');
        $('#divbulletinitemform').modal('show');
    });

    function ValidateBulletinItems() {

        var formBulletinItems = $('#formbulletinitem');
        var error1 = $('.alert-danger', formBulletinItems);
        var success1 = $('.alert-success', formBulletinItems);

        formBulletinItems.validate({
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

                txtItem: {
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
                $('#divbulletinitemform').modal('hide');

                var formData = new FormData();
                formData.append('ID', $("#hdnBullItemID").val());
                formData.append('Title', $("#txtItem").val());
                if ($(".file-preview").css("display") == 'block')
                    formData.append('file', $('#fileIcon')[0].files[0]);
                
                $.ajax(
                      {
                          url: "AddBulletinItems.ashx",
                          type: 'POST',
                          cache: false,
                          processData: false,
                          contentType: false,
                          data: formData,
                          complete: function () { },
                          progress: function (evt) { },
                          beforeSend: function (e) { },
                          success: OnAddBulletinItemsSuccess,
                          error: function (e) { }
                      });
            }
        });
    }

    function OnAddBulletinItemsSuccess(response) {

        if (response == 'UnSuccessful') {
            if ($("#hdnBullItemID").val() == '0')
                $("#BulletinItem").text("Item is not added.");
            else
                $("#BulletinItem").text("Item is not updated.");
            $('#divbulletinitemmsg').modal('show');
        }

        else {

            if ($("#hdnBullItemID").val() == '0') {
                $("#BulletinItem").text("Item has been added successfully.");
                $('#divbulletinitemmsg').modal('show');
                $('#grdBulletinItems').dataTable().fnDestroy();

            }
            else {
                var itemid = '#' + $("#hdnDelItemID").val();
                $("#BulletinItem").text("Item has been updated successfully.");
                $('#divbulletinitemmsg').modal('show');
                $('#grdBulletinItems').dataTable().fnDestroy();
                $(itemid).remove();
            }
               
            $('#grdBulletinItems > tbody').append(response);
            GridBulletinItems.init();
        }
    }

    $("#btnSubmitBulletinItems").click(function () {
        ValidateBulletinItems();
    });

    $('#grdBulletinItems').on('click', '.editBulletinItem', function (e) {

        ClearFields();

        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelItemID").val(trid);
        $("#hdnBullItemID").val($(this).attr("id"));
        var RecID = $("#hdnBullItemID").val();
        
        $.ajax({
            url: "ManageBulletinBoard.aspx/GetEditBulletinItem",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnEditBulletinItem,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnEditBulletinItem(response) {
        
        
        var objItem = JSON.parse(response.d);
        $.each(objItem, function (key, value) {
            $("#txtItem").val(value.ItemTitle);
            $(".imgIcon").css("display", "block");
            if(value.Image1!="")
                $(".imgIcon").attr("src", "../../Images/Icons/" + value.Image1);
        });
        $('#divbulletinitemform').modal('show');
    }
    $('#grdBulletinItems').on('click', '.delBulletinItem', function (e) {

        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelItemID").val(trid);
        $("#hdnBullItemID").val($(this).attr("id"));
        $("#divdelbulletinItem").text("Are you sure you want to delete this Item? All the Categories associated with this Item will also be deleted.");
        $('#deleteBulletinModel').modal('show');
    });


    $("#btndelBulletinYes").click(function () {

        var RecID = $("#hdnBullItemID").val();
        $('#deleteBulletinModel').modal('hide');
        $.ajax({
            url: "ManageBulletinBoard.aspx/DeleteBulletinItem",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnDeleteBulletinItem,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnDeleteBulletinItem(response) {

        if (response.d == 'Successful') {
            var itemid = '#' + $("#hdnDelItemID").val();
            var itemcatid = $("#hdnDelItemID").val().replace("ItemID", "CatItemID");
            $("#BulletinItem").text('Item has been deleted successfully.');
            $('#divbulletinitemmsg').modal('show');
            $('#grdBulletinItems').dataTable().fnDestroy();
            $(itemid).remove();
            GridBulletinItems.init();

            $("#grdBulletinCategory > tbody > tr").each(function () {
                
                $this = $(this);
                var rowid = $(this).find('td').attr('id');
                
                var dynrowid;
                if (rowid.indexOf("ContentPlaceHolder1") > -1) {
                    dynrowid = rowid.replace("ContentPlaceHolder1_rptBulletinCategory_", "");
                    dynrowid = dynrowid.split('_')[1];
                }
                else
                    dynrowid = rowid;
                if (itemcatid.indexOf(dynrowid) > -1) {
                    
                    var catpostid = $(this).closest('tr').attr('id').replace("CatID", "PostCatID");
                    var rowpostid = "#" + $(this).closest('tr').attr('id'); // table row ID
                    $('#grdBulletinCategory').dataTable().fnDestroy();
                    $(rowpostid).remove();
                    GridBulletinCategory.init();

                    $("#grdBulletinPost > tbody > tr").each(function () {
                        $this = $(this);
                        var rowid = $(this).find('td').attr('id');
                        var dynrowid;
                        if (rowid.indexOf("ContentPlaceHolder1") > -1) {
                            dynrowid = rowid.replace("ContentPlaceHolder1_rptBulletinPost_", "");
                            dynrowid = dynrowid.split('_')[1];
                        }
                        else
                            dynrowid = rowid;

                        if (catpostid.indexOf(dynrowid) > -1) {
                            var rowcatpostid = "#" + $(this).closest('tr').attr('id'); // table row ID 
                            $('#grdBulletinPost').dataTable().fnDestroy();
                            $(rowcatpostid).remove();
                            GridBulletinPosts.init();
                        }
                    });
                }
            });
        }
        else {
            $("#BulletinItem").text('Item is not deleted.');
            $('#divbulletinitemmsg').modal('show');
        }
    }


    //----------------------------------------------------------Manage Bulletin Category-------------------------------------------------------

    function ClearCategoryFields() {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $('#txtBullCat').val('');
        $('#SelBullItems').empty();
        $('#SelBullItems').append("<option value=''>----------Select----------</option>");
    }

    function FillBulletinItems() {
        
        
        $.ajax({
            url: "ManageBulletinBoard.aspx/FillBulletinItems",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnFillBulletinItems,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnFillBulletinItems(response) {
        
        var jsItems = JSON.parse(response.d);
        $.each(jsItems, function (key, value) {
            $('#SelBullItems').append($("<option></option>").val(value.ItemID).html(value.ItemTitle));

        });
    }

    function ValidateBulletinCategories() {
        var formBulletinCats = $('#formbullcats');
        var error1 = $('.alert-danger', formBulletinCats);
        var success1 = $('.alert-success', formBulletinCats);

        formBulletinCats.validate({
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

                txtBullCat: {
                    required: true
                },

                SelBullItems: {
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
                $('#divbulletincatform').modal('hide');
                var RecID = $("#hdnBullCatID").val();
                var Category = $("#txtBullCat").val();
                var ItemID = $("#SelBullItems").val();
                
                $.ajax({
                    url: "ManageBulletinBoard.aspx/AddUpdateBulletinCategory",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: '{"RecID":"' + RecID + '","ItemID":"' + ItemID + '","Category":"' + Category + '"}',
                    dataType: "json",
                    success: OnAddUpdateBulltinCategory,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });

            }
        });
    }

    function OnAddUpdateBulltinCategory(response) {

        if (response.d == 'UnSuccessful') {
            if ($("#hdnBullCatID").val() == '0')
                $("#BulletinItem").text("Category is not added.");
            else
                $("#BulletinItem").text("Category is not updated.");
            $('#divbulletinitemmsg').modal('show');
        }

        else {

            if ($("#hdnBullCatID").val() == '0') {
                $("#BulletinItem").text("Category has been added successfully.");
                $('#divbulletinitemmsg').modal('show');
                $('#grdBulletinCategory').dataTable().fnDestroy();

            }
            else {
                var categoryid = '#' + $("#hdnBullDelCatID").val();
                $("#BulletinItem").text("Category has been updated successfully.");
                $('#divbulletinitemmsg').modal('show');
                $('#grdBulletinCategory').dataTable().fnDestroy();
                $(categoryid).remove();
            }
            $('#grdBulletinCategory > tbody').append(response.d);
            GridBulletinCategory.init();
        }
    }
    $("#btnAddBulletinCat").click(function () {

        ClearCategoryFields();
        FillBulletinItems();
        $("#hdnBullCatID").val('0');
        $('#divbulletincatform').modal('show');
        
    });

    $('#grdBulletinCategory').on('click', '.editBulletinCat', function (e) {

        ClearCategoryFields();
        FillBulletinItems();
        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnBullDelCatID").val(trid);
        $("#hdnBullCatID").val($(this).attr("id"));
        var RecID = $("#hdnBullCatID").val();

        $.ajax({
            url: "ManageBulletinBoard.aspx/GetEditBulletinCat",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnEditBulletinCat,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnEditBulletinCat(response) {
        var objCat = JSON.parse(response.d);
        $.each(objCat, function (key, value) {
            $("#SelBullItems").val(value.ItemID);
            $("#txtBullCat").val(value.ItemCatTitle);
        });
        $('#divbulletincatform').modal('show');
    }

    $("#btnbullcatSubmit").click(function () {
        ValidateBulletinCategories();
    });

    $('#grdBulletinPost').on('click', '.approvebullpost', function (e) {

        $("#hdnRecID").val($(this).closest('tr').index());
        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnBullItemID").val($(this).attr("id"));
        $('#divbullapprposts').modal('show');
    });
   
    $('#grdBulletinPost').on('click', '.delBulletinPost', function (e) {

        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelItemID").val(trid);
        $("#hdnBullItemID").val($(this).attr("id"));
        $('#divdelbullpost').modal('show');
    });

    $('#grdBulletinCategory').on('click', '.delBulletinCat', function (e) {

        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelItemID").val(trid);
        $("#hdnBullItemID").val($(this).attr("id"));
        $('#divdelbullcat').modal('show');

    });

    $("#btnDelPostYes").click(function () {

        var RecID = $("#hdnBullItemID").val();
        
        $.ajax({
            url: "ManageBulletinBoard.aspx/DeleteBulletinPost",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnDeleteBulletinPost,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnDeleteBulletinPost(response) {

        if (response.d == 'UnSuccessful') {
            $("#BulletinItem").text('Post is not deleted.');
            $('#divbulletinitemmsg').modal('show');
        }
        else {
            var itemid = '#' + $("#hdnDelItemID").val();
            $("#BulletinItem").text('Post has been deleted successfully.');
            $('#divbulletinitemmsg').modal('show');
            $('#grdBulletinPost').dataTable().fnDestroy();
            $(itemid).remove();
            GridBulletinPosts.init();
        }
    }

    $("#btnApproveYes").click(function () {

        var RecID = $("#hdnBullItemID").val();
        $.ajax({
            url: "ManageBulletinBoard.aspx/ApproveBulletinPost",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnApprovedBulletinPost,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });
    function OnApprovedBulletinPost(response) {

        if (response.d == 'Successful') {

            $('#grdBulletinPost tbody tr:eq(' + $("#hdnRecID").val() + ') td:eq(5)').text('Approved');
            $("#BulletinItem").text("Post has been approved successfully.");
            $('#divbulletinitemmsg').modal('show');

        }

        else {
            $("#BulletinItem").text("Post is not approved due to some internal server error.");
            $('#divbulletinitemmsg').modal('show');
        }
    }

    $("#btnDelCatYes").click(function () {

        var RecID = $("#hdnBullItemID").val();
        
        $.ajax({
            url: "ManageBulletinBoard.aspx/DeleteBulletinCategory",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnDeleteBulletinCategory,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnDeleteBulletinCategory(response)
    {
        if (response.d == 'Successful') {
            var categoryid = '#' + $("#hdnDelItemID").val();
            var catpostid = $("#hdnDelItemID").val().replace("CatID", "PostCatID");
            $("#BulletinItem").text('Category has been deleted successfully.');
            $('#divbulletinitemmsg').modal('show');
            $('#grdBulletinCategory').dataTable().fnDestroy();
            $(categoryid).remove();
            GridBulletinCategory.init();
            $("#grdBulletinPost > tbody > tr").each(function () {
                $this = $(this)
                var rowid = $(this).find('td').attr('id');
                var dynrowid;
                if (rowid.indexOf("ContentPlaceHolder1") > -1) {
                    dynrowid = rowid.replace("ContentPlaceHolder1_rptBulletinPost_", "");
                    dynrowid = dynrowid.split('_')[1];
                }
                else
                    dynrowid = rowid;

                if (catpostid.indexOf(dynrowid) > -1) {
                    var rowpostid = "#" + $(this).closest('tr').attr('id'); // table row ID 
                    $('#grdBulletinPost').dataTable().fnDestroy();
                    $(rowpostid).remove();
                    GridBulletinPosts.init();
                }
            });
        }

        else {
            $("#BulletinItem").text('Category is not deleted due to internal server error.');
            $('#divbulletinitemmsg').modal('show');
        }
    }

    function LoadItems() {
        
        $.ajax({
            url: "ManageBulletinBoard.aspx/LoadItems",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnItemsSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnItemsSuccess(response) {
        var jsItem = JSON.parse(response.d);
        $.each(jsItem, function (key, value) {
            $('#SelItemType').append($("<option></option>").val(value.ItemID).html(value.ItemTitle));
        });

    }

    function LoadCategories() {
        $.ajax({
            url: "ManageBulletinBoard.aspx/LoadCategories",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnBulletinCategoriesSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnBulletinCategoriesSuccess(response) {
        jsCategory = JSON.parse(response.d);
    }

    $("#SelItemType").change(function () {
        $('#SelItemCategory').empty();
        $('#SelItemCategory').append("<option value=''>----------Select----------</option>");
        $.each(jsCategory, function (key, value) {
            if ($("#SelItemType").val() == value.ItemID)
                $('#SelItemCategory').append($("<option></option>").val(value.ItemCatID).html(value.ItemCatTitle));
        });
    });

    function ClearPostFields() {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $('#txtSubject').val("");
        $('#txtPostedBy').val("");
        $('#SelItemType').empty();
        $('#SelItemType').append("<option value=''>----------Select----------</option>");
        $('#SelItemCategory').empty();
        $('#SelItemCategory').append("<option value=''>----------Select----------</option>");
        $('#txtBulletinExp').val("");
        $('#txtReply').val("");
        $('#txtWeblink').val("");
        $('#txtComments').val("");
        $(".imgPost1").css("display", "none");
        $(".imgPost2").css("display", "none");
        if ($(".file-preview").length && $(".fileinput-remove-button").length) {
            $(".file-preview").css("display", "none");
            $(".fileinput-remove-button").css("display", "none");
        }
    }
    $('#grdBulletinPost').on('click', '.editBulletinPost', function (e) {

        $("#divbulletinpost :input").attr("disabled", false);
        ClearPostFields();
        LoadItems();
        LoadCategories();
        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelPostID").val(trid);
        $("#hdnRecID").val($(this).attr("id"));
        var RecID = $("#hdnRecID").val();

        $.ajax({
            url: "ManageBulletinBoard.aspx/GetEditBulletinPost",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnEditBulletinPost,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnEditBulletinPost(response) {

        var objPosts = JSON.parse(response.d);


        $.each(objPosts, function (key, value) {
            $('#txtSubject').val(value.BullSubject);
            $('#txtPostedBy').val(value.CreatedBy);
            $('#SelItemType').val(value.ItemID);
            $.each(jsCategory, function (key, value) {
                if ($("#SelItemType").val() == value.ItemID)
                    $('#SelItemCategory').append($("<option></option>").val(value.ItemCatID).html(value.ItemCatTitle));
            });
            $('#SelItemCategory').val(value.ItemCatID);
            $('#txtBulletinExp').val(value.PostExp);
            $('#txtReply').val(value.ReplyEmail);
            $('#txtWeblink').val(value.WebLink);
            $('#txtComments').val(value.Description);
            if (value.Image1 != "") {
                $(".imgPost1").css("display", "block");
                $(".imgPost1").attr("src", "../../Images/" + value.Image1);
            }
            if (value.Image2 != "") {
                $(".imgPost2").css("display", "block");
                $(".imgPost2").attr("src", "../../Images/" + value.Image2);    
            }
        });


        $('#divnewpostform').modal('show');
    }
    $("#btnBackBulletin").click(function () {
        document.location = "BulletinBoard.aspx";
    });

    function ValidateBulletinPosts() {



        var formBulletinPosts = $('#formbulletinpost');
        var error1 = $('.alert-danger', formBulletinPosts);
        var success1 = $('.alert-success', formBulletinPosts);

        formBulletinPosts.validate({
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

                txtSubject: {
                    required: true
                },

                txtPostedBy: {
                    required: true
                },

                SelItemType: {
                    required: true
                },

                SelItemCategory: {
                    required: true
                },
                txtBulletinExp: {
                    required: true
                },
                txtReply: {
                    required: true
                },
                txtWeblink: {
                    required: true
                },
                txtComments: {
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
                $('#divnewpostform').modal('hide');
                var formData = new FormData();

                formData.append('ID', $("#hdnRecID").val());
                formData.append('Subject', $("#txtSubject").val());
                formData.append('CatItemID', $("#SelItemCategory").val());
                formData.append('PostExp', $("#txtBulletinExp").val());
                formData.append('Reply', $("#txtReply").val());
                formData.append('WebLink', $("#txtWeblink").val());
                formData.append('Comments', $("#txtComments").val());

                if ($(".file-preview").css("display") == 'block') {

                    if ($("#fileposts")[0].files.length == 1)
                        formData.append('file', $('#fileposts')[0].files[0]);
                    else {
                        formData.append('file', $('#fileposts')[0].files[0]);
                        formData.append('file', $('#fileposts')[0].files[1]);
                    }
                }
                

                $.ajax({
                    url: "PostImages.ashx",
                    type: 'POST',
                    cache: false,
                    processData: false,
                    contentType: false,
                    data: formData,
                    complete: function () { },
                    progress: function (evt) { },
                    beforeSend: function (e) { },
                    success: OnAddBulletinPostsSuccess,
                    error: function (e) { }
                });

    }
});
}
    function OnAddBulletinPostsSuccess(response) {

        if (response == 'UnSuccessful') {
            $("#BulletinItem").text("Post is not updated due to some error occured.");
            $('#divbulletinitemmsg').modal('show');
        }

        else {
            $("#BulletinItem").text("Post has been updated successfully.");
            $('#divbulletinitemmsg').modal('show');
        }

    }
    $('#btnSubmitBulletinPosts').click(function () {
        ValidateBulletinPosts();
    });

    $('#grdBulletinPost').on('click', '.viewBulletinPost', function (e) {

        ClearPostFields();
        LoadItems();
        LoadCategories();
        $("#divbulletinpost :input").attr("disabled", true);
        $("#hdnRecID").val($(this).attr("id"));
        var RecID = $("#hdnRecID").val();

        $.ajax({
            url: "ManageBulletinBoard.aspx/GetEditBulletinPost",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnEditBulletinPost,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });
});
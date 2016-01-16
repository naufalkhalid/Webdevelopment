
var GridCommunityCategory = function () {

    var GridCommunityCategoryTable = function () {

        var table = $('#grdCommunityCategory');

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

        var tableWrapper = $("#grdCommunityCategory_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridCommunityCategoryTable();
        }

    };

}();

var GridCommunityPost = function () {

    var GridCommunityPostTable = function () {

        var table = $('#grdCommunityPosts');

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

        var tableWrapper = $("#grdCommunityPosts_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;
    }

    return {

        //main function to initiate the module
        init: function () {
            GridCommunityPostTable();
        }

    };

}();

$(document).ready(function () {

    var cat = "";

    GridCommunityCategory.init();
    GridCommunityPost.init();
  
    function ValidateCategory() {
        var formPostCategory = $('#form_PostCategory');
        var error1 = $('.alert-danger', formPostCategory);
        var success1 = $('.alert-success', formPostCategory);

        formPostCategory.validate({
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
                txtCategory: {
                    required: true
                },

                cateventcolor: {
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
                $('#dialog-PostCategory-form').modal('hide');
                var RecID = $("#hdnCategoryID").val();
                var CatName = $("#txtCategory").val();
                var CategoryEventColor = '#' + $('.pick-a-color').val();
                cat = CatName;

                $.ajax({
                    url: "ManagePosts.aspx/AddUpdateCategory",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: '{"RecID":"' + RecID + '","CatName":"' + CatName + '","CategoryEventColor":"' + CategoryEventColor + '"}',
                    dataType: "json",
                    success: OnAddUpdateCategorySuccess,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });

            }
        });
    }

    function OnAddUpdateCategorySuccess(response) {

        $('#dialog-PostCategory-form').modal('hide');

        if (response.d == 'UnSuccessful') {
            if ($("#hdnCategoryID").val() == '0')
                $("#CategoryMsg").text('New Category is not added.');
            else
                $("#CategoryMsg").text('Category is not updated.');
            $('#dialog-MsgCategory-Model').modal('show');
        }

        else {

            if ($("#hdnCategoryID").val() == '0') {
                $("#CategoryMsg").text('New Category has been added successfully.');
                $('#dialog-MsgCategory-Model').modal('show');
                $('#grdCommunityCategory').dataTable().fnDestroy();
                
            }
            else {
                var communityid = '#' + $("#hdnDelCatID").val();
                $("#CategoryMsg").text('Category has been updated successfully.');
                $('#dialog-MsgCategory-Model').modal('show');
                $('#grdCommunityCategory').dataTable().fnDestroy();
                $(communityid).remove();
                $('#grdCommunityPosts').dataTable().fnDestroy();
                $("#grdCommunityPosts > tbody > tr").each(function () {

                    $this = $(this)
                    var rowid = $(this).find('td').attr('id').replace("CatID","CategoryID");

                    if (rowid.indexOf("ContentPlaceHolder1") > -1) {
                        dynrowid = rowid.replace("ContentPlaceHolder1_rptCommunityPosts_", "");
                        dynrowid = dynrowid.split('_')[0] + '_' + dynrowid.split('_')[1];
                    }
                    else
                        dynrowid = rowid;

                    if (communityid.indexOf(dynrowid) > -1) {
                        $(this).closest('tr').children('td:first').text(cat);   
                    }
                });
                GridCommunityPost.init();
            }
            $('#grdCommunityCategory > tbody').append(response.d);
            GridCommunityCategory.init();
        }

    }
    $("#btnAddPostsCategory").click(function () {
         ClearCategoryFields();
        $('#dialog-PostCategory-form').modal('show');
    });

    $("#btnSubmitPostCat").click(function () {
        ValidateCategory();
    });

    $("#btnCategoryOk").click(function () {
        $("#grdCommunityCategory").dataTable().fnDestroy();
        GridCommunityCategory.init();
        //document.location.href = "ManagePosts.aspx";
    });

    function ClearCategoryFields() {
        $("#hdnCategoryID").val('0');
        $('#txtCategory').val("");

    }
    function ClearCalendarFields() {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $('#SelCategory').val('');
        $('#txtTitle').val("");
        $('#txtCalStartDate').val("");
        $('#txtCalEndDate').val("");
        $('#txtCalComments').val("");
    }
    function FillPostsCategory() {
        $.ajax({
            url: "CommunityCalendar.aspx/GetPostsCategory",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnPostsCategorySuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnPostsCategorySuccess(response) {

        var jsPosts = JSON.parse(response.d);
        $.each(jsPosts, function (key, value) {
            $('#SelCategory').append($("<option></option>").val(value.ID).html(value.Title));

        });
    }

    function ValidateCommunityCalendar() {

        var formCommCal = $('#form_CommCalendar');
        var error1 = $('.alert-danger', formCommCal);
        var success1 = $('.alert-success', formCommCal);

        formCommCal.validate({
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

                SelCategory: {
                    required: true
                },

                txtTitle: {
                    required: true
                },

                txtCalStartDate: {
                    required: true
                },

                txtCalEndDate: {
                    required: true
                },

                txtCalComments: {
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
                $('#dialog-commcalendar-form').modal('hide');
                var RecID = $("#hdnPostsRecID").val();
                var CatID = $("#SelCategory").val();
                var Title = $("#txtTitle").val();
                var StartDate = $("#txtCalStartDate").val();
                var EndDate = $("#txtCalEndDate").val();
                var Description = $("#txtCalComments").val();
                var Date1;
                var Date2;

                if (RecID > 0) {   
                    Date1 = new Date(StartDate.replace("T", " ").replace(/-/g, '/'));
                    Date2 = new Date(EndDate.replace("T", " ").replace(/-/g, '/'));
                }
                else
                {
                    Date1 = new Date(StartDate.replace("-",""));
                    Date2 = new Date(EndDate.replace("-", ""));
                }
                if ((Date2 - Date1) < 0) {
                    $("#CommCalMsg").text('End Date should be greater than Start Date.');
                    $('#dialog-MsgCommCal-Model').modal('show');
                    return false;
                }

                else {
                    $.ajax({
                        url: "ManagePosts.aspx/AddUpdatePosts",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: '{"RecID":"' + RecID + '","CatID":"' + CatID + '","Title":"' + Title + '","StartDate":"' + StartDate + '","EndDate":"' + EndDate + '","Description":"' + Description + '"}',
                        dataType: "json",
                        success: OnAddPostsSuccess,
                        failure: function (response) {
                            //alert(response.d);
                        }
                    });
                }
            }
        });
    }

    $("#btnAddPosts").click(function () {

        $('#SelCategory').empty();
        $('#SelCategory').append("<option value=''>------------------------------------Select------------------------------------</option>");
        FillPostsCategory();
        ClearCalendarFields();
        $("#hdnPostsRecID").val('0');
        $('#dialog-commcalendar-form').modal('show');
    });

    $("#btnSubmitPosts").click(function () {

        ValidateCommunityCalendar();
    });

    function OnAddPostsSuccess(response) {

        $('#dialog-commcalendar-form').modal('hide');

        if (response.d == 'UnSuccessful') {
            if( $("#hdnPostsRecID").val() == '0')
                $("#CommCalMsg").text('New Post is not added.');
            else
                $("#CommCalMsg").text('Post is not updated.');
                $('#dialog-MsgCommCal-Model').modal('show');
        }
        else {
            if ($("#hdnPostsRecID").val() == '0') {
                $("#CommCalMsg").text('New post has been added successfully.');
                $('#dialog-MsgCommCal-Model').modal('show');
                $('#grdCommunityPosts').dataTable().fnDestroy();  
            }
            else {
                var communityid = '#' + $("#hdnDelPostID").val();
                $("#CommCalMsg").text('Post has been updated successfully.');
                $('#dialog-MsgCommCal-Model').modal('show');
                $('#grdCommunityPosts').dataTable().fnDestroy();
                $(communityid).remove();
            }
            $('#grdCommunityPosts > tbody').append(response.d);
            GridCommunityPost.init();
        }

    }

    $("#btnBackCalendar").click(function () {
        document.location = "CommunityCalendar.aspx";
    });

    $('#grdCommunityCategory').on('click', '.editcommunitycategory', function (e) {

        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelCatID").val(trid);
        $("#hdnCategoryID").val($(this).attr("id"));
        var RecID = $("#hdnCategoryID").val();
        
        $.ajax({
            url: "ManagePosts.aspx/GetEditCategory",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnEditCategorySuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });

    });

    function OnEditCategorySuccess(response) {

        var objCategory = JSON.parse(response.d);
        $.each(objCategory, function (key, value) {
            $("#txtCategory").val(value.Title);
            $(".pick-a-color").val(value.EventColor)
            $(".current-color").css({ "background-color": '#' + value.EventColor });
        });
        $('#dialog-PostCategory-form').modal('show');
    }

    $('#grdCommunityCategory').on('click', '.delcommunitycategory', function (e) {
        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelCatID").val(trid);
        $("#hdnCategoryID").val($(this).attr("id"));
        $('#deleteCategoryModel').modal('show');

    });

    $("#btndelCategoryYes").click(function () {

        var RecID = $("#hdnCategoryID").val();
        $('#dialog-MsgCategory-Model').modal('hide');
        $.ajax({
            url: "ManagePosts.aspx/DeleteCategory",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnDeleteCategorySuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnDeleteCategorySuccess(response) {
        if (response.d == 'Successful') {
            var catpostid = $("#hdnDelCatID").val().replace("CategoryID", "CatID");
            var communityid = '#' + $("#hdnDelCatID").val();
            
            $("#CategoryMsg").text('Category has been deleted successfully.');
            $('#dialog-MsgCategory-Model').modal('show');
            $('#grdCommunityCategory').dataTable().fnDestroy();
            $(communityid).remove();
            GridCommunityCategory.init();
            $('#grdCommunityPosts').dataTable().fnDestroy();
            $("#grdCommunityPosts > tbody > tr").each(function () {
                $this = $(this)
                var rowid = $(this).find('td').attr('id');
                var dynrowid;
                if (rowid.indexOf("ContentPlaceHolder1") > -1) {
                    dynrowid = rowid.replace("ContentPlaceHolder1_rptCommunityPosts_", "");
                    dynrowid = dynrowid.split('_')[1];
                }
                else
                    dynrowid = rowid;

          
                if (catpostid.indexOf(dynrowid) > -1) {
                    var rowpostid = "#" + $(this).closest('tr').attr('id'); // table row ID 
                    $(rowpostid).remove();
                }
            });
            GridCommunityPost.init();
        }
        else {
            $("#CategoryMsg").text('Post is not deleted.');
            $('#dialog-MsgCategory-Model').modal('show');
        }
    }

    $('#grdCommunityPosts').on('click', '.editPosts', function (e) {

        $('#SelCategory').empty();
        $('#SelCategory').append("<option value=''>------------------------------------Select------------------------------------</option>");
        FillPostsCategory();
        ClearCalendarFields();
        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelPostID").val(trid);
        $("#hdnPostsRecID").val($(this).attr("id"));
        var RecID = $("#hdnPostsRecID").val();

        $.ajax({
            url: "ManagePosts.aspx/GetEditPosts",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnEditPostSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });

    });

    function OnEditPostSuccess(response) {

        var objPosts = JSON.parse(response.d);
        $.each(objPosts, function (key, value) {
            
            $("#SelCategory").val(value.ID);
            $("#txtTitle").val(value.Title);
            $("#txtCalStartDate").val(value.StartDate);
            $("#txtCalEndDate").val(value.EndDate);
            $("#txtCalComments").val(value.Description);
            
        });
        $('#dialog-commcalendar-form').modal('show');
    }

    $('#grdCommunityPosts').on('click', '.deletePosts', function (e) {        
        var trid = $(this).closest('tr').attr('id'); // table row ID 
        $("#hdnDelPostID").val(trid);
        $("#hdnPostsRecID").val($(this).attr("id"));
        $('#deleteCommCalendarModal').modal('show');

    });

    $("#btnPostsYes").click(function () {

        var RecID = $("#hdnPostsRecID").val();
        $('#dialog-MsgCommCal-Model').modal('hide');

        $.ajax({
            url: "ManagePosts.aspx/DeletePosts",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnDeletePostsSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });
    function OnDeletePostsSuccess(response) {

        if (response.d == 'Successful') {

            var communityid = '#' + $("#hdnDelPostID").val();
            $("#CommCalMsg").text('Post has been deleted successfully.');
            $('#dialog-MsgCommCal-Model').modal('show');
            $('#grdCommunityPosts').dataTable().fnDestroy();
            $(communityid).remove();
            GridCommunityPost.init();
        }
        else {
            $("#CommCalMsg").text('Post is not deleted.');
            $('#dialog-MsgCommCal-Model').modal('show');
        }
    }

    $("#btnManageCategory").click(function () {
        document.location.href = "ManagePosts.aspx";
    });

    $("#btnBackCalendar").click(function () {
        document.location.href = "CommunityCalendar.aspx";
    });

});
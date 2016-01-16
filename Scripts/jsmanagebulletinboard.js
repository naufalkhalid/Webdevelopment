

var BulletinBoardPanel = function () {

    var ShowBulletinBoard = function () {

        $.ajax({
            url: "BulletinBoard.aspx/LoadBulletinBoard",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnBulletinBoardSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });

        function OnBulletinBoardSuccess(response) {

            $('#divBulletinBoard').jstree({
                "core": {
                    "data": response
                }

            });
        }
        

        // handle link clicks in tree nodes(support target="_blank" as well)
        $('#divBulletinBoard').on('select_node.jstree', function (e, data) {
            
            $.ajax({
                url: "BulletinBoard.aspx/LoadPostsByCategory",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"Category":"' + $(".jstree-clicked").text() + '"}',
                dataType: "json",
                success: OnLoadPostsbyCategory,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        });

        function OnLoadPostsbyCategory(response) {
            $('#grdBulletinPosts').dataTable().fnDestroy();
            $('#grdBulletinPosts > tbody').empty();
            $('#grdBulletinPosts > tbody').append(response.d);
            GridBulletinPostings.init();
        }
    }

    return {
        //main function to initiate the module
        init: function () {

            ShowBulletinBoard();
        }

    };

}();
var GridBulletinPostings = function () {

    var GridBulletinPostsTable = function () {

        var table = $('#grdBulletinPosts');

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

        var tableWrapper = $("#grdBulletinPosts_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridBulletinPostsTable();
        }

    };

}();

$(document).ready(function () {

    var jsCategory = "";
    var filestoupload = 0;

    GridBulletinPostings.init();
    LoadBulletinBoard();
 

    function LoadBulletinBoard() {

        $.ajax({
            url: "BulletinBoard.aspx/LoadBulletinBoard",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnBulletinBoardSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnBulletinBoardSuccess(response) {
        $("#divBulletinBoard").append(response.d);
        $('#i.jstree-icon.jstree-themeicon.jstree-themeicon-custom').remove();
        BulletinBoardPanel.init();
        $("#divBulletinBoard").jstree('open_node', $("#j1_1"));
    
        //$("#divBulletinBoard").jstree('open_all');
    }

    function LoadItems() {
        $.ajax({
            url: "BulletinBoard.aspx/LoadItems",
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
            url: "BulletinBoard.aspx/LoadCategories",
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

    $('#btnAddNewpost').click(function () {
        ClearBulletinForm();
        LoadItems();
        LoadCategories();
        $('#divnewpostform').modal('show');
    });

    function ClearBulletinForm() {

        $('#hdnRecID').val("0");
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $('#txtSubject').val("");
        $('#txtPostedBy').val($('#ContentPlaceHolder1_hdnPostedBy').val());
        $('#SelItemType').empty();
        $('#SelItemType').append("<option value=''>----------Select----------</option>");
        $('#SelItemCategory').empty();
        $('#SelItemCategory').append("<option value=''>----------Select----------</option>");
        $('#txtBulletinExp').val("");
        $('#txtReply').val("");
        $('#txtWeblink').val("");
        $('#txtComments').val("");
    }
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
                formData.append('ID', $('#hdnRecID').val());
                formData.append('Subject', $("#txtSubject").val());
                formData.append('CatItemID', $("#SelItemCategory").val());
                formData.append('PostExp', $("#txtBulletinExp").val());
                formData.append('Reply', $("#txtReply").val());
                formData.append('WebLink', $("#txtWeblink").val());
                formData.append('Comments', $("#txtComments").val());
                
                if ($("#file-1")[0].files.length == 1)
                    formData.append('file', $('#file-1')[0].files[0]);
                else {
                    formData.append('file', $('#file-1')[0].files[0]);
                    formData.append('file', $('#file-1')[0].files[1]);
                }

                $.ajax(
                      {
                          url: "PostImages.ashx",
                          type: 'POST',
                          cache: false,
                          processData: false,
                          contentType:false,
                          data: formData,
                          complete: function () {},
                          progress: function (evt) {},
                          beforeSend: function (e) {},
                          success: OnAddBulletinPostsSuccess,
                          error: function (e) {}
                      });
            }
        });
    }

    function OnAddBulletinPostsSuccess(response) {
        
        if (response == 'UnSuccessful') {
            $("#BulletinMsg").text("Post is not submitted due to some error occured.");
            $('#divbulletinpostmsg').modal('show');
        }

        else {
            $("#BulletinMsg").text("Post has been submitted successfully.It will appear on Bulletin Board after being approved by the building management.");
            $('#divbulletinpostmsg').modal('show');
        }
        
    }

 
    $('#btnSubmitBulletinPosts').click(function () {
        ValidateBulletinPosts();
    });

    $('#btnManageBulletins').click(function () {
        document.location = "ManageBulletinBoard.aspx";
    });

    
});
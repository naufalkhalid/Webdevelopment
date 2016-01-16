
var GridSegments = function () {

    var GridSegmentTable = function () {

        var table = $('#grdManageSegments');

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

        var tableWrapper = $("#grdManageSegments");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridSegmentTable();
        }

    };

}();
var GridCategory = function () {

    var GridCategoryTable = function () {

        var table = $('#grdManageCategory');

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

        var tableWrapper = $("#grdManageCategory");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridCategoryTable();
        }

    };

}();
$(document).ready(function () {
    /*************************************************Segments*****************************************************************/
    GridSegments.init();
    GridCategory.init();
    $("#btnOpenSegmentModal").click(function () {

        
        $("#BtnAddUpdate").text("Add");
        $("#ModalSegments").modal('show');
        $("#RecordID").val("0");
       
        clear();
    });
    $("#BtnAddUpdate").click(function () {
       
        ValidateSegments();
       
    });
    function  AddUpdateSegment()
    {
        
        
        var SegmentName = $("#segmentname").val();
       
        var RecordId = $("#RecordID").val();
       
        $.ajax({
            url: "ManageWarrantyProducts.aspx/AddUpdateWarrantySegments",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'segmentname':'" + SegmentName + "','RecordId':'" + RecordId + "'}",
            async: false,
            success: OnAddUpdateSuccess,

            error: function () {

                alert("failure");

            }

        }

     );


    }
    function OnAddUpdateSuccess(response) {
      
        var segmentId = '#'+ $("#TblSegmentRowId").val();
     
        $('#grdManageSegments').dataTable().fnDestroy();
       
        $(segmentId).remove();
        $('#grdManageSegments > tbody').append(response.d);
        GridSegments.init();
       
        $("#dialog-message-SegmentModel").modal("show");


    }
    $('#grdManageSegments').on('click', '.BtnEditSegment', function (e) {

        var trids = $(this).closest('tr').attr('id');
      
        $("#BtnAddUpdate").text("Edit");
        $("#RecordID").val($(this).closest('tr').attr('id'));
        $("#TblSegmentRowId").val($(this).closest('tr').attr('id'));
       
       
        $.ajax({
            url: "ManageWarrantyProducts.aspx/GetRecordId",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + trids + "'}",
            async: false,
            success: OnRecordIdSuccess,

            error: function () {

                alert("failure");

            }

        }

   );
        
       

    });
    function OnRecordIdSuccess(response) {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        
        $("#ModalSegments").modal('show');
      
        var objEditReq = JSON.parse(response.d);
        $.each(objEditReq, function (key, value) {
            
           $("#segmentname").val(value.SegmentName);
        });
    }
    function ValidateSegments() {

        var formseg = $('#form_Segments');
        var error1 = $('.alert-danger', formseg);
        var success1 = $('.alert-success', formseg);

        formseg.validate({
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

                segmentname: {
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
                $("#ModalSegments").modal('hide');
                AddUpdateSegment();


            }
        });


    }
    function clear() {
        $("#categoryeditimage").css('display', "none");
        $("input[type=text]").val("");
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $(".file-preview").parent().addClass("file-input-new");
        $(".select2-chosen").text("");

    }
       
 /***********************************************************************************************************************************/
   
    /*************************************************Categories*****************************************************************/
    $("#btnOpenCategoryModal").click(function ()
    {
       
        $.ajax({
            url: "ManageWarrantyProducts.aspx/ViewWarrantySegmentsName",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            async: false,
            success: OnSegemntSuccess,

            error: function () {

                alert("failure");

            }

        }

   );

       
    });
    function OnSegemntSuccess(response) {
    
        $("#ModalCategoryForm").modal("show");
        $("#BtnCatAddUpdate").text("Add");
        clear();
   
        $("#RecordCatID").val("0");
        $("#DropdownSegments").empty();
     
        $('#DropdownSegments').append("<option value='0'>--Select--</option>");
    
        var jsdata = JSON.parse(response.d);
        $.each(jsdata, function (key, value) {

            $('#DropdownSegments').append($("<option></option>").val(value.SegmentId).html(value.SegmentName));

        });
       
    }
   
    $("#BtnCatAddUpdate").click(function () {

        ValidateCategories();
    });

    function ValidateCategories() {

        var formseg = $('#form_Category');
        var error1 = $('.alert-danger', formseg);
        var success1 = $('.alert-success', formseg);

        formseg.validate({
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

                categoryname: {
                    required: true
                },

                dropdownsegments: {
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
                $("#ModalCategoryForm").modal('hide');
                var categoryformdata = new FormData();
                categoryformdata.append('ID', $("#RecordCatID").val());
               
                categoryformdata.append('Segment', $("#DropdownSegments :selected" ).val());
                categoryformdata.append('CategoryName', $("#categoryname").val());
              categoryformdata.append('file', $('#catimage')[0].files[0]);
                
              $.ajax(
                        {

                            url: "CategoryHandler.ashx",
                            type: 'POST',
                            cache: false,
                            processData: false,
                            contentType: false,
                            data: categoryformdata,
                            complete: function () { },
                            progress: function (evt) { },
                            beforeSend: function (e) { },
                            success: OnAddCetegorySuccess,
                            error: function (e) { }
                        });

            }
        });


    }


    function OnAddCetegorySuccess(e)
    {
        
  
        $('#grdManageCategory').dataTable().fnDestroy();

        $('#grdManageCategory > tbody').append(e);
        GridCategory.init();
        $("#dialog-message-CategoryModel").modal("show");
        $(".msgsegmenttext").text("Successful");
    }



    $('#grdManageCategory').on('click', '.BtnEditCategory', function (e) {
      
        $(".file-preview").parent().addClass("file-input-new");
        $("#RecordCatID").val($(this).closest('tr').attr('id'));
       
        var trids = $(this).closest('tr').attr('id');
        $.ajax({
            url: "ManageWarrantyProducts.aspx/ViewCategoryRecord",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'"+ trids +"'}",
            async: false,
            success: OnGetCategorySuccess,

            error: function () {

                alert("failure");

            }

        }

  );

        function OnGetCategorySuccess(response)
        {
            

           
            
            $('#DropdownSegments').empty();
            var jsdata = JSON.parse(response.d);
            $.each(jsdata, function (key, value) {
                $(".select2-chosen").text(value.SegmentName);
                $('#DropdownSegments').append($("<option></option>").val(value.SegmentId).html(value.SegmentName));
                $('#categoryname').val(value.CategoryName);
                $('#categoryeditimage').attr('src',"WarrantyImages/"+ value.ImageUrl);

            });
            $("#categoryeditimage").css('display', "normal");
            $("#ModalCategoryForm").modal("show");
            $("#BtnCatAddUpdate").text("Edit");
            
           
        }
    });



    $("#catimage").click(function () {

        $("#categoryeditimage").css('display', "none");
    });


});
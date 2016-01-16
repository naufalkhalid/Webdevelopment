$(document).ready(function () {
  
    $("#image").click(function () {
        $("#filesrc").css('display', "none");
    });
    $(".editNews").click(function () {
        var recordid = $(this).attr("id");
        $("#hdnrecordId").val($(this).attr("id"));
        $(".file-caption-name").contents().filter(function () { return this.nodeType != 0; }).remove();
        $(".file-input").addClass(".file-input file-input-new");
        $("#hdnAddUpadateNews").val("1");
        $("#AddNews").modal("show");
            $.ajax({
            url: "News1.aspx/ViewEditRecord",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + recordid + "'}",
            dataType: "json",
            success: OnGetRecordSuccess,
            failure: function (response) {
                //alert(response.d);
            }

        });

    });
    $(".deleteNews").click(function () {
       
        $("#hdnrecordId").val($(this).attr("id"));
        $("#newsdelmessageModal").modal("show");
        
    });
    $("#btnnewsDelYes").click(function () {

        DeleteRecord($("#hdnrecordId").val());
       
    });
    function DeleteRecord(recordid)
    {
        var id = recordid;
        
        $.ajax({
            url: "News1.aspx/DeleteNews",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "'}",
            dataType: "json",
            success: OnDeleteSuccess,
            failure: function (response) {
                //alert(response.d);
            }

        });

    }
    function OnDeleteSuccess() {
        $("#dialog-success").modal("show");
        $("#modaltext").text("News has been deleted succesfully");
    }
    function OnGetRecordSuccess(response) {
        
        $("#newscategory").empty();
        var recorddata = JSON.parse(response.d);

        $.each(recorddata, function (key, value) {
            $('#newscategory').append($("<option></option>").val(value.categoryid).html(value.categoryname));
            $('#txtNewsHeader').val(value.heading);
            $("#txtNewsContent").val(value.contents);
            $("#filesrc").css('display', "normal");
            $("#filesrc").attr('src', value.image);
           
         
        });

    }
    
    $("#btnOpenAddNews").click(function () {
        clear();

        $("#hdnAddUpadateNews").val("0");
        $("#hdnrecordId").val("0");
        
        $("#AddNews").modal("show");
        
        AddCategory();
        
    });
    $("#btnAddNews").click(function () {
        
        ValidateNews();
       

    });
    function AddCategory() {
        
        $.ajax({
            url: "News1.aspx/ViewCategory",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            dataType: "json",
            success: OnNewsCategorySuccess,
            failure: function (response) {
                //alert(response.d);
            }

        });


    }
    function OnNewsCategorySuccess(response) {
        $("#newscategory").empty();
        $('#newscategory').append("<option value='0'>--Select--</option>");
        var recorddata = JSON.parse(response.d);
        
        $.each(recorddata, function (key, value) {
            $('#newscategory').append($("<option></option>").val(value.categoryid).html(value.categoryname));
        });
    }
    function ValidateNews() {

        var formnews = $('#form_NewsPost');
        var error1 = $('.alert-danger', formnews);
        var success1 = $('.alert-success', formnews);

        formnews.validate({
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

                txtNewsHeader: {
                    required: true
                },

                txtNewsContent: {
                    required: true
                },

                

               
            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
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
              
                $('#AddNews').modal('hide');
                
                var newsformData = new FormData();
                
                newsformData.append('ID', $("#hdnrecordId").val());
                    newsformData.append('Heading', $("#txtNewsHeader").val());
                    newsformData.append('Content', $("#txtNewsContent").val());
                    newsformData.append('Category', $("#newscategory :selected").val());
                
                    //formData.append('Reply', $("#txtReply").val());
                    //formData.append('WebLink', $("#txtWeblink").val());
                    //formData.append('Comments', $("#txtComments").val());
                    newsformData.append('file', $('#image')[0].files[0]);
                    //formData.append('file', $('#file-1')[0].files[1]);

                    $.ajax(
                          {

                              url: "NewsImages.ashx",
                              type: 'POST',
                              cache: false,
                              processData: false,
                              contentType: false,
                              data: newsformData,
                              complete: function () { },
                              progress: function (evt) { },
                              beforeSend: function (e) { },
                              success: OnAddNewsSuccess,
                              error: function (e) { }
                          });
                }
                
            
        });
        
    }
   
    function OnAddNewsSuccess(response) {
        if (response == 'Successful') {
            $("#dialog-success").modal("show");
            $("#modaltext").text("News has been added succesfully");
        }
        if (response == "Unsuccessful") {
            $("#dialog-success").modal("show");
            $("#modaltext").text("Something Wrong");
        }
    }
    $(".newsimage").click(function () {
        
        var id = $(this).attr("id");
       
        $("#dialog-newsimage").modal("show");
        $('#fullimage').attr('src', id)
    });
    $("#btnnewsOk").click(function () {

        document.location = "News1.aspx"
    });
    function clear()
    {
        $("#txtNewsHeader").val("");
        $("#txtNewsContent").val("");
        $("#filesrc").css('display', "none");
        
            $(".file-input").addClass(".file-input file-input-new");
            //.file-input file-input-new
            $(".file-caption-name").contents().filter(function () { return this.nodeType != 0; }).remove();
    }
});
$(document).ready(function () {
    $(".viewProductDetails").click(function () {
       
        var id = $(this).attr("id");
        
        $.ajax({
            url: "DeviceProfiles.aspx/ViewProductDetails",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "'}",
            dataType: "json",
            success: ViewProductDetailsSuccess,
            failure: function (response) {
                //alert(response.d);
            }

        });
    });

    function ViewProductDetailsSuccess(response) {
     
        var recorddata = JSON.parse(response.d);
        $.each(recorddata, function (key, value) {
            $("#lbl_productname").text(value.productName);
            $("#lbl_productid").text(value.productId);
         
            $("#lbl_brand").text(value.productBrand);
            $("#lbl_model").text(value.productModel);
            $("#lbl_serial").text(value.productSerial);
            $("#lbl_color").text(value.productColor);
            
            $("#lbl_details").text(value.productDetails);
            $("#productdetails").modal("show");
            
        });
        
        }

    


    $(".deleteDeviceprofile").click(function () {
        $("#dphdndpRecID").val($(this).attr("id"));
        $("#dpdelmessageModal").modal("show");

    });
    $("#btndpDelYes").click(function () {

        var delid = $("#dphdndpRecID").val();
        DeleteProduct(delid);



    });
    $("#btnOpenAddProducts").click(function () {
        
        $("#dphdndpAddUpd").val("Add");
        clear();
        $("#AddProducts").modal("show");
       
    });
    $("#select_segment").change(function () {

        var id = $("#select_segment :selected").val();
        GetCategory(id)
    });
    $("#btnAddProduct").click(function () {
       
        ValidateProducts();
       
    });
    $("#dpbtnOK").click(function ()
    {
        document.location = "DeviceProfiles.aspx";

    });
    $(".editDeviceprofile").click(function () {
        $("#dphdndpAddUpd").val("Update");
        $("#dphdndpRecID").val($(this).attr("id"));
       
        GetRecordData($(this).attr("id"));
       
       

    });
    function DeleteProduct(id)
    {
       
        $.ajax({
            url: "DeviceProfiles.aspx/DeleteProduct",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "'}",
            dataType: "json",
            success: DeleteProductSuccess,
            failure: function (response) {
                //alert(response.d);
            }

        });

    }
    function DeleteProductSuccess() {
        $("#dpsuccess").modal("show");
        $(".dpmsgtext").text("The record has been deleted successfully!");


    }
    function GetRecordData(id) {
        $.ajax({
            url: "DeviceProfiles.aspx/ViewEditRecord",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'"+ id +"'}",
            dataType: "json",
            success: ViewRecordSuccess,
            failure: function (response) {
                //alert(response.d);
            }

        });
        function ViewRecordSuccess(response)
        {
            $('span').closest('.form-group').removeClass('has-error');
            $('span').remove('.help-block');
            $('.alert-danger').hide();
            var recorddata = JSON.parse(response.d);
            $("#select_segment").empty();
            $("#select_category").empty();
            $.each(recorddata, function (key, value) {
                $('#select_segment').append($("<option></option>").val(value.segid).html(value.segname));

                $('#select_category').append($("<option></option>").val(value.categoryId).html(value.CatName));

                $("#txt_prodname").val(value.productName);
                $('#txt_prodbrand').val(value.productBrand);
                $('#txt_prodmodel').val(value.productModel);
                $("#txt_prodserial").val(value.productSerial);
                $("#txt_prodcolor").val(value.productColor);
                $('[id$=txt_dateofpurchase]').val(value.purchasedate);
                $("#txt_proddetails").val(value.productDetails);
                $("#txt_warrantyinfo").val(value.warrantyinfo);

                $("#AddProducts").modal("show");
            });

        }
    }
    function clear() {
        GetSegment();
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $("#select_category").empty();
        $("#txt_prodname").val("");
        $('#txt_prodbrand').val("");
        $('#txt_prodmodel').val("");
        $("#txt_prodserial").val("");
        $("#txt_prodcolor").val("");
        $('[id$=txt_dateofpurchase]').val("");
        $("#txt_proddetails").val("");
        $("#txt_warrantyinfo").val("");



    }
    function GetSegment() {
        $.ajax({
            url: "DeviceProfiles.aspx/GetSegment",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            dataType: "json",
            success: Onsegemntsuccess,
            failure: function (response) {
                //alert(response.d);
            }

        });
    }
    
    function GetCategory(id) {
        var segmentid = id;
        $.ajax({
            url: "DeviceProfiles.aspx/GetCategory",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'"+segmentid+"'}",
            dataType: "json",
            success: Oncategorysuccess,
             error : function (response) {
                //alert(response.d);
            }

        });
    }
    function ValidateProducts() {
      
        var formap= $('#form_AddProducts');
        var error1 = $('.alert-danger', formap);
        var success1 = $('.alert-success', formap);

        formap.validate({
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

                select_segment: {
                    required: true
                },

                select_category: {
                    required: true
                },

                txt_prodname: {
                    required: true
                },

                txt_prodbrand: {
                    required: true
                },
                txt_prodmodel: {
                    required: true

                },
                txt_prodserial: {
                    required: true
                },
                txt_dateofpurchase: {
                    required: true
                },
                txt_warrantyinfo: {
                    required: true
                },
                txt_proddetails:{
                    required: true
                },

                txt_prodcolor: {
                    required:true
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
                if ($("#dphdndpAddUpd").val() == "Add")
                {
                    AddProduct();
                }
                if($("#dphdndpAddUpd").val() == "Update")
                {
                    
                    UpdateProducts();
                }

                $("#AddProducts").modal("hide");


            }
        });
    }
    function UpdateProducts(id) {
        var id = $("#dphdndpRecID").val();
      
        var category = $("#select_category :selected").val();

        var productname = $("#txt_prodname").val();
        var brand = $('#txt_prodbrand').val();

        var model = $('#txt_prodmodel').val();
        var serial = $("#txt_prodserial").val();
        var color = $("#txt_prodcolor").val();
        var purchasedate = $('[id$=txt_dateofpurchase]').val();

        var details = $("#txt_proddetails").val();
        var warranty = $("#txt_warrantyinfo").val();

        $.ajax({
            url: "DeviceProfiles.aspx/UpdateProduct",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "','categoryid':'" + category + "','productname':'" + productname + "','brand':'" + brand + "','model':'" + model + "','serial':'" + serial + "','color':'" + color + "','purchasedate':'" + purchasedate + "','details':'" + details + "','warranty':'" + warranty + "'}",
            dataType: "json",
            async: false,
            success: Onupdatesuccess,
            failure: function (response) {

                //alert(response.d);
            }

        });

       
    }
    function Onupdatesuccess() {
        $("#dpsuccess").modal("show");
        $(".dpmsgtext").text("The record has been updated successfully!");


    }
    function Onsegemntsuccess(response) {
        $("#select_segment").empty();
        $('#select_segment').append("<option value='0'>--Select--</option>");

      var jsdata = JSON.parse(response.d);
      $.each(jsdata, function (key, value) {

          $('#select_segment').append($("<option></option>").val(value.segID).html(value.segmentName));

      });
      


    }
    function Oncategorysuccess(response) {
        $("#select_category").empty();
     
        var jsdata = JSON.parse(response.d);
        $.each(jsdata, function (key, value) {

            $('#select_category').append($("<option></option>").val(value.ID).html(value.categoryName));

        });


    }
    function AddProduct() {

        var category = $("#select_category :selected").val();

        var productname = $("#txt_prodname").val();
        var brand = $('#txt_prodbrand').val();
        
        var model = $('#txt_prodmodel').val();
        var serial = $("#txt_prodserial").val();
        var color = $("#txt_prodcolor").val();
        var purchasedate = $('[id$=txt_dateofpurchase]').val();

        var details = $("#txt_proddetails").val();
        var warranty = $("#txt_warrantyinfo").val();

        $.ajax({
            url: "DeviceProfiles.aspx/InsertProduct",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'categoryid':'" + category + "','productname':'" + productname + "','brand':'" + brand + "','model':'" + model + "','serial':'" + serial + "','color':'" + color + "','purchasedate':'" + purchasedate + "','details':'" + details + "','warranty':'" + warranty + "'}",
            dataType: "json",
            async: false,
            success: Onproductsuccess,
            failure: function (response) {

                //alert(response.d);
            }

        });
    }
        function Onproductsuccess()
        {
            $("#dpsuccess").modal("show");
            $(".dpmsgtext").text("The record has been inserted successfully!");


        }

    
});

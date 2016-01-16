

$(document).ready(function () {

    LoadDetails();

    function LoadDetails() {

        $.ajax({
            url: "FileClaim.aspx/LoadDetails",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnProfileDetails,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnProfileDetails(response) {
       
        var objProfile = JSON.parse(response.d);
        $.each(objProfile, function (key, value) {
            $("#txtFirstName").val(value.FirstName);
            $("#txtLastName").val(value.LastName);
            $("#txtphone").val(value.CellPhone);
        });

    }

    function ValidateClaimForm() {

        var formClaim = $('#form_ClaimForm');
        var error1 = $('.alert-danger', formClaim);
        var success1 = $('.alert-success', formClaim);

        formClaim.validate({
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

                txtFirstName: {
                    required: true
                },

                txtLastName: {
                    required: true
                },

                txtemail: {
                    required: true
                },

                txtphone: {
                    required: true
                },

                txtaddress: {
                    required: true
                },
                txtcity: {
                    required: true
                },

                txtzipcode: {
                    required: true
                },
                txtproduct: {
                    required: true
                },
                txtmanufacturer: {
                    required: true
                },
                txtorderno: {
                    required: true
                },
                txtpurchasedate: {
                    required: true
                },
                txtserialno: {
                    required: true
                },
                txtdescription: {
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
                
                var FileClaim = {
                    OrderNo: $('#txtorderno').val(),
                    SerialNo: $('#txtserialno').val(),
                    Status: 'Pending',
                    PurchasedDate: $('#txtpurchasedate').val(),
                    Description: $('#txtdescription').val()
                }
                
                $.ajax({
                    url: "FileClaim.aspx/SubmitFileClaim",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: "{Tbl_FileClaim:" + JSON.stringify(FileClaim) + "}",
                    data: {},
                    dataType: "json",
                    success: OnFileClaimSuccess,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });
            }
        });
    }

    function OnFileClaimSuccess(response) {
    }

    $("#btnSubmitClaim").click(function () {
        ValidateClaimForm();
    });
});
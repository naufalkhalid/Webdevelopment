$(document).ready(function () {


    callonready();
    function callonready() {

        $.ajax({
            url: "Profile.aspx/GetContactInfo",
            type: "POST",
            beforeSend: function (e) { $('#loadingmessage').show(); },
            contentType: "application/json; charset=utf-8",
            // data: '{"RecID":"' + RecID + '"}',
            dataType: "json",
            success: OnGetProfileInfoSuccess,
            complete: function (e) { $('#loadingmessage').hide(); },
            failure: function (response) {
                //alert(response.d);
            }
        });


    }
    function OnGetProfileInfoSuccess(response) {
        LoadProvinces();
        var objEditProfile = JSON.parse(response.d);

        //first tab
        if (!objEditProfile.Role) {

        }

        $('#txtFirstname').val(objEditProfile.FirstName);
        $('#txtLastname').val(objEditProfile.LastName);
        $('#txtMiddle').val(objEditProfile.MiddleNamae);

        //$('#txtHomePhoneNumber').val(objEditProfile.HomePhoneNumber);
        $('#txtWorkPhone').val(objEditProfile.WorkPhone);
        $('#txtCellPhone').val(objEditProfile.CellPhone);
        //$('#txtFax').val(objEditProfile.Fax);
        $('#txtEmail').val(objEditProfile.Email);

        $('#txtAddress').val(objEditProfile.Address);
        $('#txtPostalCode').val(objEditProfile.PostalCode);
        $('[id=txtProvince] option').filter(function () {
            return ($(this).val() == objEditProfile.Province);
        }).prop('selected', true);
        $('[id=preferredcontact] option').filter(function () {
            return ($(this).val() == objEditProfile.PreferredContact);
        }).prop('selected', true);
        $("#txtProvince").parent().find(".select2-chosen").text($("#txtProvince :selected").text());
        $("#preferredcontact").parent().find(".select2-chosen").text($("#preferredcontact :selected").text());
        $('#txtLoginname').val(objEditProfile.UserName);
        $("#txtCity").val(objEditProfile.City);
    }
    onMaskingLoad();
    $("#btnadminchangepassword").click(function () {

        ValidateFields();
    });

    function ValidateFields() {

        var formap = $('#form_Validate');
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

                txtnewpassword: {
                    required: true
                },

                txtoldpassword: {
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
                var oldpass = $('#txtoldpassword').val();
                var newpass = $('#txtnewpassword').val();
                if ($('#hfuserid').val() == "") {
                    $.guid = '00000000-0000-0000-0000-000000000000';
                    // + "','UserId':'" + $.guid
                }
                else {
                    $.guid = $('#hfuserid').val();
                }
                $.ajax({
                    url: "Profile.aspx/ChangePassword",
                    type: "POST",

                    beforeSend: function (e) { $('#loadingmessage').show(); },
                    contentType: "application/json; charset=utf-8",
                    data: "{'oldPassword':'" + oldpass + "','newPassword':'" + newpass + "'}",
                    dataType: "json",
                    async: false,
                    success: onchangepasswordsucess,
                    complete: function (e) { $('#loadingmessage').hide(); },
                    failure: function (response) {
                        //alert(response.d);
                    }

                });

            }
        });

    }
    $("#btnSaveContactInfo").click(function () {

        if ($("#txtHomePhoneNumber").val() == $("#txtHomePhoneNumber").attr("maskwatermark")) {
            $("#txtHomePhoneNumber").val("");

        }

        if ($("#txtPostalCode").val() == $("#txtPostalCode").attr("maskwatermark")) {
            $("#txtPostalCode").val("");

        }
        if ($("#txtWorkPhone").val() == $("#txtWorkPhone").attr("maskwatermark")) {
            $("#txtWorkPhone").val("");

        }
        if ($("#txtFax").val() == $("#txtFax").attr("maskwatermark")) {
            $("#txtFax").val("");

        }

        ValidateProfileForm();



    });
    function OnAddSuccess(response) {

        switch (response.d) {
            case "True":
                $(".msgtext").text("Saved Contact Information successfully.");
                $("#dialogok").modal('show');

                break;

            case "False":
                $(".msgtext").text("Something Wrong");
                $("#dialogok").modal('show');
                break;
        }
    }
    $("#changepassword").button().on("click", function () {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();

        $("#dialog-form").modal('show');

    });
    function onchangepasswordsucess(response) {
        switch (response.d) {
            case "Please Enter Correct Password":
                {
                    $("#dialog-form").modal('hide');
                    $(".msgtext").text(response.d);
                    $("#dialogok").modal('show');


                    break;
                }
            case "Password Has Been Successfully Changed":
                {

                    $("#dialog-form").modal('hide');
                    $(".msgtext").text(response.d);
                    $("#dialogok").modal('hide');

                    break;
                }
            default:

        }
    }



    function LoadProvinces() {
        $.ajax({
            url: "Profile.aspx/loadProvince",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (e) { $('#loadingmessage').show(); },
            data: "{ 'active': 'true' }",
            dataType: "json",
            success: onloadProvincesuccess,
            async: false,
            complete: function (e) { $('#loadingmessage').hide(); },
            failure: function (response) {
                //alert(response.d);
            }
        });
    }
    function onloadProvincesuccess(response) {
        $("#txtProvince").parent().find(".select2-chosen").text("----------Select----------");
        $("#txtProvince").append($("<option></option>").val("").html("----------Select----------"));
        var recorddata = JSON.parse(response.d);
        $.each(recorddata, function (key, value) {
            $('#txtProvince').append($("<option></option>").val(value.ProvinceId).html(value.ProvinceName + "    "));
        });
    }
    function ValidateProfileForm() {

        var formserrep = $('#formProfile');
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
                txtFirstname: {
                    required: true

                },
                txtLastname: {
                    required: true
                },

                txtAddress: {
                    required: true
                },

                txtCity: {
                    required: true
                },

                txtProvince: {
                    required: true
                },
                txtPostalCode: {
                    required: true
                },
                txtCellPhone:
                    {
                        required: true,
                        phoneUS: true
                    },
                txtEmail:
                    {
                        required: true,
                        email: true
                    },
                //txtHomePhoneNumber:
                //   {

                //       phoneUS: true
                //   },
                txtWorkPhone:
                   {

                       phoneUS: true
                   },
                //txtFax:
                //   {
                //       phoneUS: true
                //   },


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

                var txtFirstname = document.getElementById("txtFirstname").value;

                var txtLastname = document.getElementById("txtLastname").value;
                //var txtHomePhoneNumber = document.getElementById("txtHomePhoneNumber").value;
                var txtWorkPhone = document.getElementById("txtWorkPhone").value;
                var txtCellPhone = document.getElementById("txtCellPhone").value;
                //var txtFax = document.getElementById("txtFax").value;
                var txtEmail = document.getElementById("txtEmail").value;
                var txtAddress = document.getElementById("txtAddress").value;
                var txtPostalCode = document.getElementById("txtPostalCode").value;

                var txtProvince = $("#txtProvince :selected").val();
                var preferredcontact = $("#preferredcontact :selected").val();
                var txtCity = $("#txtCity").val();

                var ContactInfo = {
                    FirstName: txtFirstname,

                    LastName: txtLastname,
                    //HomePhoneNumber: txtHomePhoneNumber,
                    CellPhone: txtCellPhone,
                    WorkPhone: txtWorkPhone,
                    //Fax: txtFax,
                    Email: txtEmail,
                    Address: txtAddress,
                    PostalCode: txtPostalCode,
                    Province: txtProvince,
                    PreferredContact: preferredcontact,
                    City: txtCity

                };


                $.ajax({
                    url: "Profile.aspx/ContactInfo",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function (e) { $('#loadingmessage').show(); },
                    data: "{ 'ContactInfo':" + JSON.stringify(ContactInfo) + "," + "'Email':'" + txtEmail + "'}",
                    dataType: "json",
                    success: OnAddSuccess,
                    complete: function (e) { $('#loadingmessage').hide(); },
                    failure: function (response) {
                        //alert(response.d);
                    }
                });
                //dialog.dialog("close");

            }//end here submitt
        });
    }
});
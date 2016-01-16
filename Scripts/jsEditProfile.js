$(function () {
    $("#tabs").tabs();

    var area = document.getElementById("txtEmgrContactInfo");
    if (area != null) {
        var message = document.getElementById("charCount");
        var maxLength = 801;
        var checkLength = function () {
            if (area.value.length < maxLength) {
                message.innerHTML = "Characters Remaining: [" + (maxLength - area.value.length) + "]";
            }
        }
        setInterval(checkLength, 300);
    }
    //callonread();
});
function callonready() {
    $.ajax({
        url: "Profile.aspx/GetContactInfo",
        type: "POST",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        contentType: "application/json; charset=utf-8",
        // data: '{"RecID":"' + RecID + '"}',
        dataType: "json",
        success: OnGetProfileInfoSuccess,
        //  complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });
    $.ajax({
        url: "Profile.aspx/loadProfileNotifications",
        type: "POST",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        contentType: "application/json; charset=utf-8",
        // data: '{"RecID":"' + RecID + '"}',
        dataType: "json",
        success: OnloadProfileNotificationsSuccess,
        // complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });
    $.ajax({
        url: "Profile.aspx/getUsers",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        //data: "{ 'Vehicle':" + JSON.stringify(Vehicle) + "}",
        dataType: "json",
        success: ongetusersucess,
        //complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });
   
    $.ajax({
        url: "Profile.aspx/loadVehicle",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        data: "{ 'active': 'true' }",
        dataType: "json",
        success: onloadVehiclesucess,
        complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });
}
function LoadProvinces()
{
    $.ajax({
        url: "Profile.aspx/loadProvince",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        data: "{ 'active': 'true' }",
        dataType: "json",
        success: onloadProvincesuccess,
        async:false,
        complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });
}
function onloadProvincesuccess(response) {

    var recorddata = JSON.parse(response.d);

    $.each(recorddata, function (key, value) {
        $('#txtProvince').append($("<option></option>").val(value.ProvinceId).html(value.ProvinceName+"    "));
    });
}
function onloadVehiclesucess(response) {
    $('#rptVehicles').html(response.d);
    TableEditableVehicle.init();
}
function OnloadProfileNotificationsSuccess(response) {
    var obj = JSON.parse(response.d);
    if (obj != null) {
        if (obj.BuildingRequests) {
            $('#rbbuildingrequestyes').parent().attr('class', 'checked');
            $('#rbbuildingrequestno').parent().removeClass('checked');
        } else {
            $('#rbbuildingrequestno').parent().attr('class', 'checked');
            $('#rbbuildingrequestyes').parent().removeClass('checked');
        } if (obj.NewSurveyQuestion) {
            $('#rbnewservayquestionyes').parent().attr('class', 'checked');
            $('#rbnewservayquestionno').parent().removeClass('checked');
        } else {
            $('#rbnewservayquestionno').parent().attr('class', 'checked');
            $('#rbnewservayquestionyes').parent().removeClass('checked');
        } if (obj.OpenMaintenanceRequest) {
            $('#rbopenmaintanancerequestyes').parent().attr('class', 'checked');
            $('#rbopenmaintanancerequestno').parent().removeClass('checked');
        } else {
            $('#rbopenmaintanancerequestno').parent().attr('class', 'checked');
            $('#rbopenmaintanancerequestyes').parent().removeClass('checked');
        } if (obj.PackageDeliveryConfirmation) {
            $('#rbpackagedeliveryconfirmationyes').parent().attr('class', 'checked');
            $('#rbpackagedeliveryconfirmationno').parent().removeClass('checked');
        } else {
            $('#rbpackagedeliveryconfirmationno').parent().attr('class', 'checked');
            $('#rbpackagedeliveryconfirmationyes').parent().removeClass('checked');
        } if (obj.ResidentPostingsArea) {
            $('#rbresidentpostingareayes').parent().attr('class', 'checked');
            $('#rbresidentpostingareano').parent().removeClass('checked');
        } else {
            $('#rbresidentpostingareano').parent().attr('class', 'checked');
            $('#rbresidentpostingareayes').parent().removeClass('checked');
        } if (obj.SMSTextMessage) {
            $('#chkbxSMS').parent().attr('class', 'checked');
            //else
            //    $('#chkbxSMS').parent().attr('class', 'checked');
        } if (obj.TextMessage) {
            $('#rbtextmessageyes').parent().attr('class', 'checked');
            $('#rbtextmessageno').parent().removeClass('checked');
        } else {
            $('#rbtextmessageno').parent().attr('class', 'checked');
            $('#rbtextmessageyes').parent().removeClass('checked');
        } if (obj.Email) {
            $('#chkbxEmail').parent().attr('class', 'checked');
            //else
            //    $('#chkbxEmail').parent().attr('class', 'checked');
        }
    }
}

//reday ends here
$("#btnSaveNotificationPreferences").button().on("click", function () {
    var openmaintanancerequest = false;
    var residentpostingarea = false;
    var newservayquestion = false;
    var packagedeliveryconfirmation = false;
    var Email = false;
    var SMS = false;
    var textmessage = false;
    var buildingrequest = false;
    // $.guid = "";
    if ($('#hfuserid').val() == "") {
        $.guid = '00000000-0000-0000-0000-000000000000';
    }
    else {
        $.guid = $('#hfuserid').val();
    }
    if ($('#rbopenmaintanancerequestyes').parent().attr('class') == "checked")
        openmaintanancerequest = true;
    if ($('#rbresidentpostingareayes').parent().attr('class') == "checked")
        residentpostingarea = true;
    if ($('#rbnewservayquestionyes').parent().attr('class') == "checked")
        newservayquestion = true;
    if ($('#rbpackagedeliveryconfirmationyes').parent().attr('class') == "checked")
        packagedeliveryconfirmation = true;
    if ($('#chkbxEmail').parent().attr('class') == "checked")
        Email = true;
    if ($('#chkbxSMS').parent().attr('class') == "checked")
        SMS = true;
    if ($('#rbbuildingrequestyes').parent().attr('class') == "checked")
        buildingrequest = true;
    if ($('#rbtextmessageyes').parent().attr('class') == "checked")
        textmessage = true;

    var publicnotification = {
        OpenMaintenanceRequest: openmaintanancerequest,
        ResidentPostingsArea: residentpostingarea,
        NewSurveyQuestion: newservayquestion,
        PackageDeliveryConfirmation: packagedeliveryconfirmation,
        Email: Email,
        SMSTextMessage: SMS,
        TextMessage: textmessage,
        BuildingRequests: buildingrequest,
        UserId: $.guid
    }
    $.ajax({
        url: "Profile.aspx/UpdateProfileNotifications",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        data: "{publicnotification:" + JSON.stringify(publicnotification) + "}",
        dataType: "json",
        //success: OnAddUpdateEmergencyContactInfoSuccess,
        complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });

});
$("#changepassword").click(function () {
    $('span').closest('.form-group').removeClass('has-error');
    $('span').remove('.help-block');
    $('.alert-danger').hide();
    $("#dialogpassform").modal('show');

});
$("#btnchangepassword").click(function () {
   

    ValidateFields();
});
$('#btnSaveEmergencyContactInfo').button().on('click', function () {
    var txtEmgrContactInfo = $('#txtEmgrContactInfo').val();
    $.ajax({
        url: "Profile.aspx/AddUpdateEmergencyContactInfo",
        type: "POST",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        contentType: "application/json; charset=utf-8",
        data: '{"EmgrContactInfo":"' + txtEmgrContactInfo + '"}',
        dataType: "json",
        success: OnAddUpdateEmergencyContactInfoSuccess,
        complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });
});
function onchangepasswordsucess(response) {
    switch (response.d) {
        case "Please Enter Correct Password":
            {
                alert(response.d);
                break;
            }
        case "Password Has Been Successfully Changed":
            {
                alert(response.d);
                $("#dialogpassform").modal('hide');
                break;
            }
        default:

    }
   

}
function SaveLoginInfo() {

    //var txtLoginname = document.getElementById("txtLoginname").value;
    //var txtPassword = document.getElementById("txtPassword").value;
    //var txtNewPassword = document.getElementById("txtNewPassword").value;
    //var txtUsertype = document.getElementById("txtUsertype").value;
    //var txtUnit = document.getElementById("txtHomePhoneNumber").value;
    var txtIntroNewUsers = document.getElementById("txtIntroNewUsers").value;

    $.ajax({
        url: "Profile.aspx/LoginInfo",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        data: "{'IntroNewUsers':'" + txtIntroNewUsers + "'}",
        dataType: "json",
        success: OnLoginSuccess,
        complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });
    //dialog.dialog("close");
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

    $('[id=preferredcontact] option').filter(function () {
        return ($(this).val() == objEditProfile.PreferredContact);
    }).prop('selected', true);

    $('[id=txtProvince] option').filter(function () {
        return ($(this).val() == objEditProfile.Province);
    }).prop('selected', true);

    $("#preferredcontact").parent().find(".select2-chosen").text($("#preferredcontact :selected").text());
    $("#txtProvince").parent().find(".select2-chosen").text($("#txtProvince :selected").text());
    $("#txtCity").val(objEditProfile.City);
    //Second tab
    $('#txtLoginname').val(objEditProfile.UserName);
    $('#txtUsertype').text(objEditProfile.UserType);
    $('#txtUnit').text(objEditProfile.Unit);
    $('#txtEmgrContactInfo').text(objEditProfile.EmergencyContactInformation);


    //Is Profile Active
    $('#activeInacvtive').val(objEditProfile.IsPublicProfileActive)
    if ($('#activeInacvtive').val() == "false") {
        $('#btnactivate').text('Activate My Public Profile')
        $('#btnactivate').removeClass('btn red');
        $('#btnactivate').addClass('btn green');
        $('#lowermsg').html("Your Public Profile is inactive and its are NOT visible to ANY other residents including your Friends in the building");
        $('#lowermsg').parent().removeClass('note note-success');
        $('#lowermsg').parent().addClass('note note-danger');


        //upper msg
        $('#upperMsg').html("<b>My Public Profile is Inactive</b>");
        $('#upperMsg').parent().removeClass('note note-success');
        $('#upperMsg').parent().addClass('note note-danger');


    }
    if ($('#activeInacvtive').val() == "true") {
        $('#btnactivate').text('Diactivate My Public Profile')
        $('#btnactivate').removeClass('btn green');
        $('#btnactivate').addClass('btn red');
        $('#lowermsg').html("The Inforamtion you've entered into your Public Profile below will be visible to other residents.");
        $('#lowermsg').parent().removeClass('note note-danger');
        $('#lowermsg').parent().addClass('note note-success');
        $('#lowermsg').removeAttr('style');
        $('#lowermsg').attr('style', 'display:block');

        //upper msg
        $('#upperMsg').html("<b>Your Public Profile is Active</b><br />");
        $('#upperMsg').parent().removeClass('note note-danger');
        $('#upperMsg').parent().addClass('note note-success');



    }
    onMaskingLoad();
}
$("#btnSaveContactInfo").click(function () {

    if ($("#txtHomePhoneNumber").val() == $("#txtHomePhoneNumber").attr("maskwatermark")) {
        $("#txtHomePhoneNumber").val("");

    }

    if ($("#txtCellPhone").val() == $("#txtCellPhone").attr("maskwatermark")) {
        $("#txtCellPhone").val("");

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
                async:false,
                success: onchangepasswordsucess,
                complete: function (e) { $('#loadingmessage').hide(); },
                failure: function (response) {
                    //alert(response.d);
                }

            });


        }
    });
}


function SaveContactInfo() {

   

   
}

function OnAddSuccess(response) {

    switch (response.d) {
        case "True":
            $(".msgtext").text("Saved Contact Information Successfully.");
            $("#dialogok").modal("show");
           
            
            onMaskingLoad();
            break;

        case "False":
            $(".msgtext").text("Failure");
            $("#dialogok").modal("show");
           
            break;
    }
}
function OnLoginSuccess(response) {

    switch (response.d) {
        case "True":
            alert('Save Login Information successfully.');
            //document.location = "RepairRequest.aspx";
            break;

        case "False":
            alert('Save Login Information unsuccessfully.');
            break;
    }
}
function OnAddUpdateEmergencyContactInfoSuccess(response) {

    if (response.d == 'False') {
        $("#EmgrContactInfo").text("Emergency Contact Information Not Updated.");
        $('#dialog-EmgrContactInfo').modal('show');
    }
    else {
        $("#EmgrContactInfo").text("Emergency Contact Information Updated successfully.");
        $('#dialog-EmgrContactInfo').modal('show');
    }

}

//Naufal js...........................................................................................................
$(".Viewuserprofile").click(function () {
    var id = $(this).attr("id");

});

$('#btnactivate').button().on('click', function () {
    //var MsgSucess = "";
    //var MsgFailure = "";
    //if ($('#btnactivate').text() == 'Diactivate My Public Profile') {
    //    $('#btnactivate').text('Activate My Public Profile')
    //    $('#btnactivate').removeClass('btn red');
    //    $('#btnactivate').addClass('btn green');
    //    $('#lowermsg').html("Your Public Profile is inactive and its are NOT visible to ANY other residents including your Friends in the building");
    //    $('#lowermsg').parent().removeClass('note note-success');
    //    $('#lowermsg').parent().addClass('note note-danger');


    //    //upper msg
    //    $('#upperMsg').html("<b>My Public Profile is Inactive</b>");
    //    $('#upperMsg').parent().removeClass('note note-success');
    //    $('#upperMsg').parent().addClass('note note-danger');
    //    MsgFailure = "Profile Diactivate Successfully..."
    //    MsgSucess = "Profile Not Successfully Diactivate..."
    //}
    //else {
    //    $('#btnactivate').text('Diactivate My Public Profile')
    //    $('#btnactivate').removeClass('btn green');
    //    $('#btnactivate').addClass('btn red');
    //    $('#lowermsg').html("The Inforamtion you've entered into your Public Profile below will be visible to other residents.");
    //    $('#lowermsg').parent().removeClass('note note-danger');
    //    $('#lowermsg').parent().addClass('note note-success');
    //    $('#lowermsg').removeAttr('style');
    //    $('#lowermsg').attr('style', 'display:block');
    //    MsgFailure = "Profile Activate Successfully..."
    //    MsgSucess = "Profile Not Successfully Activate..."
    //    //upper msg
    //    $('#upperMsg').html("<b>Your Public Profile is Active</b><br />");
    //    $('#upperMsg').parent().removeClass('note note-danger');
    //    $('#upperMsg').parent().addClass('note note-success');
    //}
    $.ajax({
        url: "Profile.aspx/ActivateDeactivatePublicProfile",
        type: "POST",
        beforeSend: function (e) { $('#loadingmessage').show(); },
        contentType: "application/json; charset=utf-8",
        //data: "{}",
        dataType: "json",
        success: OnPublicProfileActivate,
        complete: function (e) { $('#loadingmessage').hide(); },
        failure: function (response) {
            //alert(response.d);
        }
    });

    function OnPublicProfileActivate(response) {
        var MsgSucess = "";
        var MsgFailure = "";
        if (response.d) {
            if ($('#btnactivate').text() == 'Diactivate My Public Profile') {
                $('#btnactivate').text('Activate My Public Profile')
                $('#btnactivate').removeClass('btn red');
                $('#btnactivate').addClass('btn green');
                $('#lowermsg').html("Your Public Profile is inactive and its are NOT visible to ANY other residents including your Friends in the building");
                $('#lowermsg').parent().removeClass('note note-success');
                $('#lowermsg').parent().addClass('note note-danger');


                //upper msg
                $('#upperMsg').html("<b>My Public Profile is Inactive</b>");
                $('#upperMsg').parent().removeClass('note note-success');
                $('#upperMsg').parent().addClass('note note-danger');
                MsgFailure = "Profile Diactivate Successfully..."
                MsgSucess = "Profile Not Successfully Diactivate..."
            }
            else {
                $('#btnactivate').text('Diactivate My Public Profile')
                $('#btnactivate').removeClass('btn green');
                $('#btnactivate').addClass('btn red');
                $('#lowermsg').html("The Inforamtion you've entered into your Public Profile below will be visible to other residents.");
                $('#lowermsg').parent().removeClass('note note-danger');
                $('#lowermsg').parent().addClass('note note-success');
                $('#lowermsg').removeAttr('style');
                $('#lowermsg').attr('style', 'display:block');
                MsgFailure = "Profile Not Successfully Activate..."
                MsgSucess = "Profile Activate Successfully..."
                //upper msg
                $('#upperMsg').html("<b>Your Public Profile is Active</b><br />");
                $('#upperMsg').parent().removeClass('note note-danger');
                $('#upperMsg').parent().addClass('note note-success');
            }
            $("#EmgrContactInfo").text(MsgSucess);
            $('#dialog-EmgrContactInfo').modal('show');
        }
        else {
            $("#EmgrContactInfo").text(MsgFailure);
            $('#dialog-EmgrContactInfo').modal('show');
        }


    }

});

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
                    email:true
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MainProfile........................................................................................................





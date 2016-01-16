
$(document).ready(function () 
{
   
    $.ajax({
        url: "Communicate.aspx/GetContactsList",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: ContactsList,
        failure: function (response) {
            //alert(response.d);
        }
    });

   

    function SubmitValidatedForm() {


        var formComm = $('#form_communication');
        var error1 = $('.alert-danger', formComm);
        var success1 = $('.alert-success', formComm);
        formComm.validate({
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
                txtEmailSubject: {
                    required: true
                },
                txtEmailMsg: {
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
                var objEmailCommunicate = {
                    To: $("#lblEmailAdmin").val(),
                    From: $("#lblRecep").val(),
                    Recepient: $("#lblEmailRecep").val(),
                    Subject: $("#txtEmailSubject").val(),
                    Message: $("#txtEmailMsg").val()
                }

                $.ajax({
                    url: "Communicate.aspx/SendMessage",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: "{'objEmailCommunicate':" + JSON.stringify(objEmailCommunicate) + "}",
                    dataType: "json",
                    success: OnCommunicationSuccess,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });
            }
        });

    }

    function OnCommunicationSuccess(response) {
        $('#dialog-Communicate-form').modal('hide');
        $(".msgtext").text(response.d)
        $('#dialog-communicate-Model').modal('show');
    }

    function ContactsList(response) {
        
        $('#divContacts').append(response.d);
    }

    
    $("#btnMsgAdmin").click(function () {

        ClearFields();
        
        $('#lblEmailAdmin').val($('#ContentPlaceHolder1_hdnAdminEmail').val());
        $('#lblRecep').val($('#ContentPlaceHolder1_FromName').val());
        $('#lblEmailRecep').val($('#ContentPlaceHolder1_FromEmail').val());

        $('#modal-head-comm').text("Send Message To Administrator");
        $('#dialog-Communicate-form').modal('show');
        
    });

    $("#btnMsgSecurity").click(function () {
        ClearFields();
        $('#lblEmailAdmin').val($('#ContentPlaceHolder1_hdnAdminEmail').val());
        $('#lblRecep').val($('#ContentPlaceHolder1_FromName').val());
        $('#lblEmailRecep').val($('#ContentPlaceHolder1_FromEmail').val());

        $('#modal-head-comm').text("Send Message To Security User");
        $('#dialog-Communicate-form').modal('show');

    });

    $("#btnSendMessage").click(function () {
        SubmitValidatedForm();
    });

  

    $("#hrefMessages").click(function () {

        $.ajax({
            url: "Communicate.aspx/SentMessages",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: SentMessages,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function SentMessages(response) {
        $('#divSentMsg').empty();
        $('#divSentMsg').append(response.d);
        $('#divMessages').modal('show');
    }

    function ClearFields() {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $("#txtEmailSubject").val("");
        $("#txtEmailMsg").val("");
    }
});
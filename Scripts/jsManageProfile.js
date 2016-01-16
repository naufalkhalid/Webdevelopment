/// <reference path="../../assets/global/plugins/bootstrap-switch/js/bootstrap-switch.js" />



var GridUsers = function () {
    var GridUsersTable = function () {
        var table = $('#grdUsers');
        var oTable = table.dataTable({
            "lengthMenu": [
                [5,10, 15, 20, -1],
                [5,10, 15, 20, "All"] // change per page values here
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
                [0, "desc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#grdUsers_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridUsersTable();
        }

    };

}();
$(document).ready(function () {
    //url: "~/ManageProfile.aspx/LoadStatus",
    
    GetStatus();
    function GetStatus() {
        var requestedurl = " ";
        if (window.location.href.indexOf("homelifefrontier") > -1) {
            var requestedurl = "../../ManageProfiles.aspx";
        }
        else {
            var requestedurl = "../ManageProfiles.aspx";
        }
        $.ajax({
            url: requestedurl+"/LoadStatus",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            dataType: "json",
            async: false,
            success: OnLoadStatus,
            error: function () {

                alert("error");
            }

        });
    }
    function OnLoadStatus(response) {
        var rtrnresponse = JSON.parse(response.d);


        $.each(rtrnresponse, function (key, value) {


            $("#" + value.UserName).find("#" + value.Id).bootstrapSwitch('state', value.Status);



        });
    }
    GridUsers.init();
    $("#btnAddUser").click(function () {
        loadroles();
        clear();
        $("#dialogProfileInfo").modal("show");
        onMaskingLoad();

    });

    function loadroles() {
        var requestedurl = " ";
        if (window.location.href.indexOf("homelifefrontier") > -1) {
            var requestedurl = "../../ManageProfiles.aspx";
           
        }
        else {
            var requestedurl = "../ManageProfiles.aspx";
        }
        $.ajax({
            url: requestedurl + "/LoadRoles",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            dataType: "json",
            async:false,
            success: OnLoadRoles,
            failure: function (response) {
                //alert(response.d);
            }

        });
    }
    function OnLoadRoles(response) {

        $("#role").empty();
        $("#userrole").empty();
        $("#role").parent().find(".select2-chosen").text("Basic User");
        $("#userrole").parent().find(".select2-chosen").text("Basic User");
        var recorddata = JSON.parse(response.d);
        $.each(recorddata, function (key, value) {
            $("#role").append($("<option></option>").val(value.roleid).html(value.rolename));
            $("#userrole").append($("<option></option>").val(value.roleid).html(value.rolename));
        });
    }
    function clear() {

        $("input[type=text]").val("");
        $("input[type=password]").val("");
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();

        
        $("textarea").val("");
        $("select").val("");
        $("#username").closest(".form-group").removeClass("has-error");
        $("#userinvalid").css("display", 'none');
        $("#username").closest(".form-group").removeClass("has-success");
        $("#uservalid").css("display", 'none');
        $("#phone").closest(".form-group").removeClass("has-error");
        $("#phonelengthinvalid").css("display", 'none');
        $("#phone").closest(".form-group").removeClass("has-success");
        $("#phonelengthvalid").css("display", 'none');
        $("#btnadd").removeAttr("disabled");
        $("#passwordnotmatch").css("display", "none");
    }

    $("#btnadd").click(function () {





        ValidateUserInfo();

    });
    $('#grdUsers').on('click', '.changerole', function (e) {
       $("#usersname").val($(this).closest("tr").attr("id"));
        $("#recId").val($(this).attr("id"));
        $("#previousrole").val($(this).closest("tr").find("[id*='Label4']").text());

        loadroles();
        if ($(this).closest("tr").find("[id*='Label4']").text() == "Basic User") {
            $('[id=userrole] option').filter(function () {
                return ($(this).text() == "Basic User");
            }).prop('selected', true);
            $("#userrole").parent().find(".select2-chosen").text("Basic User");
        }
        else {

            $('[id=userrole] option').filter(function () {
                return ($(this).text() == "Admin");
            }).prop('selected', true);
            $("#userrole").parent().find(".select2-chosen").text("Admin");
        }
        $("#ChangeRole").modal("show");


    });
    $("#btnchangerole").click(function () {
        
        var recordid = ($("#recId").val());
        var username = $("#usersname").val();
        var role = $("#userrole :selected").text();
        var previousrole = $("#previousrole").val();
        var requestedurl = " ";
        if (window.location.href.indexOf("homelifefrontier") > -1) {
            var requestedurl = "../../ManageProfiles.aspx";

        }
        else {
            var requestedurl = "../ManageProfiles.aspx";
        }

        $.ajax({
            url: requestedurl + "/ChangeRole",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'previousrole':'" + previousrole + "','username':'" + username + "','recordid':'" + recordid + "','role':'" + role + "'}",
            dataType: "json",
            async: false,
            success: onchangerole,
            error: function (response) {

                //alert(response.d);
            }

        });

    });

    function onchangerole(response) {
        $("#ChangeRole").modal("hide");

        $("#msg_txt1").text(response.d);
        $("#success1").modal("show");
        
    }
    $("#changeroleOK").click(function () {

        window.location.reload();
    });
    
    $('.make-switch').on('switchChange.bootstrapSwitch', function (event, state) {
     
        if ($(this).bootstrapSwitch('state') == false) {
            $("#hdnstate").val("false");
           

        }
        else {

            $("#hdnstate").val("true");
        }
        $('body').loader('show', { overlay: true });
        $("#recId").val($(this).closest("tr").attr("id"));
        var state = $("#hdnstate").val();
        var trid = $(this).closest("tr").attr("id");
        

        var requestedurl = " ";
        if (window.location.href.indexOf("homelifefrontier") > -1) {
            var requestedurl = "../../ManageProfiles.aspx";

        }
        else {
            var requestedurl = "../ManageProfiles.aspx";
        }
        
        $.ajax({
            url: requestedurl + "/ActiveInactiveUser",
           
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + trid + "','state':'" + state + "'}",
            dataType: "json",
            async: true,
            success: OnActiveInactiveUser,
            error: function () {

                alert("error");
            }

        });



    });
    function OnActiveInactiveUser(response) {

        $(".msgtext").text("Success");
        $("#dialogok").modal('show');
        $('body').loader('hide');
        var lblstatus = $("#" + $("#recId").val()).find("#lblStatus").text();
        if (lblstatus == "Active") {

            $("#" + $("#recId").val()).find("#lblStatus").text("In Active");
        }
        else {

            $("#" + $("#recId").val()).find("#lblStatus").text("Active");
        }
        
    }
    function ValidateUserInfo() {

        var formap = $('#formProfile');
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

                firstname: {
                    required: true
                },
                role: {
                    required: true
                },

                lastname: {
                    required: true
                },

                email: {
                    required: true,
                    email: true
                },

                phone: {
                    phoneUS: true,
                    
                    minlength: 13, maxlength: 13,
                    required: true
                },

                username: {
                    required: true
                },
                password: {
                    required: true
                },
                cnfrmpassword: {
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

                var role = $("#role :selected").text();



                var firstname = $("#firstname").val();
                var lastname = $('#lastname').val();

                var email = $('#email').val();
                var phone = $("#phone").val();

                var username = $('#username').val();
                var password = $('#password').val();
                
                var confirmpassword = $("#cnfrmpassword").val();
                if (password != confirmpassword) {
                    $("#passwordnotmatch").css("display", "normal");
                    return false;
                }
                else {
                    $("#passwordnotmatch").css("display", "none");
                    var requestedurl = " ";
                    if (window.location.href.indexOf("homelifefrontier") > -1) {
                        var requestedurl = "../../ManageProfiles.aspx";
                    }
                    else {
                        var requestedurl = "../ManageProfiles.aspx";
                    }
                    $.ajax({
                        url: requestedurl+"/CreateUser",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: "{'role':'" + role + "','firstname':'" + firstname + "','lastname':'" + lastname + "','email':'" + email + "','phone':'" + phone + "','username':'" + username + "','password':'" + password + "'}",
                        dataType: "json",
                        async: false,
                        success: OnCreateSuccess,
                        error: function (response) {

                            //alert(response.d);
                        }

                    });
                }

            }
        });



    }
    function OnCreateSuccess(response) {
        //alert(response.d);
        $("#dialogProfileInfo").modal("hide");
        $(".msgtext").text("User is Created Successfully");
        $("#dialogok").modal('show');
        location.reload();
    }
    
    $("#username").focusin(function () {
        $("#username").closest(".form-group").removeClass("has-error");
        $("#userinvalid").css("display", 'none');
        $("#username").closest(".form-group").removeClass("has-success");
        $("#uservalid").css("display", 'none');
    });

    $("#username").focusout(function () {
        var username = $('#username').val();
        var requestedurl = " ";
        if (window.location.href.indexOf("homelifefrontier") > -1) {
            var requestedurl = "../../ManageProfiles.aspx";
        }
        else {
            var requestedurl = "../ManageProfiles.aspx";
        }
        $.ajax({
            url: requestedurl+"/CheckUser",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'username':'" + username + "'}",
            dataType: "json",
            async: false,
            success: OnUserExist,
            error: function () {

                alert("error");
            }

        });

    });


    function OnUserExist(response) {
        if (response.d == "memberexists") {
            $("#username").closest(".form-group").addClass("has-error");
            $("#userinvalid").css("display", 'normal');
            $("#username").closest(".form-group").removeClass("has-success");
            $("#uservalid").css("display", 'none');
            $("#btnadd").attr("disabled", 'true');
            return false;
        }
        if (response.d == "memberdoesnotexists") {
            $("#username").closest(".form-group").addClass("has-success");
            $("#uservalid").css("display", 'normal');
            $("#username").closest(".form-group").removeClass("has-error");
            $("#userinvalid").css("display", 'none');
            $("#btnadd").removeAttr("disabled");
        }
    }
});
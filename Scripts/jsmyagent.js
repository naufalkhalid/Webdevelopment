

/// <reference path="bootstrap-formhelpers.js" />

var GridAssignAgent = function () {

    var GridAssignAgentTable = function () {

        var table = $('#grdUserAgents');

        var oTable = table.dataTable({
            "lengthMenu": [
                [5, 10, 15, -1],
                [5, 10, 15, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 2,

            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "columnDefs": [{ // set default column settings
                'orderable': false,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "desc"]
            ] // set first column as a default sort by asc

        });

        var tableWrapper = $("#grdUserAgents_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridAssignAgentTable();
        }

    };

}();

var GridMyAgent = function () {

    var GridMyAgentTable = function () {

        var table = $('#grdMyAgent');

        var oTable = table.dataTable({
            "lengthMenu": [
                [5, 10, 20, 30, -1],
                [5, 10, 20, 30, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 5,

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
            "saveState": true,
            "order": []// set first column as a default sort by asc
            
        });

        var tableWrapper = $("#grdMyAgent_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridMyAgentTable();
        }

    };

}();


$(document).ready(function () {
   
    var AgentID = getParameterByName('ID');

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    $("#SelState").change(function () {
        $("#txtZipCode").val("");
        $("#txtZipCode").focus();
    });

    $("#countries_states1").change(function () {
        if ($("#countries_states1").val() == "CA") {
            $("#txtZipCode").attr("masktype", "postalcode");
        }
        else {
            $("#txtZipCode").attr("masktype", "zipcodeUS");
           
        }
        onMaskingLoad();
    });

    if(AgentID != "")
    {
        var ID = AgentID;
        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            $.ajax({
                url: "MyAgents.aspx/LoadAgentByID",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"ID":"' + ID + '"}',
                dataType: "json",
                success: OnLoadAgentByID,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }, 2000);
    }


    function OnLoadAgentByID(response) {
        
        var objMyAgent = JSON.parse(response.d);
        $.each(objMyAgent, function (key, value) {
            
            $('#txtFirstName').val(value.FirstName);
            $('#txtLastName').val(value.LastName);
            $('#txtAddress1').val(value.Address1);
            $('#txtAddress2').val(value.Address2);
            $('.bfh-countries').val(value.Country);
            var country = value.Country;
            $('#SelState').empty();
            $('#SelState').append('<option value="">-------------------------------------Select-------------------------------------</option>');
            for (state in BFHStatesList[country]) {
                if (BFHStatesList[country].hasOwnProperty(state)) {
                    $('#SelState').append('<option value="' + BFHStatesList[country][state].code + '">' + BFHStatesList[country][state].name + '</option>');
                }
            }
            $('#SelState').val(value.State);
            $('#txtCity').val(value.City);
            $('#txtZipCode').val(value.Zip);
            $('#txtContact').val(value.Contact);
            $('#txtEmail').val(value.Email);
        });
        $('body').loader('hide');
    }
    GridMyAgent.init();

    function LoadAgents() {
        
        $.ajax({
            url: "MyAgents.aspx/LoadAgents",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"userrole":"' + $('#hdnRole').val() + '"}',
            dataType: "json",
            success: OnLoadAgentSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnLoadAgentSuccess(response) {

        var objMyAgent = JSON.parse(response.d);
        $('#SelAgent').empty();
        if ($('#hdnRole').val() != "Basic User")
            $('#SelAgent').append("<option value=''>-------------------------------------Select-------------------------------------</option>");
        $.each(objMyAgent, function (key, value) {
            $('#SelAgent').append($("<option></option>").val(value.userid).html(value.AgentName));
        });
    
    }

    function LoadCustomerInfo() {

        $.ajax({
            url: "MyAgents.aspx/LoadCustomerInfo",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnLoadCustomers,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnLoadCustomers(response) {
        var objMyAgent = JSON.parse(response.d);
        $.each(objMyAgent, function (key, value) {
            

            $('#txtName').val(value.CustName);
            $('#txtAddress').val(value.CustAddress);
            $('#txtEmail').val(value.CustEmail);
            $('#txtContact').val(value.CustContact);

        });
        $('#dialogmyagentcontact').modal('show');
        $('body').loader('hide');
    }

    function ValidateAddAgentForm() {
        var FormAddAgent = $('#FormAddAgent');
        var error1 = $('.alert-danger', FormAddAgent);
        var success1 = $('.alert-success', FormAddAgent);

        FormAddAgent.validate({
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

                txtAddress1: {
                    required: true
                },

                  SelCountry: {
                    required: true
                },

                SelState: {
                    required: true
                },
                txtCity: {
                    required: true
                },
                txtZipCode: {
                    required: true
                },
                txtContact: {
                    required: true,
                    phoneUS: true
                },

                txtEmail: {
                    required: true,
                    email: true
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
                var ID = getParameterByName('ID');
                if (ID == "")
                    ID = "0";
                var FirstName = $("#txtFirstName").val();
                var LastName = $("#txtLastName").val();
                var Address1 = $("#txtAddress1").val();
                var Address2 = $("#txtAddress2").val();
                var Country = $(".bfh-countries").val();
                var State = $(".bfh-states").val();
                 //var Country = "CA";
                //var State = "ON";
                var City = $("#txtCity").val();
                var ZipCode = $("#txtZipCode").val();
                var Email = $("#txtEmail").val();
                var Phone = $("#txtContact").val();
                
            

                $('body').loader('show', { overlay: true });
                setTimeout(function () {
                    $.ajax({
                        url: "MyAgents.aspx/AddAgent",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: '{"ID":"' + ID + '","FirstName":"' + FirstName + '","LastName":"' + LastName + '","Address1":"' + Address1 + '","Address2":"' + Address2 + '","Country":"' + Country + '","State":"' + State + '","City":"' + City + '","ZipCode":"' + ZipCode + '","Email":"' + Email + '","Phone":"' + Phone + '"}',
                        dataType: "json",
                        success: OnAddAgent,
                        failure: function (response) {
                            //alert(response.d);
                        }
                    });

                }, 2000);  
            }
        });
    }

    function OnAddAgent(response) {
        
        $('body').loader('hide');
        
        if (response.d == "True") {
            
            if (AgentID == "")
                $('.msgtext').text('Agent has been added successfully!');
            else
                $('.msgtext').text('Agent has been updated successfully!');
        }
        else {
            if (AgentID == "")
                $('.msgtext').text('Agent is not added!');
            else
                $('.msgtext').text('Agent is not updated!');
        }
        $('#msgaddagent').modal('show');

    }

    function ValidateMyAgentForm() {
        var AgentForm = $('#FormAgent');
        var error1 = $('.alert-danger', AgentForm);
        var success1 = $('.alert-success', AgentForm);

        AgentForm.validate({
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

        
                txtName: {
                    required: true
                },

                txtAddress: {
                    required: true
                },

                txtEmail: {
                    required: true,
                    email: true
                },

                txtContact: {
                    required: true
                },
                txtMessage: {
                    required: true
                },
                SelAgent: {
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
                $('#dialogmyagentcontact').modal('hide');

                var Agent = $("#SelAgent").val();
                var Name = $("#txtName").val();
                var Address = $("#txtAddress").val();
                var Email = $("#txtEmail").val();
                var Contact = $("#txtContact").val();
                var Message = $("#txtMessage").val();
                var SenderType = $("input[id$=hdnRole]").val();
                
                $.ajax({
                    url: "MyAgents.aspx/SendEmail",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: '{"To":"' + Agent + '","Name":"' + Name + '","Address":"' + Address + '","Email":"' + Email + '","Contact":"' + Contact + '","Message":"' + Message + '","SenderType":"' + SenderType + '"}',
                    dataType: "json",
                    success: OnSubmitEmail,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });

            }
        });
    }

    function OnSubmitEmail(response) {

        if (response.d == 'Successful')
            $(".msgtext").text("Email has been sent successfully to Agent.");
            else
            $(".msgtext").text("Email could not be sent to Agent.");
             $("#msgagentcontact").modal('show');
    }


    $("#btnContact").click(function () {
        var FormAddAgent = $('#FormAddAgent');
        var error1 = $('.alert-danger', FormAddAgent);
        var success1 = $('.alert-success', FormAddAgent);
        error1.hide();
        success1.hide();
        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            LoadAgents();
            LoadCustomerInfo();
            
        }, 2000);
        
        
    });

    $("#btnreferagent").click(function () {
        var FormAddAgent = $('#Formrefer');
        var error1 = $('.alert-danger', FormAddAgent);
        var success1 = $('.alert-success', FormAddAgent);
        error1.hide();
        success1.hide();
        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            LoadrefreAgents();
            LoadreferCustomerInfo();

        }, 2000);


    });

    function LoadreferCustomerInfo() {

        $.ajax({
            url: "MyAgents.aspx/LoadCustomerInfo",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnLoadreferCustomers,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnLoadreferCustomers(response) {
        var objMyAgent = JSON.parse(response.d);
        $.each(objMyAgent, function (key, value) {

            $('#txtNamerefer').val(value.CustName);
            $('#Text1').val(value.CustEmail);
        });
        $('#div_refer').modal('show');
        $('body').loader('hide');
    }


    function LoadrefreAgents() {

        $.ajax({
            url: "MyAgents.aspx/LoadAgents",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"userrole":"' + $('#hdnRole').val() + '"}',
            dataType: "json",
            success: OnLoadreferAgentSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnLoadreferAgentSuccess(response) {

        var objMyAgent = JSON.parse(response.d);
        $('#SelAgentrefer').empty();
        //$('#SelAgentrefer').append("<option value=''>-------------------------------------Select-------------------------------------</option>");
        $.each(objMyAgent, function (key, value) {
            $('#SelAgentrefer').append($("<option></option>").val(value.userid).html(value.AgentName));
            $('#txtAgentrefermail').val(value.Email);
        });

    }
    $("#btnrefersend").click(function () {
        ValidateMyAgentreferForm();
    });

    function ValidateMyAgentreferForm() {
        var AgentForm = $('#Formrefer');
        var error1 = $('.alert-danger', AgentForm);
        var success1 = $('.alert-success', AgentForm);

        AgentForm.validate({
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


                txtNamerefer: {
                    required: true
                },

                txtNamereferto: {
                    required: true
                },

                txtEmailto: {
                    required: true,
                    email: true
                },

                txtMessagerefer: {
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
                $('#div_refer').modal('hide');

                var Agentid = $("#SelAgentrefer").val();
                var ReferName = $("#txtNamereferto").val();
                var referemail = $("#txtEmailto").val();
                var username = $("#txtNamerefer").val();
                var useremail = $("#Text1").val();
                var Message = $("#txtMessagerefer").val();
                
                $.ajax({
                    url: "MyAgents.aspx/SendReferEmail",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: '{"Agentid":"' + Agentid + '","ReferName":"' + ReferName + '","referemail":"' + referemail + '","username":"' + username + '","useremail":"' + useremail + '","Message":"' + Message + '"}',
                    dataType: "json",
                    success: OnSubmitreferEmail,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });

            }
        });
    }

    function OnSubmitreferEmail(response) {

        if (response.d == 'Successful')
            $(".msgtext").text("Email has been sent successfully.");
        else
            $(".msgtext").text("Email could not be sent.");
        $("#msgagentcontact").modal('show');
    }

    $("#btnSubmitContact").click(function () {
        ValidateMyAgentForm();
    });

    $("#btnAddAgent").click(function () {
        location.href = "addagent";
    });

    $("#btnSubmitAgent").click(function () {
        if ($("#txtZipCode").val() == "X#X #X#" || $("#txtZipCode").val() == "#####")
            $("#txtZipCode").val("");
        
        if ($("#txtContact").val() == "(###)###-####")
            $("#txtContact").val("");

        ValidateAddAgentForm();
        
    });
   
    $("#btnOk").click(function () {
        location.href = "myagents";
    });
    
    
    $("#grdMyAgent").on('click', '.editAgent', function (e) {

        var trid = $(this).attr("id"); // table row ID 
        location.href = "AddAgent.aspx?ID=" + trid +"";
    });

    $("#grdMyAgent").on('click', '.delAgent', function (e) {

        var trid = $(this).attr("id"); // table row ID 
        $('#hdnAgentID').val(trid);
        $('#deleteagentmodel').modal('show');
    });

    $("#btnOk").click(function () {
        location.href = "myagents";
    });

    $("#btndelagentYes").click(function () {

        
        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            $.ajax({
                url: "MyAgents.aspx/DeleteAgent",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"ID":"' + $('#hdnAgentID').val() + '"}',
                dataType: "json",
                success: OnDeleteAgent,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }, 2000);
    });

    function OnDeleteAgent(response) {

        $('body').loader('hide');
        if(response.d == "True")
            $(".msgtext").text("Agent has been deleted successfully!");
        else
            $(".msgtext").text("Agent is not deleted!");
        $("#msgagentcontact").modal('show');
    }

    $("#btnAssignAgent").click(function () {

        
        $('body').loader('show', { overlay: true });
        setTimeout(function () {
        $('#grdUserAgents').dataTable().fnDestroy();

        GridAssignAgent.init();
        LoadUsersList();
        LoadAgentsList();
        LoadAssinedAgents();
        }, 2000);
        
    });


    $('#dialogassignagent').on('show.bs.modal', function () {
        $('body').loader('hide');
    });
    function LoadUsersList() {

        $.ajax({
            url: "MyAgents.aspx/LoadUsers",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            async: false,
            success: OnLoadUsers,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnLoadUsers(response) {

        var objUsers = JSON.parse(response.d);
        $('#SelUsers').empty();
        $('#SelUsers').append($("<option value=''>--------------------Select--------------------</option>"));
        $.each(objUsers, function (key, value) {
            $('#SelUsers').append($("<option></option>").val(value.userid).html(value.FirstName + " " + value.LastName));
        });

    }

    function LoadAgentsList() {
        $.ajax({
            url: "MyAgents.aspx/LoadAgents",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"userrole":"' + $('#hdnRole').val() + '"}',
            dataType: "json",
            async: false,
            success: OnLoadAgentsList,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnLoadAgentsList(response) {
        var objAgentsList = JSON.parse(response.d);
        $('#SelAgents').empty();
        $('#SelAgents').append($("<option value=''>--------------------Select--------------------</option>"));
        $.each(objAgentsList, function (key, value) {
            $('#SelAgents').append($("<option></option>").val(value.userid).html(value.AgentName));
        });
    }

    $("#btnupdateagent").click(function () {
        var UserID = $("#SelUsers").val();
        var AgentID = $("#SelAgents").val();



        $.ajax({
            url: "MyAgents.aspx/updateagent",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"UserID":"' + UserID + '","AgentID":"' + AgentID + '"}',
            dataType: "json",
            success: OnupdateAgents,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnupdateAgents(response) {

        if (response.d == "True") {
            LoadAssinedAgents();
            $('#div_assign').modal('hide');
            $('.msgtext').text("Agent Update Successfully!");
            $('#dialogmsgassignagent').modal('show');
        }
        else if (response.d == "False") {
            $('.msgtext').text("Agent is not Update!");
            $('#dialogmsgassignagent').modal('show');
        }
    }

    $("#btnAssignUser").click(function () {
        ValidateAssignAgentForm();
    });
   
    function ValidateAssignAgentForm() {
        var FormAssignUser = $('#FormAssignUser');
        var error1 = $('.alert-danger', FormAssignUser);
        var success1 = $('.alert-success', FormAssignUser);

        FormAssignUser.validate({
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

                SelUsers: {
                    required: true
                },
                SelAgents: {
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


                var UserID = $("#SelUsers").val();
                var AgentID = $("#SelAgents").val();



                    $.ajax({
                        url: "MyAgents.aspx/AssignAgents",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: '{"UserID":"' + UserID + '","AgentID":"' + AgentID + '"}',
                        dataType: "json",
                        success: OnAssignAgents,
                        failure: function (response) {
                            //alert(response.d);
                        }
                    });                
            }
        });
    }

    function OnAssignAgents(response) {

        if (response.d == "Already Assigned") {
            $('#div_assign').modal('show');
        }
        else if (response.d == "False") {
            $('.msgtext').text("Agent is not assigned!");
            $('#dialogmsgassignagent').modal('show');
        }
        else {
            $('.msgtext').text("Agent has been assigned successfully!");
            $('#grdUserAgents').dataTable().fnDestroy();
            $('#grdUserAgents > tbody').append(response.d);
            GridAssignAgent.init();
        }
    }


    //$("#SelUsers").change(function () {
    //    LoadAssinedAgents();
    //});

    $("#SelAgents").change(function () {
        LoadAssinedAgents();
    });

    function LoadAssinedAgents() {

        var ID = $("#SelAgents").val();

        $.ajax({
            url: "MyAgents.aspx/LoadAssignedAgents",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"ID":"' + ID + '"}',
            dataType: "json",
            async: false,
            success: OnAssignedAgents,
            failure: function (response) {
                //alert(response.d);
            }
        });
        $("#dialogassignagent").modal('show');
    }

    function OnAssignedAgents(response) {
        $('#grdUserAgents').dataTable().fnDestroy();
        $('#grdUserAgents tr').not(function () { if ($(this).has('th').length) { return true } }).remove();
        $('#grdUserAgents > tbody').append(response.d);
        GridAssignAgent.init();
    }

    $("#grdUserAgents").on('click', '.delassignagent', function (e) {

        var trid = $(this).attr("id"); // table row ID 
        $('#hdnAgentID').val(trid);
        $.ajax({
            url: "MyAgents.aspx/DeleteAssignedAgents",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{"ID":"' + $('#hdnAgentID').val() + '"}',
            dataType: "json",
            success: OnDeleteAssignedAgent,
            failure: function (response) {
                //alert(response.d);
            }
        });
    });

    function OnDeleteAssignedAgent(response) {
        if (response.d == "True") {
            $('#grdUserAgents').dataTable().fnDestroy();
            var assignedagentid = '#' + $('#hdnAgentID').val();
            $(assignedagentid).remove();
            $('.msgtext').text("Assigned Agent has been deleted successfully!");
            $('#dialogmsgassignagent').modal('show');
            GridAssignAgent.init();
        }

        else {
            $('.msgtext').text("Assigned Agent is not deleted!");
            $('#dialogmsgassignagent').modal('show');
        }
    }

$("#btnCancelAgent").click(function () {
        location.href = "myagents";
     });
});

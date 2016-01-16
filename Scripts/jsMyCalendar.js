
$(document).ready(function () {
    //if ($("input[id$=HdnRole]").val() == "Admin" || $("input[id$=HdnRole]").val() == "SuperAdmin")
    //    //$("#btnAddEvent").hide();
    //else
    //    $("#btnAddEvent").show();
    
    ViewCalendar();

    /*setting start*/
    $.fn.datepicker.defaults.format = "mm/dd/yyyy";
    if ($("#HdnRoles").val().indexOf("User") > -1) {//////////////////////////////////////////////////////////Client///////////////////////////////////////////////////////
        $("#Users").css('display', "none");
        $("#lblUsers").css('display', "none");
        $("#Status").css('display', "block");
        $('#SerRepCat').attr('disable', true)
    }
    else {/////////////////////////////////////////////////////////Admin///////////////////////////////////////////////////////////////
        $("#lblstatus").css('display', "normal");
        $("#Users").css('display', "block");
        $("#lblUsers").css('display', "block");
        $("#Status").css('display', "block");
        $("#btnOpenManageCategories").css('display', "normal");
    }
    /*setting end*/
    
    function ViewCalendar() {
        $('body').loader('show', { overlay: true });
        var ClientID = "0";
        $('#divmycalendar').fullCalendar({
            events: 'Calander.ashx?ClientID=' + ClientID + '',
            eventClick: function (calEvent, jsEvent, view) {
                
        
                
                var EventID = calEvent.id;
                var EventTitle = calEvent.title;
                if (EventTitle.indexOf("Event:") != -1 && $("input[id$=HdnRole]").val() != "Admin") {
                    $("#HdnTaskID").val(EventID);
                    $('#btnDelete').show();
                    $('body').loader('show', { overlay: true });
                    setTimeout(function () {
                    $.ajax({
                        url: "calander.aspx/GetEventByID",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: '{"EventID":"' + EventID + '"}',
                        dataType: "json",
                        success: OnGetEventSuccess,
                        failure: function (response) {
                            //alert(response.d);
                        }
                    });
                    }, 2000);
                }
                else if (EventTitle.indexOf("ServiceID:") != -1) {
                    $("#hdnRecordID").val(EventID);
                    $('body').loader('show', { overlay: true });
                    setTimeout(function () {
                        $.ajax({
                            url: "../ServiceAndRepairModule/ServiceandRepairs.aspx/GetRepairRecord",
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: "{'id':'" + $("#hdnRecordID").val() + "'}",
                            async: false,
                            success: OnGetRepairRecord,

                            error: function () {
                                alert("error ");

                            }
                        });
                    }, 2000);
                }
            },
            
            dayClick: function (date, jsEvent, view) {
            },
            eventAfterRender: function (event, element, view) {  
              
            }
        });
        $('body').loader('hide');
    }

    function OnGetEventSuccess(response) {
        
        var jsTasks = JSON.parse(response.d);
        $.each(jsTasks, function (key, value) {

            $('#txtTask').val(value.EventName);

            var d = new Date(value.EventDate);
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();
            var serdate = curr_month + "/" + curr_date + "/" + curr_year;
            $('#txtStartDate').datetimepicker('remove');
            $("#txtStartDate").val(value.EventDate.replace("T", " "));
            $('#txtStartDate').datetimepicker({ startDate: serdate, autoclose: true });

            $('#txtDesc').val(value.Description);

        });
        $('#Hdr_MyCal_Form').text('Update Event');
        $('#dialog-mycalendar').modal('show');
        $('body').loader('hide');
    }


    $("#ContentPlaceHolder1_UC_MyServices_SelClients").change(function () {
        var ClientID = this.value;

        $('#divmycalendar').fullCalendar('destroy');
        $('#divmycalendar').fullCalendar({
            events: 'Calander.ashx?ClientID=' + ClientID + '',

            eventClick: function (calEvent, jsEvent, view) {
            },
            dayClick: function (date, jsEvent, view) {
            },
            eventAfterRender: function (event, element, view) {

            }
        });


    });

    $("#btnDelete").click(function () {
        $('#dialog-mycalendar').modal('hide');
        $('#deleteTaskModel').modal('show');
        
    });

    $("#btndelTaskYes").click(function () {

        var EventID = $("#HdnTaskID").val();
        $('body').loader('show', { overlay: true });
        setTimeout(function () {

            $.ajax({
                url: "calander.aspx/DeleteEvent",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"EventID":"' + EventID + '"}',
                dataType: "json",
                success: OnDelEventSuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }, 2000);

        
    });


    function OnDelEventSuccess(response) {

        if (response.d == "Successful") {
            
            $(".msgtext").text("Event is deleted successfully.");
            $("#dialogCalControlModel").modal('show');
            $('body').loader('hide');
            $('#divmycalendar').fullCalendar('destroy');
            ViewCalendar();
        }


    }
    $("#btnAddEvent").click(function () {
        $('#Hdr_MyCal_Form').text('Add Event');
        $('#btnDelete').hide();
        $('#txtTask').val("");
        $('#txtStartDate').val("");
        $('#txtStartDate').datetimepicker('remove');
        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
        $('#txtStartDate').datetimepicker({
            startDate: today, autoclose: true
        });
        $('#txtDesc').val("");
        $("#HdnTaskID").val("0");
        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            $('#dialog-mycalendar').modal('show');
   
        }, 2000);
    });

    function ClearFields() {

    }
    $('#dialog-mycalendar').on('show.bs.modal', function () {
        
        $('body').loader('hide');
    });

    function ValidateCalendar() {
        var FormCaled = $('#FormCaled');
        var error1 = $('.alert-danger', FormCaled);
        var success1 = $('.alert-success', FormCaled);

        FormCaled.validate({
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


                txtTask: {
                    required: true
                },

                txtStartDate: {
                    required: true
                },

                txtDesc: {
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
                $('#dialog-mycalendar').modal('hide');

                var ID = $("#HdnTaskID").val();
                var Event = $("#txtTask").val();
                var EventDate = $("#txtStartDate").val();
                var Description = $("#txtDesc").val();

                $.ajax({
                    url: "calander.aspx/AddEventTask",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: '{"ID":"' + ID + '","Event":"' + Event + '","EventDate":"' + EventDate + '","Description":"' + Description + '"}',
                    dataType: "json",
                    success: OnAddEventSuccess,
                    failure: function (response) {
                        //alert(response.d);
                    }
                });

            }
        });
    }
    $("#btnSubmitEvent").click(function () {

        ValidateCalendar();
        
        
    });

    function OnAddEventSuccess(response) {


        var ClientID = "0";
        if (response.d == "Successful") {
            if($("#HdnTaskID").val()== "0")
                $(".msgtext").text("Event is added successfully.");
            else
                $(".msgtext").text("Event is updated successfully.");
            $("#dialogCalControlModel").modal('show');

            $('#divmycalendar').fullCalendar('destroy');
            $('#divmycalendar').fullCalendar({
                events: 'Calander.ashx?ClientID=' + ClientID + '',
                eventClick: function (calEvent, jsEvent, view) {
              

                    //ClearFields();
                
                var EventID = calEvent.id;
                var EventTitle = calEvent.title;
                if (EventTitle.indexOf("Event:") != -1 && $("input[id$=HdnRole]").val() != "Admin") {
                    $("#HdnTaskID").val(EventID);
                    $('#btnDelete').show();
                    $('body').loader('show', { overlay: true });
                    setTimeout(function () {
                        $.ajax({
                            url: "calander.aspx/GetEventByID",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            data: '{"EventID":"' + EventID + '"}',
                            dataType: "json",
                            success: OnGetEventSuccess,
                            failure: function (response) {
                                //alert(response.d);
                            }
                        });
                    }, 2000);
                }
            },
               
            });

        }
    }


    function OnGetRepairRecord(response) {
        $("#LabelHeadingAddUpdateService").text("Update Service Request:");
        $("#FormServiceAndRepairs").modal("show");
        $('body').loader('hide');
        $("#lblserviceid").text( $("#hdnRecordID").val());
        var objEditres = JSON.parse(response.d);
        $("#Status").removeAttr("disabled");
        LoadStatus();
        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
        //$('#serreqstartdate').datepicker({
        //    startDate: today,
        //});
        LoadCategories();
        LoadCustomers();
        $.each(objEditres, function (key, value) {
            $('[id=Status] option').filter(function () {
                return ($(this).val() == value.statusID);
            }).prop('selected', true);
            $('[id=Users] option').filter(function () {
                return ($(this).val() == value.CustID);
            }).prop('selected', true);
            $('[id=SerRepCat] option').filter(function () {
                return ($(this).val() == value.ServiceID);
            }).prop('selected', true);
            $("#Status").parent().find(".select2-chosen").text(value.Status);
            $("#Users").parent().find(".select2-chosen").text(value.CustName);
            $("#SerRepCat").parent().find(".select2-chosen").text(value.ServiceName);
            $("#txtSRProbDesc").val(value.Problem);
            $("#serreqstartdate").val(value.ServiceDate);

            var d = new Date(value.ServiceDate);
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();
            var serdate = curr_month + "/" + curr_date + "/" + curr_year;
            $('#serreqstartdate').datepicker('remove');
            $("#serreqstartdate").val(serdate);
            $('#serreqstartdate').datepicker({ startDate: serdate, autoclose: true});

            if ($("#HdnRoles").val().indexOf("User") > -1) {
                $('#Status').prop('disabled', true);
                $('#Status').selectpicker('refresh');

                $('#SerRepCat').prop('disabled', true);
                $('#SerRepCat').selectpicker('refresh');
            }

            //$("#serreqenddate").val(value.CompDate);
            // $("#txtServiceCharge").val(value.ServiceCharges);
            // $("#txtCustomerNo").val(value.CustNum);
            //$("#Users").append($("<option></option>").val(value.CustID).html(value.CustName));
            //$("#Status").append($("<option></option>").val(value.statusID).html(value.Status));
            //$("#SerRepCat").append($("<option></option>").val(value.ServiceID).html(value.ServiceName));


        });

        $("#commentsdiv").show();
        OnViewComment();
    }

    function OnViewComment() {

        var trid = $("#hdnRecordID").val();
        $.ajax({
            url: "../ServiceAndRepairModule/ServiceandRepairs.aspx/ViewComments",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'RecordId':'" + trid + "'}",
            async: false,
            success: OnViewCommentssucess,

            error: function () {
                alert("error ");

            }
        });

    }

    function OnViewCommentssucess(response) {

        $("#Comments").empty();
        $('#Comments').html(response.d);
        $("#FormServiceAndRepairs").modal("show");

    }
    function LoadStatus() {
        $.ajax({
            url: "../ServiceAndRepairModule/ServiceandRepairs.aspx/GetStatus",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            async: false,
            success: OnGetStatus,
            error: function () {
                alert("error ");

            }
        });
    }
    function LoadCategories() {
        $.ajax({
            url: "../ServiceAndRepairModule/ServiceandRepairs.aspx/GetCategories",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            async: false,
            success: OnGetCategories,

            error: function () {
                alert("error ");

            }
        });
    }
    function OnGetCategories(response) {

        $("#SerRepCat").empty();


        $("#SerRepCat").parent().find(".select2-chosen").text("----Select----");

        var objRecord = JSON.parse(response.d);
        $.each(objRecord, function (key, value) {
            //$("#Status").parent().find('.select2-chosen').text(value.statusID);

            $("#SerRepCat").append($("<option></option>").val(value.ServiceID).html(value.ServiceName));


        });
    }
    function LoadCustomers() {
            /////////////////////////////////////////////////////////////////Residential///////////////////////////////////////////////

            $.ajax({
                url: "../ServiceAndRepairModule/ServiceandRepairs.aspx/LoadCustomers",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{}",
                async: false,
                success: function (response) {
                    OnLoadCustomer(response, 1);
                },

                error: function () {
                    alert("error ");

                }
            });
        
    }
    function OnLoadCustomer(response, flag) {
        $("#Users").empty();
        var objRecord = JSON.parse(response.d);
        if (flag == 0)
            $("#select_searchbyuser").append($("<option></option>").val('00000000-0000-0000-0000-000000000000').html('Show All Users'));

        $.each(objRecord, function (key, value) {
            if (flag == 1)
                $("#Users").append($("<option></option>").val(value.CustID).html(value.CustName));
            else {
                $("#select_searchbyuser").append($("<option></option>").val(value.CustID).html(value.CustName));
            }
        });
    }

    function OnLoadCoorpCustomer(response) {
        $("#Users").empty();


        var objRecord = JSON.parse(response.d);

        $.each(objRecord, function (key, value) {
            //$("#Status").parent().find('.select2-chosen').text(value.statusID);

            $("#Users").append($("<option></option>").val(value.CustID).html(value.CustName + " " + "(Store Name:" + " " + value.StoreName + ")"));
        });
    }
    function OnGetStatus(response) {
        $("#Status").empty();
        var objRecord = JSON.parse(response.d);
        $.each(objRecord, function (key, value) {
            //$("#Status").parent().find('.select2-chosen').text(value.statusID);
            $("#Status").append($("<option></option>").val(value.statusID).html(value.Status));
            $('[id=Status] option').filter(function () {
                return ($(this).text() == "Opened");
            }).prop('selected', true);
            $("#Status").parent().find(".select2-chosen").text("Opened");

        });
    }

    $("#addComment").click(function () {
        if ($("#txtComments").val().length > 0) {
            var trid = $("#hdnRecordID").val();
            var comment = $("#txtComments").val().replace(/(['"])/g, "\\$1");
            $.ajax({
                url: "../ServiceAndRepairModule/ServiceandRepairs.aspx/AddComments",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{'RecordID':'" + trid + "','comment':'" + comment + "'}",
                async: false,
                success: OnAddComment,

                error: function () {
                    alert("error ");

                }
            });
        }
        else {
            alert("Please Enter Comments");

        }
    });

    function OnAddComment(response) {
        $("#txtComments").val("");
        OnViewComment();

        return false;
    }

    $("#btnSerSubmit").click(function () {
        ValidateRepairandServiceForm();
    });

    function ValidateRepairandServiceForm() {

        var formserrep = $('#form_ServiceandRepairs');
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

                SerRepCat: {
                    required: true
                },

                txtSRProbDesc: {
                    required: true
                },

                SerRepCompany: {
                    required: true
                },

                serreqstartdate: {
                    required: true
                },
                serreqenddate: {
                    required: true
                },
                txtServiceCharge:
                    {
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

                $("#FormServiceAndRepairs").modal("hide");

                var RecordID = $("#hdnRecordID").val();
                var ServiceCategory = $("#SerRepCat :selected").val();
                var ProbDescription = $("#txtSRProbDesc").val().replace(/(['"])/g, "\\$1");//.replace("'","\\'");
                var Status = $("#Status :selected").val();
                var UserNo = $("#Users :selected").val();
                var StartDate = $('#serreqstartdate').val();

                $.ajax({
                    url: "../ServiceAndRepairModule/ServiceandRepairs.aspx/AddUpdateServiceRequest",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: "{'RecordID':'" + RecordID + "','ServiceCategory':'" + ServiceCategory + "','ProblemDescription':'" + ProbDescription + "','StartDate':'" + StartDate + "','Status':'" + Status + "','CustNo':'" + UserNo + "'}",
                    async: false,
                    success: OnAddUpdateServiceRequest,

                    error: function (response) {
                        //alert(response.d);
                    }
                });

            }//end here submitt
        });
    }

    function OnAddUpdateServiceRequest(response) {
         $(".msgtext").text("Service is updated successfully.");
        $('#divmycalendar').fullCalendar('destroy');
        ViewCalendar();
    }
});
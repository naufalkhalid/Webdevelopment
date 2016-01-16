$(document).ready(function () {

    $("#calenderview").click(function () {
        populatedAmenity();

    });
    CalInitialize();
    
    function populatedAmenity()
    {
        
        $.ajax({
            url: "BookingandReservations.aspx/PopulateDAmenities",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            dataType: "json",
            async:false,
            success: Onddsuccess,
            failure: function (response) {
                //alert(response.d);
            }

        });
    }

   

   

    $("#Select1").change(function(){

        
        CalenderAllRender();

    });
    
    function CalInitialize() {
      
    
        if (!jQuery().fullCalendar) {
            return;
        }
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var h = {};
        if ($('#calendar').width() <= 400) {
            $('#calendar').addClass("mobile");
            h = {
                left: 'title, prev, next',
                center: '',
                right: 'today,month'
            };
        } else {
            $('#calendar').removeClass("mobile");
            if (Metronic.isRTL()) {
                h = {
                    right: 'title',
                    center: '',
                    left: 'prev,next,today,month'
                };
            } else {
                h = {
                    left: 'title',
                    center: '',
                    right: 'prev,next,today,month'
                };
            }
        }
       
        


            
            
        $('#calendar').fullCalendar('destroy'); // destroy the calendar
        
       
       
        $('#calendar').fullCalendar({
            windowResize:true,
            disableDragging: true,
            header: h,
            defaultView: 'month',
            editable: false,
            disableResizing: true,
            events: 'calender.ashx?select=All',
            eventColor: '#378006',

            eventClick: function (calEvent, jsEvent, view) {


            },
            dayClick: function (date, jsEvent, view) {

                




                // change the day's background color just for fun


            }
        });

   
    }
    function CalenderAllRender() {
        
        $('#calendar').fullCalendar('destroy'); // destroy the calendar
       
        $('#calendar').fullCalendar({
            events: 'calender.ashx?select=' + $("#Select1").val(),
            eventColor: '#378006',

            eventClick: function (calEvent, jsEvent, view) {


            },
            dayClick: function (date, jsEvent, view) {

                




                // change the day's background color just for fun


            }
        });

    }
   
    
    $('#openReservation').click(function ()
    
    {
        
        document.location = "Amenities.aspx";
       
    });
    $('.reseditbutton').click(function () {
        
       
        $("#hdnRecID").val($(this).attr("id"));
        var RecID = $(this).attr("id");
       
        
        $.ajax({
            url: "BookingandReservations.aspx/GetEditRecordId",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + RecID + "'}",
            async: false,
        success: OnEditSuccess,
             



            error: function () {
                alert("error ");

    }
        });
        
    });
    $('#btnAddAmenity').click(function () {
        
        ValidateAmenitiesForm();
        
        
    });
    $(".resapprovedbutton").click(function () {

        $("#hdnRecID").val($(this).attr("id"));

        var RecID = $(this).attr("id");


        $.ajax({
            url: "BookingandReservations.aspx/GetEditRecordId",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + RecID + "'}",
            async: false,
            success: function () {

                $('#dialog-approve-message-Modal').modal('show');
                // clear text here after save complete


            },

            error: function () {
                alert("error ");

            }
        });


    });
    $("#btnApproveYes").click(function () {
        ApproveReservation($("#hdnRecID").val())

    });
    
    $('.amenities').click(function () {

        clear();
        $("#hdnRecID").val($(this).attr("name"));
        var RecID = $(this).attr("id");
        UsersData();
        $("#basicAmenities").modal("show");
        $("#amamenity").val($(this).attr("id"));


    });
    $('#btnEditAmenity').click(function ()
    {
        ValidateReservationForm();
        





    });
    $(".resdelbutton").click(function () {

       
        $("#hdnRecID").val($(this).attr("id"));

        var RecID = $(this).attr("id");


        $.ajax({
            url: "BookingandReservations.aspx/GetEditRecordId",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + RecID + "'}",
            async: false,
            success: function () {
               
                    $('#dialog-del-message-Modal').modal('show');
                    // clear text here after save complete

                
            },

            error: function () {
                alert("error ");

            }
        });



    });
    $("#btnResDelYes").click(function () {
        DeleteReservation($("#hdnRecID").val())

    });
    $('#btnresOK').click(function () {
        document.location = "BookingandReservations.aspx";
    });
  

    function OnAddSucess()
    {
        $('#dialog-message-Model').modal('show');
        $(".msgtext").text("Reservation Added Successfully");

    }
    function AddReservation()
    {
        var unit = $("#amdd_unit").val();
        var familyname = $("#amtxt_name").val();
        var startdate = $('#amtxt_dateposted').val();
        var expiredate = $('#amtxt_dateend').val();
        
        var description = $("#amtxt_description").val();
        var contactinfo = $("#amcontact_info").val();
        var amenity = $("#amamenity").val();
        var email = $("#amemail").val();


        $.ajax({
            url: "Amenities.aspx/InsertBooking",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'name':'" + familyname + "','phoneno':'" + contactinfo + "','unitno':'" + unit + "','email':'" + email + "','amenityname':'" + amenity + "','description':'" + description + "','datefrom':'" + startdate + "','dateto':'" + expiredate + "'}",


            async: false,
            success: OnAddSucess,
            // clear text here after save complete



            error: function (response) {

                $('#dialog-message-Model').modal('show');
                $(".msgtext").text("Something Wrong");
            }




        });
    }
    function EditReservation()
    {
        var id = $("#hdnRecID").val();
        var unit = $("#dd_unit").val();
        var familyname = $("#txt_name").val();
        var startdate = $('#txt_dateposted').val();
       
        var expiredate = $('#txt_dateend').val();
       
        var starttime = $('#start_time').val();
        var endtime = $('#end_time').val();
        var description = $("#txt_description").val();
        var contactinfo = $("#contact_info").val();
        var amenity = $("#amenity").val();
        var email = $("#email").val();


        $.ajax({
            url: "BookingandReservations.aspx/UpdateReservation",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "','name':'" + familyname + "','phoneno':'" + contactinfo + "','unitno':'" + unit + "','email':'" + email + "','amenityname':'" + amenity + "','description':'" + description + "','datefrom':'" + startdate + "','dateto':'" + expiredate + "','starttime':'" + starttime + "','endtime':'" + endtime + "'}",


            async: false,
            success: OnEditReservation,
            // clear text here after save complete



            error: function (response) {

                $('#dialog-message-Model').modal('show');
                $(".msgtext").text("Something Wrong");
            }




        });
    }
    function clear() {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $("#amdd_unit").val("");
        $("#amtxt_name").val("");
        $('#amtxt_dateposted').val("");
        $('#amtxt_dateend').val("");
        $('#amstart_time').val("");
        $('#amend_time').val("");
        $("#amtxt_description").val("");
        $("#amcontact_info").val("");
        $("#amamenity").val("");
        $("#amemail").val("")
    }

    function OnEditSuccess(response) {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        var objEditReq = JSON.parse(response.d);
        $.each(objEditReq, function (key, value) {
            var unit = $("#dd_unit").val(value.suiteno);
            var familyname = $("#txt_name").val(value.name);
            var startdate = $('#txt_dateposted').val(value.date_from);
            var expiredate = $('#txt_dateend').val(value.date_to);
            var starttime = $('#start_time').val(value.start_time);
            var endtime = $('#end_time').val(value.end_time);
            var description = $("#txt_description").val(value.description);
            var contactinfo = $("#contact_info").val(value.phoneno);
            var amenity = $("#amenity").val(value.amenityname);
            var email = $("#email").val(value.email);
        $('#basicModalereserv').modal('show');

        });

    }
    function OnEditReservation()
    {
        $('#dialog-message-Model').modal('show');
        $(".msgtext").text("Reservation Updated Successfully");

    }
    function ApproveReservation(id)
    {
        $.ajax({
            url: "BookingandReservations.aspx/ApproveReservation",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "'}",
            async: false,
            success: OnApproveSuccess,

            error: function () {

                $('#dialog-message-Model').modal('show');
                $(".msgtext").text("Something Wrong");

            }
        });


    }
    function DeleteReservation(id) {
        $.ajax({
            url: "BookingandReservations.aspx/DeleteReservation",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "'}",
            async: false,
            success: OnDeleteSuccess,

            error: function () {

                $('#dialog-message-Model').modal('show');
                $(".msgtext").text("Something Wrong");

            }
        });

    }
    function OnDeleteSuccess() {
        $('#dialog-message-Model').modal('show');
        $(".msgtext").text("Reservation is Deleted Successfully");

    }
    function OnApproveSuccess() {
        $('#dialog-message-Model').modal('show');
        $(".msgtext").text("Reservation is Approved Successfully");

    }
    function Onddsuccess(response)
    {
      
        $("#Select1").empty();
        $('#Select1').append("<option value='0'>--Select--</option>");
        var jsdata = JSON.parse(response.d);           
        $.each(jsdata, function (key, value) {
           
            $('#Select1').append($("<option></option>").val(value.name).html(value.name));
      
        });
    }
    function ValidateReservationForm() {

        var formres = $('#form_Reservations');
        var error1 = $('.alert-danger', formres);
        var success1 = $('.alert-success', formres);

        formres.validate({
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

                dd_unit: {
                    required: true
                },

                txt_dateposted: {
                    required: true
                },

                txt_dateend: {
                    required: true
                },
                contact_info: {
                    required: true
                },
                email: {
                    required: true
                },
                amenity: {
                    required: true
                },
                txt_name: {
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
                var startDates = $('#txt_dateposted').val();

                var expireDates = $('#txt_dateend').val();
                
                var Date1 = new Date(startDates.replace("T", " ").replace(/-/g, '/'));
                var Date2 = new Date(expireDates.replace("T", " ").replace(/-/g, '/'));

                if ((Date2 - Date1) < 0) {
                    $('#basicModalereserv').modal('hide');
                    $("#msg_Datetxt").text('End Date should be greater than Start Date.');
                    $('#dialog-message-ResDateModel').modal('show');
                    return false;
                }
                else {
                    $('#basicModalereserv').modal('hide');


                    EditReservation();
                }
            }
        });
    }
    function ValidateAmenitiesForm() {

        var formam = $('#form_Amenities');
        var error1 = $('.alert-danger', formam);
        var success1 = $('.alert-success', formam);

        formam.validate({
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

                amdd_unit: {
                    required: true
                },

                amtxt_dateposted: {
                    required: true
                },

                amtxt_dateend: {
                    required: true
                },
                amcontact_info: {
                    required: true
                },
                amemail: {
                    required: true
                },
                amamenity: {
                    required: true
                },
                amtxt_name: {
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
                var startDate = $('#amtxt_dateposted').val();

                var expireDate = $('#amtxt_dateend').val();
                
                var Date1 = new Date(startDate.replace("-", ""));
                var Date2 = new Date(expireDate.replace("-", ""));
                
                if ((Date2 - Date1) < 0) {
                    $('#basicAmenities').modal('hide');
                    $("#msg_AmenDatetxt").text('End Date should be greater than Start Date.');
                    $('#dialog-message-AmenDateModel').modal('show');
                    return false;
                }
                else {
                    $('#basicAmenities').modal('hide');


                    AddReservation();
                }
            }
        });
    }
    function UsersData() {
        $.ajax({
            url: "Amenities.aspx/UserData",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            async: false,
            success: OnUsersuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });


    }
    function OnUsersuccess(response) {
        var jsdata = JSON.parse(response.d);
        
        $.each(jsdata, function (key, value) {
            $("#amdd_unit").val(value.Unitno);
            
            $("#amtxt_name").val(value.Name);
            $("#amcontact_info").val(value.ContactInfo);
            $("#amemail").val(value.Email);
            
        });
    }
});
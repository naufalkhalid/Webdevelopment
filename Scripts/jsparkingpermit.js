
var GridParkingPermits = function () {

    var GridParkingPermitTable = function () {

        var table = $('#grdParkingPermits2');

        var oTable = table.dataTable({
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
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
                [0, "asc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#grdParkingPermits2_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridParkingPermitTable();
        }

    };

}();
$(document).ready(function () {

    GridParkingPermits.init();
    $('#grdParkingPermits2').on('click', '.approvedbutton', function (e) {


        
        var trids = $(this).closest('tr').attr('id');
        
        $("#hdnTableRowID").val(trids);
        $("#hdnRecID").val($(this).attr("id"));

        $('#dialog-ppapprove-message-Model').modal('show');


    }
    );
    
    $('#grdParkingPermits2').on('click', '.editbutton', function (e) {
    
        
        $("#headingEdit").text("(Edit)");
        $("#btnAdd").text("Edit");
        var trid = $(this).closest('tr').attr('id');
        $("#hdnTableRowID").val(trid);
     
        $("#hdnAddUpd").val("Update");
        $("#hdnRecID").val($(this).attr("id"));
        var RecID = $(this).attr("id");
       

        $.ajax({
            url: "ParkingPermits.aspx/GetEditRecordId",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" +RecID  + "'}",
            async: false,
            success:Oneditsuccess, 
                    // clear text here after save complete
                    
               
        
            
            error: function () {
                alert("error ");

            }
        });
    });
    $("#btnOpenModal").click(function()
    {
     
        clear();
        $("#headingEdit").text("(Add)");
        $("#btnAdd").text("Add");
        $('#hdnAddUpd').val("Add");
        UsersData();
        $('#basicModal3').modal('show');
       
       
       
   

});
    $('#grdParkingPermits2').on('click', '.delbutton', function (e)
  
    {
       var trids= $(this).closest('tr').attr('id');
       $("#hdnTableRowID").val(trids);
        $('#dialog-del-message-Model').modal('show');
       
        $("#hdnRecID").val($(this).attr("id"));
       
        var RecID = $(this).attr("id");
      

        $.ajax({
            url: "ParkingPermits.aspx/GetEditRecordId",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + RecID + "'}",
            async: false,
            success: function (data) {
                if (data.d == "success") {
                    $(".msgtext").text("Parking Permit is Deleted successfully.");
                    $('#dialog-message-Modal').modal('show');
                    // clear text here after save complete

                }
            },

            error: function () {
                alert("error ");

            }
        });

    });

    $("#btnAdd").click(function () {
      
        ValidateParkingPermitForm();
        
    });
    $("#btnppApproveYes").click(function () {

        ApproveParkingPermit($("#hdnRecID").val())

       

    });
    
    $("#btnDelYes").click(function () {
     
        DeleteParkingPermit($("#hdnRecID").val())
   
    });
    $("#btnOK").click( function()
    {
        //sdocument.location = "ParkingPermits.aspx";
    });
    $('#grdParkingPermits2').on('click', '.printbutton', function (e)
 {
       
        $("#hdnRecID").val($(this).attr("id"));

        var RecID = $(this).attr("id");
        

        $.ajax({
            url: "ParkingPermits.aspx/GetEditRecordId",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + RecID + "'}",
            async: false,
            success: PrintParkingPermit,


            error: function () {

                $('#dialog-message-Model').modal('show');
                $(".msgtext").text("Something Wrong");
            }
        });



    });
    $('#grdParkingPermits2').on('click', '.viewbutton', function (e)

    {
        
        $("#hdnRecID").val($(this).attr("id"));
       
        var RecID = $(this).attr("id");
        

        $.ajax({
            url: "ParkingPermits.aspx/GetEditRecordId",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + RecID + "'}",
            async: false,
            success: ViewParkingPermit,
           

            error: function () {

                $('#dialog-message-Model').modal('show');
                $(".msg_txt").text("Something Wrong");
            }
        });



    });

    function AddParkingPermit() {

        //var e = document.getElementById("ddlViewBy");
        //var strUser = e.options[e.selectedIndex].text;
        //$("#ddlViewBy :selected").text() //the text content of the selected option
        //$("#ddlViewBy").val() //the value of the selected option
        var unit = $("#dd_unit").val();
        var familyname = $("#txt_familyname").val();
        var startdate = $("#txt_startdate").val();
       
        var expiredate = $("#txt_enddate").val();
    
        var fee = $("#txt_fee").val();
        var type = $("#dd_type :selected").text();
        var vehicleinfo = $("#vehicle_info").val();
        var licenseno = $("#license_no").val();
        var contactinfo = $("#contact_info").val();
        // here call server side function for save data using jquery ajax
        $.ajax({
            url: "ParkingPermits.aspx/InsertParkingPermit",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'unit':'" + unit + "','familyname':'" + familyname + "','startdate':'" + startdate + "','enddate':'" + expiredate + "','fee':'" + fee + "','type':'" + type + "','vehicleinfo':'" + vehicleinfo + "','contactinfo':'" + contactinfo + "','licenseno':'" + licenseno + "'}",
            async: false,
            success:OnAddSuccess,
            error: function () {

                $('#dialog-message-Model').modal('show');
                $(".msg_txt").text("Something Wrong");
              
            }
            
        });
        //alert("The paragraph is now hidden");
        $("#hdnAddUpd").val("");
        
    }
    function clear()
    {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        $("#dd_unit").val("");
        $("#txt_familyname").val("") ;
       $("#txt_startdate").val("");
         $("#txt_enddate").val("");
        $("#txt_fee").val("");
        $("#dd_type :selected").val("");
        $("#vehicle_info").val("");
        $("#license_no").val("");
        $("#contact_info").val("");
        
    }

    function UpdateParkingPermit()
    {
        
       
      
        var id = $("#hdnRecID").val();
       
       var unit = $("#dd_unit").val();
        var familyname = $("#txt_familyname").val();
        var startdate = $("#txt_startdate").val();
        var expiredate = $("#txt_enddate").val();
        var fee = $("#txt_fee").val();
        var type = $("#dd_type :selected").text();
        var vehicleinfo = $("#vehicle_info").val();
        var licenseno = $("#license_no").val();
        var contactinfo = $("#contact_info").val();
        $.ajax({
            url: "ParkingPermits.aspx/EditParkingPermit",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "','unit':'" + unit + "','familyname':'" + familyname + "','startdate':'" + startdate + "','enddate':'" + expiredate + "','fee':'" + fee + "','type':'" + type + "','vehicleinfo':'" + vehicleinfo + "','contactinfo':'" + contactinfo + "','licenseno':'" + licenseno + "'}",
            async: false,
            success: OnUpdateSuccess,

            error: function () {

                $('#dialog-message-Model').modal('show');
                $(".msg_txt").text("Something Wrong");
               
            }
            
        }

        );
      
        clear();
    }
    function DeleteParkingPermit(id)
    {

        $.ajax({
            url: "ParkingPermits.aspx/DeleteParkingPermit",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + id + "'}",
            async: false,
            success: OnDeleteSuccess,
          
            error: function (response) {

                $('#dialog-message-Model').modal('show');
                $(".msg_txt").text("Something Wrong");

            }
        });



    }
    function ViewParkingPermit(response)
    {
        var objEditReq = JSON.parse(response.d);
        $.each(objEditReq, function (key, value) {
            
            $("#lbl_permittype").text(value.permit_type);
            $("#lbl_contactinfo").text(value.contact_info);
            $("#lbl_vehicleinfo").text(value.vehicle_info);
            $("#lbl_startdate").text(value.start_date);
            $("#lbl_enddate").text(value.expire_date);
            $('#basicModal').modal('show');

        });
       
    }
    function PrintParkingPermit(response)
    {
        var objEditReq = JSON.parse(response.d);
        $.each(objEditReq, function (key, value) {

           
            $("#lbl_license").text(value.license_no);
            $("#lblvehicleinfo").text(value.vehicle_info);
            $("#lblstartdate").text(value.start_date);
            $("#lblexpiredate").text(value.expire_date);
            $("#unit_no").text(value.unit);
            $("#lbl_issued").text(value.issued_on);

            $('#basicModal2').modal('show');

        });


    }
    function Oneditsuccess(response)

    {
        $('span').closest('.form-group').removeClass('has-error');
        $('span').remove('.help-block');
        $('.alert-danger').hide();
        var objEditReq = JSON.parse(response.d);
        $.each(objEditReq, function (key, value) {
            
            $("#dd_unit").val(value.unit);
            $("#txt_familyname").val(value.name);
            $("#txt_startdate").val(value.start_date);
            $("#txt_enddate").val(value.expire_date);
            $("#txt_fee").val(value.fee);
            $("#dd_type :selected").text(value.permit_type);
            $("#vehicle_info").val(value.vehicle_info);
            $("#license_no").val(value.license_no);
            $("#contact_info").val(value.contact_info);
            $('#basicModal3').modal('show');

        });
    }
    function OnAddSuccess(response)
    {

        $(".msgtext").text("Pakring Permits Added Sucessfully");
                $('#grdParkingPermits2').dataTable().fnDestroy();
              
                
                $('#grdParkingPermits2 > tbody').append(response.d);
               
                GridParkingPermits.init();
      
             

                $('#dialog-message-Model').modal('show');
    }
    function OnUpdateSuccess(response) {
        $(".msgtext").text("Parking Permit is Updated successfully.");
        var parkingpermitid = '#' + $("#hdnTableRowID").val();
      
       
        
        $('#grdParkingPermits2').dataTable().fnDestroy();
        $(parkingpermitid).remove();
       
        $('#grdParkingPermits2 > tbody').append(response.d);

        GridParkingPermits.init();
        $('#dialog-message-Model').modal('show');
        
 //       switch (response.d) {
 //           case "True":
 //               $('#dialog-message-Model').modal('show');
 //               $(".msgtext").text("Repair Request is Updated successfully.");
 //               break;

 //           case "False":
               
 //$('#dialog-message-Model').modal('show');
 //               $(".msgtext").text("Repair Request is not updated.");
 //               break;
 //       }
    }
    function OnDeleteSuccess() {
        var deleteparkingpermitid = '#' + $("#hdnTableRowID").val();
        $('#grdParkingPermits2').dataTable().fnDestroy();
        $(deleteparkingpermitid).remove();
        GridParkingPermits.init();
                $('#dialog-message-Model').modal('show');
                $(".msgtext").text("Parking Permit is Deleted successfully.");
 //       
    }
    function ApproveParkingPermit(Rid) {

        $.ajax({
            url: "ParkingPermits.aspx/ApproveParkingPermit",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{'id':'" + Rid + "'}",
            async: false,
            success: OnApproveSuccess,
            error: function (response) {

                $('#dialog-message-Model').modal('show');
                $(".msgtext").text("Something Wrong");

            }

            


           
        });



    }
    function OnApproveSuccess(response) {
       
        $(".msgtext").text("Parking Permit is Approved successfully.");
      


        $('#grdParkingPermits2').dataTable().fnDestroy();
     
        $('#grdParkingPermits2 tbody tr:eq(' + $("#hdnRecID").val() + ') td:eq(4)').text('Approved');
        GridParkingPermits.init();
        $('#dialog-message-Model').modal('show');

    }
    function UsersData() {
        $.ajax({
            url: "ParkingPermits.aspx/UserData",
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
            $("#dd_unit").val(value.unit)
            $("#txt_familyname").val(value.name);
            $("#contact_info").val(value.contact_info);
            
        });
    }
    function ValidateParkingPermitForm() {
       
        var formpp = $('#form_ParkingPermit');
        var error1 = $('.alert-danger', formpp);
        var success1 = $('.alert-success', formpp);

        formpp.validate({
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

                txt_familyname: {
                    required: true
                },

                txt_fee: {
                    required: true
                },

                txt_enddate: {
                    required: true
                },
                txt_startdate: {
            required: true

                },
                vehicle_info: {
                required: true
        },
                license_no: {
                required: true
                },
                contact_info: {
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
                var startdate = $("#txt_startdate").val();
                var expiredate = $("#txt_enddate").val();
               
                if ($("#hdnAddUpd").val() == "Update") {
                    var Date1 = new Date(startdate.replace("T", " ").replace(/-/g, '/'));
                    var Date2 = new Date(expiredate.replace("T", " ").replace(/-/g, '/'));
                
                    if ((Date2 - Date1) < 0) {
                        $('#basicModal3').modal('hide');
                        
                        $("#msg_ppDatetxt").text('End Date should be greater than Start Date.');
                        $('#dialog-message-DateModel').modal('show');
                        return false;
                    }
                    else {
                        $('#basicModal3').modal('hide');
                        UpdateParkingPermit();
                    }
                }
                if ($("#hdnAddUpd").val() == "Add") {
                    
                    var Date1 = new Date(startdate.replace("-", ""));
                    var Date2 = new Date(expiredate.replace("-", ""));
                    if ((Date2 - Date1) < 0) {
                        $('#basicModal3').modal('hide');
                        $("#msg_ppDatetxt").text('End Date should be greater than Start Date.');
                        $('#dialog-message-DateModel').modal('show');
                        return false;
                    }
                   
                        $('#basicModal3').modal('hide');
                        AddParkingPermit();
                   
                }

            }
        });
    }
   
});
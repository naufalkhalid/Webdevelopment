var GridRepairRequest = function () {

    var ShowRepairRequests = function () {

        var table = $('#grdRepairRequest');

        var oTable = table.dataTable({
            "lengthMenu": [
                [10, 20, -1],
                [10, 20, "All"] // change per page values here
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

        var tableWrapper = $("#grdRepairRequest_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            ShowRepairRequests();
        }

    };

}();


$(document).ready(function () {

    
    GridRepairRequest.init();
    $("#ContentPlaceHolder1_rptRepairRequest_thSecActions").removeClass("sorting");

    if (window.location.href.indexOf("ViewRequest") > -1) 
        $("#chkClosedReq").attr("checked", true);
    else
        $("#chkClosedReq").attr("checked", false);
    
    

    function ClearFields() {

            $('span').closest('.form-group').removeClass('has-error');
            $('span').remove('.help-block');
            $('.alert-danger').hide();
            $('#txtProbDesc').val("");
            $('#phoneno').val("");
            $('#email').val("");
            $('#txtInstruction').val("");
        }

    function AddRepairRequest() {

        
            var RepaiCat = $("#SelRepCat option:selected").text();
            var ProbDesc = $('#txtProbDesc').val();
            var Urgency = $('input[name=radUrgency]:checked').val();
            var ContactNo = $('#phoneno').val();
            var Email = $('#email').val();
            var PermEnter = $('input[name=radPer]:checked').val();
            var Instruction = $('#txtInstruction').val();

            $.ajax({
                url: "RepairRequests.aspx/AddRepairRequest",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"RepaiCat":"' + RepaiCat + '","ProbDesc":"' + ProbDesc + '","Urgency":"' + Urgency + '","ContactNo":"' + ContactNo + '","Email":"' + Email + '","PermEnter":"' + PermEnter + '","Instruction":"' + Instruction + '"}',
                dataType: "json",
                success: OnAddSuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });
           

        }

        function OnAddSuccess(response) {

            if (response.d == 'False') {
                $('#dialog-form').modal('hide');
                $(".msgtext").text("Service Request is not submitted.");
                $('#dialog-message-Model').modal('show');
            }

            else {
                $('#dialog-form').modal('hide');
                $(".msgtext").text("Service Request is submitted successfully.");
                $('#dialog-message-Model').modal('show');
                $('#grdRepairRequest').dataTable().fnDestroy();
                $('#grdRepairRequest > tbody').append(response.d);
                GridRepairRequest.init();
                $("#ContentPlaceHolder1_rptRepairRequest_thSecActions").removeClass("sorting");
            }
        }

        function DeleteRepairRequest(RecordID) {
            $.ajax({
                url: "RepairRequests.aspx/DeleteRepairRequest",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"RecordID":"' + RecordID + '"}',
                dataType: "json",
                success: OnDeleteSuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }

        function OnDeleteSuccess(response) {

            switch (response.d) {
                case "True":
                    var serviceid = '#' + $("#hdnDelServ").val();
                    $(".msgtext").text("Service Request is deleted successfully.")
                    $('#dialog-message-Model').modal('show');
                    $('#grdRepairRequest').dataTable().fnDestroy();
                    $(serviceid).remove();
                    GridRepairRequest.init();
                    $("#ContentPlaceHolder1_rptRepairRequest_thSecActions").removeClass("sorting");
                    break;

                case "False":
                    $(".msgtext").text("Service Request is not deleted.");
                    $('#dialog-message-Model').modal('show');
                    break;
            }

        }

        function EditRepairRequest(RecordID) {

            var ReqNo = $('#hdnReqNo').val();
            var RepaiCat = $("#SelRepCat option:selected").text();
            var ProbDesc = $('#txtProbDesc').val();
            var RepairStatus = $("#SelStatus option:selected").text();
            var Urgency = $('input[name=radUrgency]:checked').val();
            var ContactNo = $('#phoneno').val();
            var Email = $('#email').val();
            var PermEnter = $('input[name=radPer]:checked').val();
            var Instruction = $('#txtInstruction').val();
            
            

            $.ajax({
                url: "RepairRequests.aspx/EditRepairRequest",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"ReqNo":"' + ReqNo + '","RepaiCat":"' + RepaiCat + '","ProbDesc":"' + ProbDesc + '","Urgency":"' + Urgency + '","ContactNo":"' + ContactNo + '","Email":"' + Email + '","PermEnter":"' + PermEnter + '","Instruction":"' + Instruction + '","RepairStatus":"' + RepairStatus + '","RecordID":"' + RecordID + '"}',
                dataType: "json",
                success: OnEditSuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });
           
        }

        function OnEditSuccess(response) {
            
            
            if(response.d == 'False')
            {
                $('#dialog-form').modal('hide');
                $(".msgtext").text("Service Request is not updated.");
                $('#dialog-message-Model').modal('show');
            }

            else
            {
                var serviceid = '#' + $("#hdnDelServ").val();
                $('#dialog-form').modal('hide');
                $(".msgtext").text("Service Request is updated successfully.");
                $('#dialog-message-Model').modal('show');
                $('#grdRepairRequest').dataTable().fnDestroy();
                $(serviceid).remove();
                $('#grdRepairRequest > tbody').append(response.d);
                GridRepairRequest.init();
                $("#ContentPlaceHolder1_rptRepairRequest_thSecActions").removeClass("sorting");
            }

        }

        function OnEditRepairRequestSuccess(response) {

            var objEditReq = JSON.parse(response.d);
            $.each(objEditReq, function (key, value) {

                $("#SelRepCat option:selected").text(value.RepCategory);
                $('#txtProbDesc').val(value.MaintenanceReq);
                
                $('[id=SelStatus] option').filter(function () {
                    return ($(this).text() == value.Status);
                }).prop('selected', true);
           
                if (value.Urgency == true) {
                    $('input:radio[name="radUrgency"][value=1]').parent('span').addClass('checked');
                    $('input:radio[name="radUrgency"][value=0]').closest('.checked').removeClass('checked');
                    $('input:radio[name="radUrgency"][value=0]').removeAttr('checked');
                }
                
                if (value.Urgency == false) {
                    $('input:radio[name="radUrgency"][value=0]').parent('span').addClass('checked');
                    $('input:radio[name="radUrgency"][value=1]').closest('.checked').removeClass('checked');
                    $('input:radio[name="radUrgency"][value=1]').removeAttr('checked');
                }

                
                if (value.EntrancePermission == true) {
                    $('input:radio[name="radPer"][value=1]').parent('span').addClass('checked');
                    $('input:radio[name="radPer"][value=0]').closest('.checked').removeClass('checked');
                    $('input:radio[name="radPer"][value=0]').removeAttr('checked');
                }

                if (value.EntrancePermission == false) {
                    $('input:radio[name="radPer"][value=0]').parent('span').addClass('checked');
                    $('input:radio[name="radPer"][value=1]').closest('.checked').removeClass('checked');
                    $('input:radio[name="radPer"][value=1]').removeAttr('checked');
                }

               
                $('#phoneno').val(value.ContactNo);
                $('#email').val(value.Email);
                $('#txtInstruction').val(value.Instructions);
                $('#hdnReqNo').val(value.ReqNo);
                $("#dialog-form").modal('show');
            });
        }

        function ValidateSecRequest() {
            var formSec = $('#form_Security');
            var error1 = $('.alert-danger', formSec);
            var success1 = $('.alert-success', formSec);

            
            formSec.validate({
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

                    SelRepCat: {
                        required: true
                    },

                    txtProbDesc: {
                        required: true
                    },
                    SelStatus: {
                        required: true
                    },

                    phoneno: {
                        required: true,
                        phoneno: true
                    },

                    email: {
                        required: true
                    },

                    txtInstruction: {
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
                    $('#dialog-form').modal('hide');
                    if ($("#hdnAddUpd").val() == "Add")
                    AddRepairRequest();
                    if ($("#hdnAddUpd").val() == "Update")
                    EditRepairRequest($("#hdnRecID").val());
                }
            });

        }
        $("#btnSubmitRepair").button().on("click", function () {
            
            ClearFields();
            $('#SelStatus').val("1");
            $('#SelStatus').attr("disabled", true);
            $("#dialog-form").modal('show');
            $("#hdnAddUpd").val("Add");
            
            
            
        });

        $("#btnSecSubmit").button().on("click", function () {
            ValidateSecRequest();
        });

        $("#chkClosedReq").click(function () {

            var UserID = $("#MainContent_hdnUserID").val();
            if ($("#chkClosedReq").is(':checked'))
                document.location = "RepairRequests.aspx?ViewRequest=Closed";
            else
                document.location = "RepairRequests.aspx";
        });

        $('#grdRepairRequest').on('click', '.delbutton', function (e) {

            var trid = $(this).closest('tr').attr('id'); // table row ID 
            $("#hdnDelServ").val(trid);
            $("#hdnRecID").val($(this).attr("id"));
            $('#deleteRepairModal').modal('show');
        });
       
        $('#grdRepairRequest').on('click', '.editbutton', function (e)
        {
            ClearFields();
            $("#hdnAddUpd").val("Update");
            $("#hdnRecID").val($(this).attr("id"));
            $('#SelStatus').attr("disabled", false);
            var RecID = $("#hdnRecID").val();
            
            $.ajax({
                url: "RepairRequests.aspx/GetEditRepairRecord",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"RecID":"' + RecID + '"}',
                dataType: "json",
                success: OnEditRepairRequestSuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });
            
        });

        $("#btnRepairYes").click(function () {
            DeleteRepairRequest($("#hdnRecID").val());
        });

});
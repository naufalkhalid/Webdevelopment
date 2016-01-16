

$("#btnFrontDeskInst").button().on("click", function () {
    //ClearFields();
    $("#dialog-form").modal('show');
    ClearFields();
});


function editFrontDeskInstr(id) {
    $("#dialog-form").modal('show');
    $('[id$=btnSubmitFrontDestInst]').val('Update');
    $('[id$=hfbtnSubmit]').val('Update');
    $.ajax({
        url: "FrontDeskInstructions.aspx/GetFrontDeskInstructionById",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"FDIid":"' + id + '"}',
        dataType: "json",
        success: OnFrontDeskInstructionByIdSuccess,
        failure: function (response) {
            //alert(response.d);
        }
    });
}
function OnFrontDeskInstructionByIdSuccess(response) {
    var objFrontDesk = JSON.parse(response.d);
    $.each(objFrontDesk, function (key, value) {
        $('[id$=txtEffectiveDate]').val(value.EffectiveDate);
        $('[id$=txtInstructions]').val(value.Instrcution);
        $('[id$=txtExpiresOn]').val(value.ExipresOn);
        $('[id$=hfFDIid]').val(value.FDIId);
        $('[id$=hfImageId]').val(value.ImageId);
        $('[id$=spanfilename]').text(value.ImageUrl);
        $('[id$=ImageForEdit]').prop({ src: '../../Resources/Images/' + value.ImageUrl });;

        // $('[id$=myFile]').val(value.ImageUrl);


    });
}

function ClearFields() {
    $('[id$=btnSubmitFrontDestInst]').val('Submit');
    $('[id$=txtEffectiveDate]').val("");
    $('[id$=txtInstructions]').val("");
    $('[id$=txtExpiresOn]').val("");
    $('[id$=hfbtnSubmit]').val('Submit');
    $('[id$=spanfilename]').text("");
    //$('[id$=ImageForEdit]').prop({ src: '' });;
}


//$(".btnSubmitFrontDestInst").click(function () {
//    //   $("#dialog-form").modal('show');
//    //$("#hdnAddUpd").val("Update");
//    //$("#hdnRecID").val($(this).attr("id"));
//    var ID = $("#hdnFDIid").val();
//    var EffectiveDate = $('#txtEffectiveDate').val();
//    var Instructions = $('#txtInstructions').val();
//    var ExpiresOn = $('#txtExpiresOn').val();
//    var myFile = $('#myFile').val();


//    $.ajax({
//        url: "FrontDeskInstructions.aspx/AddFrontDeskInstruction",
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        //data: '{"RecID":"' + RecID + '"}',
//        data: '{"ID":"' + ID + '","EffectiveDate":"' + EffectiveDate + '","Instructions":"' + Instructions + '","File":"' + myFile + '","ExpiresOn":"' + ExpiresOn + '"}',
//        dataType: "json",
//        success: OnAddFrontDeskInstructionSuccess,
//        failure: function (response) {
//            //alert(response.d);
//        }
//    });

//});


//$(".editFrontDeskInstr").click(function () {
//    $("#dialog-form").modal('show');
//    //$("#hdnAddUpd").val("Update");
//    //$("#hdnRecID").val($(this).attr("id"));
//    //var RecID = $("#hdnRecID").val();

//    //$.ajax({
//    //    url: "MyBuilding.aspx/GetEditRepairRecord",
//    //    type: "POST",
//    //    contentType: "application/json; charset=utf-8",
//    //    data: '{"RecID":"' + RecID + '"}',
//    //    dataType: "json",
//    //    success: OnEditFrontDeskInstrSuccess,
//    //    failure: function (response) {
//    //        //alert(response.d);
//    //    }
//    //});

//});

//function OnEditFrontDeskInstrSuccess(response) {

//    var objEditReq = JSON.parse(response.d);

//    $.each(objEditReq, function (key, value) {



//        $("#SelRepCat option:selected").text(value.RepCategory);
//        $('#txtProbDesc').val(value.MaintenanceReq);

//        if (value.Urgency)
//            $("input[name=radUrgency][value=true]").attr('checked', 'checked');
//        else
//            $("input[name=radUrgency][value=false]").attr('checked', 'checked');

//        $('#txtContactNo').val(value.ContactNo);
//        $('#email').val(value.Email);
//        $('input[name=radPer]').val(value.EntrancePermission);
//        $('#txtInstruction').val(value.Instructions);
//    });
//}
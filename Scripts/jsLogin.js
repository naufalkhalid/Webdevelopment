$(document).ready(function () {

function validateUser() {
    document.getElementById('errormessage').style.display = 'none';
    document.getElementById('errormessage2').style.display = 'none';
    //alert('hi');
    var txtusername = document.getElementById("txtusername").value;
    var txtpassword = document.getElementById("txtpassword").value;

    if (txtusername == "" || txtpassword == "") {
        document.getElementById('errormessage').style.display = 'block';
        return false;
    }
    $.ajax({
        url: "Login.aspx/LoginInfo",
        type: "POST",
        beforeSend: function (response) {
            $('#loadingmessage').show();
        },
        contentType: "application/json; charset=utf-8",
        data: '{"UserName":"' + txtusername + '","Password":"' + txtpassword + '"}',
        dataType: "json",
        success: OnLoginSuccess,
        complete: function (response) {
            $('#loadingmessage').hide();
        },
        failure: function (response) {
            //alert(response.d);
        }
    });
    return false;
    //dialog.dialog("close");
}

//$("#btnLogin").click(function () {
//    alert('asd');
//});
function OnLoginSuccess(response) {

    switch (response.d) {
        case "False":
            document.getElementById('errormessage2').style.display = 'block';
            break;
        default:
            //document.location = "../../RepairRequests.aspx";
            document.location = response.d;
            //window.location = response;
            break;

    }
}
});
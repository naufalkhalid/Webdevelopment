var GridMyClaims = function () {

    var ShowMyClaims = function () {

        var table = $('#grdClaims');

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

        var tableWrapper = $("#grdClaims_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            ShowMyClaims();
        }

    };

}();

$(document).ready(function () {

GridMyClaims.init();
$("#btnCheckIncident").click(function () {
    
    var IncidentNo = $("#txtIncidentNo").val();
    

    $.ajax({
        url: "CheckClaim.aspx/GetClaimByIncidentNo",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"IncidentNo":"' + IncidentNo + '"}',
        dataType: "json",
        success: OnClaimSuccess,
        failure: function (response) {
            //alert(response.d);
        }
    });
   
});

function OnClaimSuccess(response) {


    var newRowContent = "";
    var objClaim = JSON.parse(response.d);
    $.each(objClaim, function (key, value) {
        
        newRowContent = "<tr>";
        newRowContent = newRowContent + "<td>" + value.CreatedDate + "</td>";
        newRowContent = newRowContent + "<td>" + value.IncidentNo + "</td>";
        newRowContent = newRowContent + "<td>3445</td>";
        newRowContent = newRowContent + "<td>3445</td>";
        newRowContent = newRowContent + "<td>3445</td>";
        newRowContent = newRowContent + "<td>3445</td>";
        newRowContent = newRowContent + "<td>3445</td>";
        newRowContent = newRowContent + "<td>3445</td>";
        newRowContent = newRowContent + "<td>Pending</td>";
    });
    newRowContent = newRowContent + "</tr>";
    $('#grdClaims').dataTable().fnDestroy();
    $("#grdClaims tbody").append(newRowContent);
    GridMyClaims.init();
}
});
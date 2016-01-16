
$(document).ready(function () {

    FillPosts();
    
    function FillPosts() {

        $("#SelectCategory").empty();
        $("#SelectCategory").append("<option value=-1>------Select------</option>");
        $.ajax({
            url: "CommunityCalendar.aspx/GetPostsCategory",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnPostsSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }
function OnPostsSuccess(response) {

     
    
    $("#divLegends").append("<h4>Legends</h4>");
    var jsPosts = JSON.parse(response.d);
    if (jsPosts.length > 0)
        $("#SelectCategory").append("<option value=0>All</option>");

        $.each(jsPosts, function (key, value) {

            $('#SelectCategory').append($("<option></option>").val(value.ID).html(value.Title));
            $("#divLegends").append("<div class=clearfix></div>");
            $("#divLegends").append("<span style='display:inline-block; width:23px; height:13px; background-color:" + value.EventColor + ";'></span>");
            $("#divLegends").append("<p style=display:inline-block;>&nbsp;" + value.Title + "</p>");
        });
        $("#divLegends").append("<div class=clearfix></div>");
        DisplayCalendar();
}

function DisplayCalendar() {
    
        $('#divcommunitycalendar').fullCalendar('destroy');
        $('#divcommunitycalendar').fullCalendar({
            events: 'HandlerCommCalendar.ashx?Category=' + $("#SelectCategory").val() + '',
            eventClick: function (calEvent, jsEvent, view) {
              
            },
            dayClick: function (date, jsEvent, view) {
                // change the day's background color just for fun
            }
        });
    }
$("#SelectCategory").change(function () {
        
        DisplayCalendar();
    });
$("#btnManagePosts").click(function () {
    document.location = "ManagePosts.aspx";
});
});
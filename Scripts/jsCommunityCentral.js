
function SearchCommunityCentral(search) {
    var formData = new FormData();
    formData.append('UserId', $("[id$=hfuserid]").val());
    formData.append('SortBy', search);
    formData.append('Criteria', 'Search');

    $.ajax(
              {
                  url: "CommunityCentral.ashx",
                  type: 'POST',
                  cache: false,
                  processData: false,
                  contentType: false,
                  data: formData,
                  progress: function (evt) { },
                  beforeSend: function (e) { callloader(); },
                  success: OnCommunityCentralSuccess,
                  error: function (e) { }
              });
}
function callloader() {
    $('#loadingmessage').show();
}
function LoadCommunityCentral(sortby) {
    var formData = new FormData();
    formData.append('UserId', $("[id$=hfuserid]").val());
    formData.append('SortBy', sortby);
    formData.append('Criteria', 'Sorting');
    //formData.append('moreaboutme', JSON.stringify(moreaboutme));
    //formData.append('Email', JSON.stringify(Email));

    $.ajax(
              {
                  url: "CommunityCentral.ashx",
                  type: 'POST',
                  cache: false,
                  processData: false,
                  contentType: false,
                  data: formData,
                  complete: function () { },
                  progress: function (evt) { },
                  beforeSend: function (e) { callloader(); },
                  success: OnCommunityCentralSuccess,
                  error: function (e) { }
              });
}

function OnCommunityCentralSuccess(response) {
    $('#divCommCentralForControl').html(response);
    $('.moreaboutme').hide();
    $('.workinfo').hide();
    $('.recreationinfo').hide();
    $('.favorites').hide();
    $('#loadingmessage').hide();

}
$('#chkbxcontactinfo').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        $('.contactinfo').show();
    } else {
        // the checkbox was unchecked
        $('.contactinfo').hide();
    }
});
$('#chkbxmoreaboutme').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        $('.moreaboutme').show();


    } else {
        // the checkbox was unchecked
        $('.moreaboutme').hide();
    }
});
$('#chkbxworkinfo').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        $('#chkbxmoreaboutme').parent().addClass('checked');
        $('.moreaboutme').show();
        $('.workinfo').show();
    } else {
        // the checkbox was unchecked
        $('.workinfo').hide();
    }
});
$('#chkbxrecreation').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        $('#chkbxmoreaboutme').parent().addClass('checked');
        $('.moreaboutme').show();
        $('.recreationinfo').show();
    } else {
        // the checkbox was unchecked
        $('.recreationinfo').hide();
    }
});
$('#chkbxfavourites').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        $('#chkbxmoreaboutme').parent().addClass('checked');
        $('.moreaboutme').show();
        $('.favorites').show();
    } else {
        // the checkbox was unchecked
        $('.favorites').hide();
    }
});
//
$('#chkbxfirstname').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        LoadCommunityCentral('FirstName');
    }
});
$('#chkbxlastname').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        LoadCommunityCentral('LastName');
    }
});
$('#chkbxunitno').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        LoadCommunityCentral('Unit');
    }
});
$('#chkbxshowrecentlyupdated').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        if ($('#chkbxfirstname').parent().attr('class') == 'checked')
            LoadCommunityCentral('RecentFirstName');
        else if ($('#chkbxlastname').parent().attr('class') == 'checked')
            LoadCommunityCentral('RecentLastName');
        else
            LoadCommunityCentral('RecentUnit');
    }
});
$('#chkbxshowfriends').click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        // the checkbox was checked 
        if ($('#chkbxfirstname').parent().attr('class') == 'checked')
            LoadCommunityCentral('FriendsFirstName');
        else if ($('#chkbxlastname').parent().attr('class') == 'checked')
            LoadCommunityCentral('FriendsLastName');
        else
            LoadCommunityCentral('FriendsUnit');
    }
});
$('#btnclear').button().click(function () {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    // the checkbox was checked 
    $('#chkbxfirstname').parent().removeClass('checked');
    $('#chkbxlastname').parent().removeClass('checked');
    $('#chkbxunitno').parent().removeClass('checked');

    $('#chkbxshowfriends').parent().removeClass('checked');
    $('#chkbxshowrecentlyupdated').parent().removeClass('checked');
    $('#btnsearchtext').val("");

    $('#chkbxcontactinfo').parent().removeClass('checked');
    $('#chkbxmoreaboutme').parent().removeClass('checked');
    $('#chkbxworkinfo').parent().removeClass('checked');
    $('#chkbxrecreation').parent().removeClass('checked');
    $('#chkbxfavourites').parent().removeClass('checked');

    $('#chkbxcontactinfo').parent().addClass('checked');
    $('#chkbxfirstname').parent().addClass('checked');
    LoadCommunityCentral('FirstName');
});


$('#btnsearch').button().click(function () {
    var $this = $(this);
    var search = $('#btnsearchtext').val();
    SearchCommunityCentral(search);
});


function addremoveasfriend(_this) {
    var id = $(_this).parent().find('span')[0].innerText;
    var frienduserid = $(_this).parent().find('span')[1].innerText;
    var Friend = {
        ID: id,
        FriendsUserId: frienduserid,
    }

    $.ajax({
        url: "CommunityCentral.aspx/AddRemoveAsFriend",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{Friend:" + JSON.stringify(Friend) + "}",
        beforeSend: function (e) { callloader(); },
        dataType: "json",
        success: function (respose) {
            OnAddRemoveAsFriendSuccess(respose, $(_this));
        },
        failure: function (response) {
            //alert(response.d);
        },
        complete: function (respose) {
            $('#loadingmessage').hide();
        }
    });
    return false;
}


function OnAddRemoveAsFriendSuccess(response, _this) {

    var data = JSON.parse(response.d);
    if (data != null) {
        $(_this).parent().find('span')[1].innerText = data[0].ID;
        if ($(_this).text() == "Add As Friend") {
            $(_this).text("Remove As Friend");
            $("#msgCommunityCentral").text("Now You are Friends.");
            $('#dialog-CommunityCentral').modal('show');
        }
        else if ($(_this).text() == "Remove As Friend") {
            $(_this).text("Add As Friend");
            $("#msgCommunityCentral").text("Now You are NOT Friends.");
            $('#dialog-CommunityCentral').modal('show');
        }


    }
    else {
        $("#msgCommunityCentral").text("Please Try Again.");
        $('#dialog-CommunityCentral').modal('show');
    }

}

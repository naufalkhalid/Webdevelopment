function callonreadyPublicProfile() {

    $.ajax({
        url: "MyPublicProfileMain.aspx/GetIsPublicProfileAcive",
        type: "POST",
        beforeSend: function (e) { callloader(); },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnGetIsPublicProfileAciveSuccess,
        complete: function (respose) {
            $('#loadingmessage1').hide();
        },
        failure: function (response) {
            //alert(response.d);
        }
    });


    $('#btnEditActivateMyPublicProfile').button().on('click', function () {
        $('#PublicProfileModeTwo').removeAttr('style')
        $('#PublicProfileModeOne').attr('style', 'display:none');
    });
    $('#btnEditActivateMyPublicProfileCancel').button().on('click', function () {
        $('#PublicProfileModeTwo').attr('style', 'display:none')
        $('#PublicProfileModeOne').attr('style', 'display:block');
    });
    $('#btnEditActivateMyPublicProfileCancelTwo').button().on('click', function () {
        $('#PublicProfileModeTwo').attr('style', 'display:none')
        $('#PublicProfileModeOne').attr('style', 'display:block');
    });
    $('#btnActivateMyPublicProfile').button().on('click', function () {

        $.ajax({
            url: "MyPublicProfileMain.aspx/UpdateIsPublicProfileAcive",
            type: "POST",
            beforeSend: function (e) { callloader(); },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnUpdateIsPublicProfileAcive,
            failure: function (response) {
                //alert(response.d);
            },
            complete: function (respose) {
                $('#loadingmessage1').hide();
            }

        });
    });

    $('#btnMyPublicProfileSave').button().on('click', function () {
        savePublicProfile();
    });
    $('#btnMyPublicProfileSaveTwo').button().on('click', function () {
        savePublicProfile();
    });
    //Links
    $('#btnsavenewlink').button().on('click', function () {
        var title = $('#txttitle').val()
        var url = $('#txturl').val()
        var linkid = $('#hflinkdid').val();
        var Links = {
            Title: title,
            URL: url,
            ID: linkid
        };
        $.ajax({
            url: "MyPublicProfileMain.aspx/AddUpdateBasicUserLinks",
            type: "POST",
            beforeSend: callloader,
            contentType: "application/json; charset=utf-8",
            data: '{"title":"' + title + '","url":"' + url + '","linkid":"' + linkid + '"}',
            dataType: "json",
            success: OnAddUpdateBasicUserLinksSuccess,
            failure: function (response) {
                //alert(response.d);
            },
            complete: function () {
                $('#loadingmessage1').hide();
                $('#btnsavenewlink').val('Save New Link');
            }
        });
    });
    function callloader() {
        $('#loadingmessage1').show();
    }
}
function OnGetIsPublicProfileAciveSuccess(response) {
    var data = $.parseJSON(response.d);
    var isactive = data[0];
    if (isactive) {
        var customprofile = data[1][0];
        var moreaboutme = data[2][0];
        var links = data[3];
        var friends = data[4];
        var image = data[5][0];
        var Email = data[6];
        $('#isPublicProfileMsg').html("<b>Your Public Profile is Active</b><br />The Inforamtion you've entered into your Public Profile below will be visible to other residents.");
        $('#isPublicProfileMsg').parent().removeClass('note note-danger');
        $('#isPublicProfileMsg').parent().addClass('note note-success');
        $('#btnEditActivateMyPublicProfile').removeClass('btn grey');
        $('#btnEditActivateMyPublicProfile').addClass('btn green');
        $('#btnMyPublicProfileSave').removeAttr('style');
        $('#btnMyPublicProfileSave').attr('style', 'display:block');
        $('#btnMyPublicProfileSave').attr('style', 'float:right');

        $('#isPublicProfileMsgTwo').html("<b>Your Public Profile is Active</b><br />The Inforamtion you've entered into your Public Profile below will be visible to other residents.");
        $('#isPublicProfileMsgTwo').removeClass('note note-danger');
        $('#isPublicProfileMsgTwo').addClass('note note-success');
        $('#btnActivateMyPublicProfile').removeClass('btn green');
        $('#btnActivateMyPublicProfile').addClass('btn red');
        $('#btnActivateMyPublicProfile').text('Diactivate My Public Profile');

        if ($(customprofile).length > 0) {
            loadcustomprofile(customprofile);
        }
        if ($(image).length > 0) {
            loadimage(image);
        }
        //more about me
        if ($(moreaboutme).length > 0) {
            loadmoreaboutme(moreaboutme);
        }
        //Add links
        loadLinks(links);
        //Email
        loadEmail(Email);
    }
    else {
        $('#divMainPublicProfileTwo').css('display', 'none');
        $('#divMainPublicProfile').css('display', 'none');
    }
}


function OnUpdateIsPublicProfileAcive(response) {
    var data = $.parseJSON(response.d);
    var isactive = data[0];

    if (isactive) {
        if ($('#btnActivateMyPublicProfile').text() == 'Diactivate My Public Profile') {
            $('#btnActivateMyPublicProfile').text('Activate My Public Profile')
            $('#btnActivateMyPublicProfile').removeClass('btn red');
            $('#btnActivateMyPublicProfile').addClass('btn green');
            $('#isPublicProfileMsgTwo').html("<b>My Public Profile is Inactive</b><br /> Your Public Profile is inactive and its are NOT visible to ANY other residents including your Friends in the building");
            $('#isPublicProfileMsgTwo').removeClass('note note-success');
            $('#isPublicProfileMsgTwo').addClass('note note-danger');

            $('#btnMyPublicProfileSave').removeAttr('style');
            $('#btnMyPublicProfileSave').attr('style', 'display:none');
            //upper msg
            $('#isPublicProfileMsg').html("<b>My Public Profile is Inactive</b><br /> Your Public Profile is inactive and its are NOT visible to ANY other residents including your Friends in the building");
            $('#isPublicProfileMsg').parent().removeClass('note note-success');
            $('#isPublicProfileMsg').parent().addClass('note note-danger');
            $('#btnEditActivateMyPublicProfile').removeClass('btn green');
            $('#btnEditActivateMyPublicProfile').addClass('btn grey');

            $('#divMainPublicProfileTwo').css('display', 'none');
            $('#divMainPublicProfile').css('display', 'none');
            $("#msgPublicProfile").text("Public Profile Deactivate Sucessfully.");

            $('#dialog-PublicProfile').modal('show');
        }
        var customprofile = data[1][0];
        var moreaboutme = data[2][0];
        var links = data[3];
        var friends = data[4];
        var image = data[5][0];
        var Email = data[5];
        if ($(customprofile).length > 0) {
            loadcustomprofile(customprofile);
        }
        if ($(image).length > 0) {
            loadimage(image);
        }
        //more about me
        if ($(moreaboutme).length > 0) {
            loadmoreaboutme(moreaboutme);
        }
        //Add links
        loadLinks(links);
        //Email
        loadEmail(Email);

    }
    else if (!isactive) {
        $('#btnActivateMyPublicProfile').text('Diactivate My Public Profile')
        $('#btnActivateMyPublicProfile').removeClass('btn green');
        $('#btnActivateMyPublicProfile').addClass('btn red');
        $('#isPublicProfileMsgTwo').html("<b>Your Public Profile is Active</b><br />The Inforamtion you've entered into your Public Profile below will be visible to other residents.");
        $('#isPublicProfileMsgTwo').removeClass('note note-danger');
        $('#isPublicProfileMsgTwo').addClass('note note-success');
        $('#btnMyPublicProfileSave').removeAttr('style');
        $('#btnMyPublicProfileSave').attr('style', 'display:block');
        $('#btnMyPublicProfileSave').attr('style', 'float:right');
        //upper msg
        $('#isPublicProfileMsg').html("<b>Your Public Profile is Active</b><br />The Inforamtion you've entered into your Public Profile below will be visible to other residents.");
        $('#isPublicProfileMsg').parent().removeClass('note note-danger');
        $('#isPublicProfileMsg').parent().addClass('note note-success');
        $('#btnEditActivateMyPublicProfile').removeClass('btn grey');
        $('#btnEditActivateMyPublicProfile').addClass('btn green');

        $('#divMainPublicProfileTwo').css('display', '');
        $('#divMainPublicProfile').css('display', '');
        $("#msgPublicProfile").text("Public Profile Activate Sucessfully.");
        $('#dialog-PublicProfile').modal('show');
    }
    else {
        $("#msgPublicProfile").text("Profile Status Not changed please try again....");
        $('#dialog-PublicProfile').modal('show');
    }
}

function OnUploadImageSuccess(response) {
    $('#loadingmessage1').hide();
    //div sucessfuly updated
    if (response == 'UnSuccessful') {
        $("#msgPublicProfile").text("Public Profile Not Updated Sucessfully.");
        $('#dialog-PublicProfile').modal('show');
    }
    else {
        $("#msgPublicProfile").text("Public Profile Updated Sucessfully.");
        $('#dialog-PublicProfile').modal('show');
    }
}


function OnAddUpdateBasicUserLinksSuccess(response) {
    if (response.d == "False")
        alert("Link is Not Added/Updated Sucessfully...");
    else {
        loadLinks(response.d);
        //$('#AllLinks').html(response.d);
        //$('#txttitle').val('');
        //$('#txturl').val('');
        //$('#hflinkdid').val('0');
        //$('#btnsavenewlink').val('Save New Link');
        //var table = $('#editlinks');

        //table.on('click', '.editlink', function (e) {
        //    e.preventDefault();
        //    var nRow = $(this).parents('tr');
        //    var tds = $('td', nRow);
        //    var a = $('a', tds[2]);

        //    $('#btnsavenewlink').focus();
        //    $('#txttitle').val(tds[1].innerHTML);
        //    $('#txturl').val(a.text());
        //    $('#hflinkdid').val(tds[0].innerHTML);
        //    $('#btnsavenewlink').val('Update Links');
        //});
        //table.on('click', '.deletelink', function (e) {
        //    e.preventDefault();
        //    var nRow = $(this).parents('tr');
        //    var tds = $('td', nRow);
        //    var a = $('a', tds[2]);

        //    if (confirm('Are To sure to Delete Link?')) {

        //        $.ajax({
        //            url: "MyPublicProfileMain.aspx/DeleteBasicUserLinks",
        //            type: "POST",
        //            beforeSend: callloader,
        //            contentType: "application/json; charset=utf-8",
        //            data: '{"linkid":"' + tds[0].innerHTML + '"}',
        //            dataType: "json",
        //            success: OnDeleteBasicUserLinksSuccess,
        //            failure: function (response) {
        //                //alert(response.d);
        //            },
        //            complete: function () {
        //                $('#loadingmessage1').hide();
        //                $('#btnsavenewlink').val('Save New Link');
        //            }
        //        });
        //    }
        //});
    }
}
function OnDeleteBasicUserLinksSuccess(response) {
    if (response.d == "False") {
        $("#msgPublicProfile").text("Link is Not Deleted Sucessfully...");
        $('#dialog-PublicProfile').modal('show');
    } else {
        loadLinks(response.d);
        $("#msgPublicProfile").text("Link is Deleted Sucessfully...");
        $('#dialog-PublicProfile').modal('show');
    }
}

function loadcustomprofile(customprofile) {

    if (customprofile.DisplayUnit == null || customprofile.DisplayUnit == false) {
        $('#rbnityes').parent().removeClass('checked');
        $('#rbnitno').parent().addClass('checked');
    }
    else {
        $('#rbnitno').parent().removeClass('checked');
        $('#rbnityes').parent().addClass('checked');
    }
    $('#labelqthree').text(customprofile.Unit);
    $('#selectqone').val(customprofile.NameForFriends);
    $('#selectqtwo').val(customprofile.NameForNeighbors);

    $('#selectpp').val(customprofile.ToShowProfilePhoto);
    $('#selectci').val(customprofile.ToShowCustomProfile);
    $('#selectmoreaboutme').val(customprofile.ToShowMoreAboutMe);
    $('#selectlinks').val(customprofile.ToShowLinks);
    $('#selectfrds').val(customprofile.ToShowFriends);

    switch (customprofile.NameForNeighbors) {
        case null:
            $('#labelqtwo').text(customprofile.FirstName + '   ' + customprofile.LastName);
            break;
        case '0':
            $('#labelqtwo').text(customprofile.FirstName + '   ' + customprofile.LastName);
            break;
        case '1':
            $('#labelqtwo').text(customprofile.LastName + '   ' + customprofile.FirstName);
            break;
        case '2':
            $('#labelqtwo').text(customprofile.FirstName);
            break;
        case '3':
            $('#labelqtwo').text(customprofile.LastName);
            break;
        default:
            $('#labelqtwo').text(customprofile.FirstName + '   ' + customprofile.LastName);
            break;
    }

    switch (customprofile.NameForFriends) {
        case null:
            $('#labelqone').text(customprofile.FirstName + '   ' + customprofile.LastName);
            break;
        case '0':
            $('#labelqone').text(customprofile.FirstName + '   ' + customprofile.LastName);
            break;
        case '1':
            $('#labelqone').text(customprofile.LastName + '   ' + customprofile.FirstName);
            break;
        case '2':
            $('#labelqone').text(customprofile.FirstName);
            break;
        case '3':
            $('#labelqone').text(customprofile.LastName);
            break;
        default:
            $('#labelqone').text(customprofile.FirstName + '   ' + customprofile.LastName);
            break;
    }

    $('#txtemail').val("");
    $('#txthomephone').val(customprofile.HomePhoneNumber);
    $('#txtcellphone').val(customprofile.CellPhone);
    $('#txtworkphone').val(customprofile.WorkPhone);
    $('#txtinstancemessager').val(customprofile.InstanceMessage);
    if (customprofile.ImageId != null)
        $("#hfimageid").val(customprofile.ImageId);
}
function loadimage(image) {
    $("#hfimageid").val(image.ImageId);
    $('#divProfilePicture').html('<img src =\'' + image.ImageUrl + '\'/>');

    var _divPP = $('#PublicProfile a')
    _divPP.removeClass('fileinput-exists')
}
function loadmoreaboutme(moreaboutme) {
    $('#selectgender').val(moreaboutme.Gender);
    $('#selectrelationship').val(moreaboutme.RelationshipStatus);
    $('#selectdob').val(moreaboutme.ToShowDateOfBirth);
    $('[id$=txtdob]').val(moreaboutme.DateOfBirth);

    $('#txtmyhometown').text(moreaboutme.MyHomeTown);
    $('#txtschoolattented').text(moreaboutme.SchoolIAttented);
    $('#txtmoreaboutme').text(moreaboutme.MoreAboutMe);

    $('#txttypeofworkido').text(moreaboutme.TypeofworkIdo);
    $('#txtwhereiwork').text(moreaboutme.WhereIwork);
    $('#txtcompanyiworkfor').text(moreaboutme.CompanyIworkfor);
    $('#txtcontactcompanyneed').text(moreaboutme.Contact);

    $('#txtinterests').text(moreaboutme.Interests);
    $('#txtlanguage').text(moreaboutme.Language);
    $('#txtvacationspots').text(moreaboutme.VacationSpots);
    $('#txtalsotravelledto').text(moreaboutme.AlsoTraveledTo);
    $('#txtclubs').text(moreaboutme.ClubsOrganizations);

    $('#txtfavrestaurants').text(moreaboutme.FavRestaurants);
    $('#txtfavmovies').text(moreaboutme.FavMovies);
    $('#txtfavbooks').text(moreaboutme.FavBooks);
    $('#txtfavmusic').text(moreaboutme.FavBooks);
}
function loadLinks(links) {
    $('#btnsavenewlink').val('Save New Link');
    $('#AllLinks').html(links);
    $('#txttitle').val('');
    $('#txturl').val('');
    $('#hflinkdid').val('0');
    var table = $('#editlinks');

    table.on('click', '.editlink', function (e) {
        e.preventDefault();
        var nRow = $(this).parents('tr');
        var tds = $('td', nRow);
        var a = $('a', tds[2]);

        $('#btnsavenewlink').focus();
        $('#txttitle').val(tds[1].innerHTML);
        $('#txturl').val(a.text());
        $('#hflinkdid').val(tds[0].innerHTML);
        $('#btnsavenewlink').val('Update Links');
    });
    table.on('click', '.deletelink', function (e) {
        e.preventDefault();
        var nRow = $(this).parents('tr');
        var tds = $('td', nRow);
        var a = $('a', tds[2]);

        if (confirm('Are To sure to Delete Link?')) {

            $.ajax({
                url: "MyPublicProfileMain.aspx/DeleteBasicUserLinks",
                type: "POST",
                beforeSend: function (e) {
                    $('#loadingmessage1').show();
                },
                contentType: "application/json; charset=utf-8",
                data: '{"linkid":"' + tds[0].innerHTML + '"}',
                dataType: "json",
                success: OnDeleteBasicUserLinksSuccess,
                failure: function (response) {
                    //alert(response.d);
                },
                complete: function () {
                    $('#loadingmessage1').hide();
                }
            });
        }
    });
}
function loadEmail(Email) {
    $('#txtemail').val(Email);
}

function savePublicProfile() {
    var displaunit = false;
    if ($('#rbnityes').parent().attr('class') == "checked")
        displaunit = true;
    var Email = $('#txtemail').val();
    var customprofile = {

        HomePhoneNumber: $('#txthomephone').val(),
        CellPhone: $('#txtcellphone').val(),
        WorkPhone: $('#txtworkphone').val(),
        InstanceMessage: $('#txtinstancemessager').val(),
        DisplayUnit: displaunit,
        NameForFriends: $('#selectqone').val(),
        NameForNeighbors: $('#selectqtwo').val(),
        ToShowCustomProfile: $('#selectci').val(),
        ToShowMoreAboutMe: $('#selectmoreaboutme').val(),
        ToShowDateOfBirth: $('#selectdob').val(),
        ToShowLinks: $('#selectlinks').val(),
        ToShowFriends: $('#selectfrds').val(),
        ToShowProfilePhoto: $('#selectpp').val()
    };
    var moreaboutme = {
        Gender: $('#selectgender').val(),
        RelationshipStatus: $('#selectrelationship').val(),
        ToShowDateOfBirth: $('#selectdob').val(),
        DateOfBirth: $('[id$=txtdob]').val(),

        MyHomeTown: $('#txtmyhometown').text(),
        SchoolIAttented: $('#txtschoolattented').text(),
        MoreAboutMe: $('#txtmoreaboutme').text(),

        TypeofworkIdo: $('#txttypeofworkido').text(),
        WhereIwork: $('#txtwhereiwork').text(),
        CompanyIworkfor: $('#txtcompanyiworkfor').text(),
        Contact: $('#txtcontactcompanyneed').text(),

        Interests: $('#txtinterests').text(),
        Language: $('#txtlanguage').text(),
        VacationSpots: $('#txtvacationspots').text(),
        AlsoTraveledTo: $('#txtalsotravelledto').text(),
        ClubsOrganizations: $('#txtclubs').text(),

        FavRestaurants: $('#txtfavrestaurants').text(),
        FavMovies: $('#txtfavmovies').text(),
        FavBooks: $('#txtfavbooks').text(),
        FavMusic: $('#txtfavmusic').text()
    }
    var formData = new FormData();
    formData.append('UserId', $("[id$=hfuserid]").val());
    if ($('#divProfilePicture img').length > 0)
        formData.append('ImageExists', true);
    else
        formData.append('ImageExists', false);
    formData.append('file', $('#profileimage')[0].files[0]);
    formData.append('customprofile', JSON.stringify(customprofile));
    formData.append('moreaboutme', JSON.stringify(moreaboutme));
    formData.append('Email', JSON.stringify(Email));
    $.ajax(
          {
              url: "UploadImage.ashx",
              type: 'POST',
              cache: false,
              processData: false,
              contentType: false,
              data: formData,
              complete: function (e) { $('#loadingmessage1').hide(); },
              progress: function (evt) { },
              beforeSend: function (e) { $('#loadingmessage1').show(); },
              success: OnUploadImageSuccess,
              error: function (e) { }
          });

}

$(document).ready(function () {

    var ids = new Array();
    function LoadPrivileges() {
        var userID = $('#userId').val();
        alert(userID);
        $.ajax({
            url: "Previlages.aspx/LoadPrivileges",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{'userId':'" + userID + "'}",
            dataType: "json",
            success: LoadPrivilegesuccess,
            failure: function (response) {
                alert(response.d);
            }

        });
    }
    function LoadPrivilegesuccess(response) {
       
        $("#rptr_body input[type=checkbox]").parent().removeClass("checked");
        $("#rptr_body input[type=checkbox]").removeAttr("checked");
        if (response.d == "[]") {
            $("#addupdate").val("0");
            $("#addPrivileges").text("Add Privileges");
            disableAll();
            $("#rptr_body input[type=checkbox]").parent().removeClass("checked");
            $("#rptr_body input[type=checkbox]").removeAttr("checked");
           
            $("#privileges").css("display", "block");
        }
        else {
            alert(response.d);
            $("#rptr_body input[type=checkbox]").parents().removeClass("disabled");
            $("#rptr_body input[type=checkbox]").removeAttr("disabled");
            var objEditPre = JSON.parse(response.d);

            $.each(objEditPre, function (key, value) {
               
                ids.push(value.PrivilegeId);
            
               
              
                if (value.menuid)
                {
                    $("#tb" + value.menuid)[0].checked = value.menuid;
                    $("#tb" + value.menuid).parent().addClass("checked");
                }
                if (value.submenuid)
                {
                    $("#" + value.submenuid)[0].checked = value.submenuid;
                    $("#" + value.submenuid).parent().addClass("checked");
                }
                    if (value.IsAdd) {
                        $("#Add" + value.submenuid)[0].checked = value.IsAdd;
                        $("#Add" + value.submenuid).parent().addClass("checked");
                    }
                    if (value.IsUpdate) {
                        $("#Update" + value.submenuid)[0].checked = value.IsUpdate;
                        $("#Update" + value.submenuid).parent().addClass("checked");
                    } if (value.IsDelete) {
                        $("#Delete" + value.submenuid)[0].checked = value.IsDelete;
                        $("#Delete" + value.submenuid).parent().addClass("checked");
                    } if (value.IsView) {
                        $("#View" + value.submenuid)[0].checked = value.IsView;
                        $("#View" + value.submenuid).parent().addClass("checked");
                    }
                    
                    if(value.IsAdd && value.IsUpdate && value.IsDelete && value.IsView)
                    {
                        $("#All" + value.submenuid)[0].checked = value.IsView;
                        $("#All" + value.submenuid).parent().addClass("checked");
                    }
            });
            $("#addupdate").val("1");
          
            $("#privileges").css("display", "block");
            $("#addPrivileges").text("Update Privileges");
        }
    }
    
    function disableAll() {

        $(".checkbox1").attr('disabled', "disabled");
        $(".checkbox1").parents().addClass("disabled");
        $(".checksubmenus").attr('disabled', "disabled");
        $(".checksubmenus").parents().addClass("disabled");
        $(".chckall").attr('disabled', "disabled");
        $(".chckall").parents().addClass("disabled");
    }
    $("#addPrivileges").click(function () {
       
     var addupdateid = $("#addupdate").val();
       
        $(".submenu_row").each(function () {
         
            if ($(this).find(".checksubmenus:checked").size() > 0) {
                
                var userid = $('#userId').val();

                var submenuid = $(this).find(".checksubmenus:checked").attr("id");
                var rights = "";
                $(this).find(".checkbox1:checked").each(function () {
                    rights += this.value + ";";

                });
                
                $.ajax({
                    url: "Previlages.aspx/InsertRights",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: "{'Ids':'" + ids + "','AddUpdateId':'" + addupdateid + "','submenuId':'" + submenuid + "','rights':'" + rights + "','UserId':'" + userid + "'}",
                    dataType: "json",
                    success: InsertPrivilegesuccess,
                    failure: function (response) {
                        alert(response.d);
                    }

                });

            }
        });

    });
    function InsertPrivilegesuccess() {

        ids.pop();
  
    }
    $(".checkbox1").click(function (event) {

        if ($(".chckall").is(":checked")) {
            var tr = $($(this).parents("tr")[0]);
            tr.find(".chckall").removeAttr('checked', "checked");
            tr.find(".chckall").parent().removeClass("checked");

        }


    });
    $(".checksubmenus").click(function () {
        var tr = $($(this).parents("tr")[0]);
        if (this.checked) {
            tr.find(".checkbox1").prop('disabled', false);
            tr.find(".checkbox1").parents().removeClass("disabled");

            tr.find(".chckall").prop('disabled', false);
            tr.find(".chckall").parents().removeClass("disabled");

        }
        else {

            tr.find(".checkbox1").prop('disabled', true);
            tr.find(".checkbox1").parents().addClass("disabled");

            tr.find(".chckall").prop('disabled', true);
            tr.find(".chckall").parents().addClass("disabled");
            tr.find(".checkbox1").prop('checked', false);
            tr.find(".checkbox1").parents().removeClass("checked");
            tr.find(".chckall").prop('checked', false);
            tr.find(".chckall").parents().removeClass("checked");
        }
        //if ($(this).parent().hasClass("checked"));
        //{

        //    if ($(".checkbox1").is(":checked")) {
        //        var tr = $($(this).parents("tr")[0]);
        //        tr.find(".checkbox1").removeAttr('checked', "checked");
        //        tr.find(".checkbox1").parent().removeClass("checked");
        //    }



    });

    $(".chckall").click(function (event) {  //on click 
        var tr = $($(this).parents("tr")[0]);
        if (this.checked) { // check select status
            tr.find('input.checkbox1').attr('checked', "checked");
            tr.find('input.checkbox1').parent().addClass("checked");
            //$('input.checkbox1').attr('checked', "checked");
            //$('input.checkbox1').parent().addClass("checked");
        }
        else {
            tr.find('input.checkbox1').removeAttr('checked', "checked");
            tr.find('input.checkbox1').parent().removeClass("checked");
        }
    });

    $(".chkmenus").click(function (event) {
        var id = "#" + ($(this).attr('id'));

        var trid = $("#sample_editable_2 tbody").find(id);
        if (this.checked) {

            //trid.find(".checksubmenus").attr('checked', "checked");
            trid.find(".checksubmenus").prop('disabled', false);
            trid.find(".checksubmenus").parents().removeClass("disabled");


            //trid.find(".checksubmenus").attr('enabled', "enabled");

            // trid.find(".checksubmenus").parent().addClass("checked");
        }
        else {

            trid.find(".checksubmenus").prop('disabled', true);
            trid.find(".checksubmenus").parents().addClass("disabled");
            trid.find(".checkbox1").prop('disabled', true);
            trid.find(".checkbox1").parents().addClass("disabled");
            trid.find(".chckall").prop('disabled', true);
            trid.find(".chckall").parents().addClass("disabled");
            trid.find(".checksubmenus").prop('checked', false);
            trid.find(".checksubmenus").parents().removeClass("checked");
            trid.find(".checkbox1").prop('checked', false);
            trid.find(".checkbox1").parents().removeClass("checked");
            trid.find(".chckall").prop('checked', false);
            trid.find(".chckall").parents().removeClass("checked");
        }


    });
    LoadUsers();

    function createTree(response) {

        $('#divPrevilages').jstree({

            'core': {
                'data':
              response

            },


        });
    }
    $('#divPrevilages')
  // listen for event
        .on('changed.jstree', function (e, data) {

            var i, j, r = [], k = [];
            for (i = 0, j = data.selected.length; i < j; i++) {
                r.push(data.instance.get_node(data.selected[i]).text);
                k.push(data.instance.get_node(data.selected[i]).id);

            }

           
            $('#username').html(r.join(', '));
            $('#userId').val(k.join(', '));
            LoadPrivileges();
        })
  // create the instance
  .jstree();
    function LoadUsers() {
        $.ajax({
            async: false,
            url: "Previlages.aspx/ViewList",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: CreateTreeSuccess,
            failure: function (response) {
                alert(response.d);
            }
        });

    }
    function CreateTreeSuccess(response) {


        createTree(response)
    }
});

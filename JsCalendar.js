 var url='http://127.0.0.1:8080';
jQuery(document).ready(function(){ 

 var eventOp='';

 //Get all events to display on main page
     $.ajax({
        type: "GET",
        //data: postdata,
        url: url+"/Event",
          success: function (data, textStatus, jqXHR) {

            for(var i=0; i<data.length;i++){
                var ds= new Date(data[i].date_start);
                var de= new Date(data[i].date_end);
                var tr="<tr>";
                tr+= "<td><a href='#' class='DetailEvent' id="+data[i]._id+">"+data[i].place+"</a></td>";
                tr+= "<td>"+ds.getDate()+"-"+parseInt(ds.getMonth()+1)+"-"+ds.getFullYear()+"</td>";
                tr+= "<td>"+de.getDate()+"-"+parseInt(de.getMonth()+1)+"-"+de.getFullYear()+"</td>";
                tr+= '<td><span class="btn btn-sm blue"><a href="#" id="'+data[i]._id+'" class="EditEvent" style="color: white">EDIT</a></span><span class="btn btn-sm blue"><a href="#" id="'+data[i]._id+'" class="DeleteEvent" style="color: white">DELETE</a></span></td>;'
                tr+="</tr>";
                 jQuery("#gridEvents tbody").html(jQuery("#gridEvents tbody").html()+tr);
            }
                    },
        beforeSend: function (xhr) {
         },
        error: function (errorMessage) {
            alert("there is something wrong connecting to the server");
            console.log(errorMessage);
        }
    });
    jQuery(".add_event").click(function(){
       //Alternate between add and edit event
        if(jQuery(".btn_op").hasClass('btn_edit')){
            jQuery(".btn_op").removeClass('btn_edit');
            jQuery(".btn_op").addClass('btn_add');
        }else if (!jQuery(".btn_op").hasClass('btn_add')){
            jQuery(".btn_op").addClass('btn_add');
        }
    });
    $('body').on('click', 'a.EditEvent', function() {
        if(jQuery(".btn_op").hasClass('btn_add')){
            jQuery(".btn_op").removeClass('btn_add');
            jQuery(".btn_op").addClass('btn_edit');
        }else if (!jQuery(".btn_op").hasClass('btn_edit')){
            jQuery(".btn_op").addClass('btn_edit');
        }
        eventOp=jQuery(this).attr('id');
     });

      $("#btn_searchmodal").click(function () {
        clear();
        $("#SeacrhEvents").modal("show");

    });
    $("#btn_search").click(function () {
        //Search Between Dates
        var date_start= new Date(jQuery("#st_dt").val());
        date_start = date_start.getFullYear()+'-'+parseInt(date_start.getMonth()+1)+'-'+date_start.getDate();
        var date_end= new Date(jQuery("#ed_dt").val());
        date_end = date_end.getFullYear()+'-'+parseInt(date_end.getMonth()+1)+'-'+date_end.getDate();
             var searchURL=url + "/Event/search/date/" + date_start+"/"+date_end;
             alert(searchURL);
        $.ajax({
            type: "GET",
            url: searchURL,
            success: function (data, textStatus, jqXHR) {
                 for (var i = 0; i < data.length; i++) {
                    var ds = new Date(data[i].date_start);
                    var de = new Date(data[i].date_end);
                    var tr = "<tr>";
                    tr += "<td><a href='#' class='DetailEvent' id=" + data[i]._id + ">" + data[i].place + "</a></td>";
                    tr += "<td>" + ds.getDate() + "-" + ds.getMonth() + "-" + ds.getFullYear() + "</td>";
                    tr += "<td>" + de.getDate() + "-" + de.getMonth() + "-" + de.getFullYear() + "</td>";
                    tr += "</tr>";
                     jQuery("#gridsearchevents tbody").html(jQuery("#gridsearchevents tbody").html() + tr);
                }
            },
            beforeSend: function (xhr) {
            },
            error: function (errorMessage) {
                alert("there is something wrong connecting to the server");
                console.log(errorMessage);
            }
        });
    });
    jQuery("#btnSRDelYes").click(function(){
        var id=$('#delete_value').val();
         alert(id);
        $.ajax({
        type: "DELETE",
        //data: postdata,
        url: url+"/Event/"+id,
          success: function (data, textStatus, jqXHR) {
                alert("EVENT DELETED!");
                location.reload();
                    },
        beforeSend: function (xhr) {
         },
        error: function (errorMessage) {
            alert("there is something wrong connecting to the server");
            console.log(errorMessage);
        }
    });

    });
        $("#btnmodal").click(function () {

        clear();
        $("#AddUpdateEvents").modal("show");

    });

    function clear() {
        $("#form_Events :input").each(function () {
            $(this).val('');
        });

    }
    $("#Submit").click(function () {

        ValidateEvents();

    });
    $('#gridEvents').on('click', '.EditEvent', function (e) {
        searchID=jQuery(this).attr('id');
          $.ajax({
        type: "GET",
        //data: postdata,
        url: url+"/Event/search/id/"+searchID,
          success: function (data, textStatus, jqXHR) {
            var ds= new Date(data.date_start);
            var de= new Date(data.date_end);
            var dc= new Date(data.created);
            jQuery("#place").val(data.place);
            jQuery("#modalCreatedDate").val(dc.getDate()+"-"+dc.getMonth()+"-"+dc.getFullYear());
            jQuery("#eventstartdate").val(ds.getDate()+"-"+ds.getMonth()+"-"+ds.getFullYear());
            jQuery("#eventenddate").val(de.getDate()+"-"+de.getMonth()+"-"+de.getFullYear());
            jQuery("#txtDesc").val(data.description);
           $("#AddUpdateEvents").modal("show");
                    },
        beforeSend: function (xhr) {
         },
        error: function (errorMessage) {
            alert("there is something wrong connecting to the server");
            console.log(errorMessage);
        }
    });
    });
    $('#gridEvents').on('click', '.DeleteEvent', function (e) {
        $("#dialog-del").modal("show");
        $("#delete_value").val($(this).attr('id'));
    });
    $('#gridEvents').on('click', '.DetailEvent', function (e) {
        $("#dialog-details").modal("show");
        searchID=jQuery(this).attr('id');
        $.ajax({
        type: "GET",
        //data: postdata,
        url: url+"/Event/search/id/"+searchID,
          success: function (data, textStatus, jqXHR) {
            var ds= new Date(data.date_start);
            var de= new Date(data.date_end);
            var dc= new Date(data.created);
            var googleLoc='<div style="height:300px;width:400px;max-width:100%;list-style:none; transition: none;overflow:hidden;"><div id="gmap-canvas" style="height:100%; width:100%;max-width:100%;"><iframe style="height:100%;width:100%;border:0;" frameborder="0" src="https://www.google.com/maps/embed/v1/place?q='+data.place+'&key=AIzaSyAN0om9mFmy1QN6Wf54tXAowK4eT0ZUPrU"></iframe></div><a class="code-for-google-map" href="https://www.treat-lice.com" id="authorize-map-data">treat-lice</a><style>#gmap-canvas img{max-width:none!important;background:none!important;font-size: inherit;}</style></div>';
            console.log(data);
            jQuery("#modalPlace").html(data.place);
            jQuery("#modalCreatedDate").html(dc.getDate()+"-"+dc.getMonth()+"-"+dc.getFullYear());
            jQuery("#modalStartDate").html(ds.getDate()+"-"+ds.getMonth()+"-"+ds.getFullYear());
            jQuery("#modalEndDate").html(de.getDate()+"-"+de.getMonth()+"-"+de.getFullYear());
            jQuery("#modalDescription").html(data.description);
            jQuery("#googleMap").html(googleLoc);
                    },
        beforeSend: function (xhr) {
         },
        error: function (errorMessage) {
            alert("there is something wrong connecting to the server");
            console.log(errorMessage);
        }
    });

    });
    function ValidateEvents() {

        var formserrep = $('#form_Events');
        var error1 = $('.alert-danger', formserrep);
        var success1 = $('.alert-success', formserrep);

        formserrep.validate({
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
                place: {
                    required: true
                },
                eventstartdate: {
                    required: true
                },

                eventenddate: {
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
                

            }//end here submitt
        });
    }


    jQuery("#form_Events").submit(function(){return false;});
    
    jQuery(".btn_op").click(function(){
       var operation="";
                if(jQuery(".btn_op").hasClass('btn_add')){
                    operation="POST";
                    var setURL= url+"/Event/";
                } else if (jQuery(".btn_op").hasClass('btn_edit') && eventOp!="" ){
                    operation="PUT";
                    var setURL= url+"/Event/"+eventOp;
                } else{
                    alert("there is soemthing Wrong Going on...");
                 }
                 
                var desc=jQuery("#txtDesc").val();
                var place=jQuery("#place").val();
                  var postdata={
                    "description" : desc,
                    "user_id" : "5623a9cbc99b1b623b810c8a",
                    "date_end" : Date(jQuery("#eventenddate").val()),
                    "date_start" : Date(jQuery("#eventstartdate").val()),
                    "place" : place,
                    "ispublic" : true
                 }; 
                 $.ajax({
                type: operation,
                data: postdata,
                            dataType: "json",
                url: setURL,
                  success: function (data, textStatus, jqXHR) {
                    console.log(data);                            
                },
                beforeSend: function (xhr) {
                  },
                error: function (errorMessage) {
                    alert("there is something wrong connecting to the server");
                    console.log(errorMessage);
                }
              });

    });
}); 
 var GridEvents = function () {

    var GridEventsTable = function () {

        var table = $('#gridEvents');

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
                [0, "desc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#gridEvents_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridEventsTable();
        }

    };

}();
 
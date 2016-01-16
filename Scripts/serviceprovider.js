var GridMyAgent = function () {

    var GridMyAgentTable = function () {

        var table = $('#grdMyAgent');

        var oTable = table.dataTable({
            "lengthMenu": [
                [5, 10, 20, 30, -1],
                [5, 10, 20, 30, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 5,

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
            "saveState": true,
            "order": []// set first column as a default sort by asc

        });

        var tableWrapper = $("#grdMyAgent_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridMyAgentTable();
        }

    };

}();

$(document).ready(function () {

    var AgentID = getParameterByName('ID');

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    if (AgentID != "") {
        var ID = AgentID;
        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            $.ajax({
                url: "ServiceProvider.aspx/LoadproviderByID",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"ID":"' + ID + '"}',
                dataType: "json",
                success: OnLoadAgentByID,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }, 2000);
    }


    function OnLoadAgentByID(response) {

        var objMyAgent = JSON.parse(response.d);
        $.each(objMyAgent, function (key, value) {

            $('#txtFirstName').val(value.FirstName);
            $('#txtLastName').val(value.LastName);
            $('#txtAddress1').val(value.Address1);
            $('#txtAddress2').val(value.Address2);
            $('.bfh-countries').val(value.Country);
            var country = value.Country;
            $('#SelState').empty();
            $('#SelState').append('<option value="">-------------------------------------Select-------------------------------------</option>');
            for (state in BFHStatesList[country]) {
                if (BFHStatesList[country].hasOwnProperty(state)) {
                    $('#SelState').append('<option value="' + BFHStatesList[country][state].code + '">' + BFHStatesList[country][state].name + '</option>');
                }
            }
            $('#SelState').val(value.State);
            $('#txtCity').val(value.City);
            $('#txtZipCode').val(value.Zip);
            $('#txtContact').val(value.Contact);
            $('#txtEmail').val(value.Email);
        });
        $('body').loader('hide');
    }
    GridMyAgent.init();

    function ValidateAddAgentForm() {
        var FormAddAgent = $('#FormAddAgent');
        var error1 = $('.alert-danger', FormAddAgent);
        var success1 = $('.alert-success', FormAddAgent);

        FormAddAgent.validate({
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

                txtFirstName: {
                    required: true
                },

                txtLastName: {
                    required: true
                },

                txtAddress1: {
                    required: true
                },

                //SelCountry: {
                //    required: true
                //},

                SelState: {
                    required: true
                },
                txtCity: {
                    required: true
                },
                txtZipCode: {
                    required: true,
                    minlength: 7
                },
                txtContact: {
                    required: true,
                    phoneUS: true
                },

                txtEmail: {
                    required: true,
                    email:true
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
                var ID = getParameterByName('ID');
                if (ID == "")
                    ID = "0";
                var FirstName = $("#txtFirstName").val();
                var LastName = $("#txtLastName").val();
                var Address1 = $("#txtAddress1").val();
                var Address2 = $("#txtAddress2").val();
                var Country = $(".bfh-countries").val();
                var State = $(".bfh-states").val();
                //var Country = "CA";
                //var State = "ON";
                var City = $("#txtCity").val();
                if ($("#txtZipCode").val() == $("#txtZipCode").attr("maskwatermark"))
                {
                    $("#txtZipCode").val("");
                    ValidateAddAgentForm();
                    return false;

                }
                var ZipCode = $("#txtZipCode").val();
            
                var Email = $("#txtEmail").val();
                var Phone = $("#txtContact").val();

                $("#btnOk").click(function () {

                    window.location.href = "ServiceProvider.aspx"

                });

                $('body').loader('show', { overlay: true });
                setTimeout(function () {
                    $.ajax({
                        url: "ServiceProvider.aspx/Addprovider",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: '{"ID":"' + ID + '","FirstName":"' + FirstName + '","LastName":"' + LastName + '","Address1":"' + Address1 + '","Address2":"' + Address2 + '","Country":"' + Country + '","State":"' + State + '","City":"' + City + '","ZipCode":"' + ZipCode + '","Email":"' + Email + '","Phone":"' + Phone + '"}',
                        dataType: "json",
                        success: OnAddAgent,
                        failure: function (response) {
                            //alert(response.d);
                        }
                    });

                }, 2000);
            }
        });
    }

    function OnAddAgent(response) {

        $('body').loader('hide');

        if (response.d == "True") {

            if (AgentID == "")
                $('.msgtext').text('Service Provider has been added successfully!');
            else
                $('.msgtext').text('Service Provider has been updated successfully!');
        }
        else {
            if (AgentID == "")
                $('.msgtext').text('Service Provider is not added!');
            else
                $('.msgtext').text('Service Provider is not updated!');
        }
        $('#msgaddagent').modal('show');

    }

    $("#btnAddAgent").click(function () {
        location.href = "Addservice_provider";
    });

    $("#btnSubmitAgent").click(function () {
        ValidateAddAgentForm();

    });

    $("#btnOk").click(function () {
        location.href = "ServiceProvider";
    });

    $("#grdMyAgent").on('click', '.editAgent', function (e) {

        var trid = $(this).attr("id"); // table row ID 
        location.href = "Addservice_provider.aspx?ID=" + trid + "";
    });

    $("#grdMyAgent").on('click', '.delAgent', function (e) {

        var trid = $(this).attr("id"); // table row ID 
        $('#hdnAgentID').val(trid);
        $('#deleteagentmodel').modal('show');
    });

    $("#btnOk").click(function () {
        location.href = "ServiceProvider";
    });

    $("#btndelagentYes").click(function () {


        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            $.ajax({
                url: "ServiceProvider.aspx/Deleteprovider",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"ID":"' + $('#hdnAgentID').val() + '"}',
                dataType: "json",
                success: OnDeleteAgent,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }, 2000);
    });

    function OnDeleteAgent(response) {

        $('body').loader('hide');
        var recordid = '#' + $("#hdnAgentID").val();
        $('#grdMyAgent').dataTable().fnDestroy();

        $(recordid).remove();

        GridMyAgent.init();
        
    }

    $("#btnCancelAgent").click(function () {
        location.href = "ServiceProvider";
    });
});
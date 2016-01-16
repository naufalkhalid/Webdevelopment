
var GridClients = function () {

    var GridClientsTable = function () {

        var table = $('#grdClients');

        var oTable = table.dataTable({
            "lengthMenu": [
                [10, 20, 30, -1],
                [10, 20, 30, "All"] // change per page values here
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

        var tableWrapper = $("#grdClients_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            GridClientsTable();
        }

    };

}();

$(document).ready(function () {

    GridClients.init();

    function ClearFields() {
        $("#txtClient").val("");
        $("#SelType").val("-1");
        $("#txtAddr1").val("");
        $("#txtAddr2").val("");
        $("#txtCity").val("");
        $("#txtZipCode").val("");
        $("#txtContact").val("");
        $("#txtEmail").val("");
    }
    function FillClients() {

        $.ajax({
            url: "Clients.aspx/FillClients",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: {},
            dataType: "json",
            success: OnFillClients,
            failure: function (response) {
                //alert(response.d);
            }
        });
    
    }
    function OnFillClients(response) {

        var objClients = JSON.parse(response.d);
        $('#ContentPlaceHolder1_UCManageClient1_drpClients').empty();
        $('#ContentPlaceHolder1_UCManageClient1_drpClients').append('<option value="-1">-------------Select-------------</option>');

        $.each(objClients, function (key, value) {
            $('#ContentPlaceHolder1_UCManageClient1_drpClients').append('<option value="' + value.ID + '">' + value.Client + '</option>');
        });
    }
    function ValidateClientForm() {
        var FormClient = $('#FormClients');
        var error1 = $('.alert-danger', FormClient);
        var success1 = $('.alert-success', FormClient);

        FormClient.validate({
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

                SelType: {
                    required: true
                },

                txtClient: {
                    required: true
                },

                txtAddr1: {
                    required: true
                },

                txtAddr2: {
                    required: true
                },
                txtCity: {
                    required: true
                },

                SelCountry: {
                    required: true
                },

                SelState: {
                    required: true
                },

                txtZipCode: {
                    required: true
                },
                
                txtContact: {
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
                $('#dialogclientform').modal('hide');

                var ID = $('#hdnClientID').val();
                var Type = $("#SelType option:selected").text();
                var Client = $("#txtClient").val();
                var Addr1 = $("#txtAddr1").val();
                var Addr2 = $("#txtAddr2").val();
                var City = $("#txtCity").val();
                var Country = $("#SelCountry").val();
                var State = $("#SelState").val();
                var ZipCode = $("#txtZipCode").val();
                var ContactNo = $("#txtContact").val();
                var Email = $("#txtEmail").val();
                
                $('body').loader('show', { overlay: true });

                setTimeout(function () {

                    if (ID == "0") {
                        $.ajax({
                            url: "Clients.aspx/AddClient",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            data: '{"ID":"' + ID + '","Type":"' + Type + '","Client":"' + Client + '","Addr1":"' + Addr1 + '","Addr2":"' + Addr2 + '","City":"' + City + '","Country":"' + Country + '","State":"' + State + '","ZipCode":"' + ZipCode + '","ContactNo":"' + ContactNo + '","Email":"' + Email + '"}',
                            dataType: "json",
                            success: OnClientAddUpdateSuccess,
                            failure: function (response) {
                                //alert(response.d);
                            }
                        });
                    }

                    else {
                        $.ajax({
                            url: "Clients.aspx/UpdateClient",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            data: '{"ID":"' + ID + '","Type":"' + Type + '","Client":"' + Client + '","Addr1":"' + Addr1 + '","Addr2":"' + Addr2 + '","City":"' + City + '","Country":"' + Country + '","State":"' + State + '","ZipCode":"' + ZipCode + '","ContactNo":"' + ContactNo + '","Email":"' + Email + '"}',
                            dataType: "json",
                            success: OnClientAddUpdateSuccess,
                            failure: function (response) {
                                //alert(response.d);
                            }
                        });
                    }
                    }, 2000);
            }
        });
    }

    function OnClientAddUpdateSuccess(response) {
        
        if (response.d == "False") {
            $('.msgtext').text("Client is not added!");
            $('#MsgClientModel').modal('show');
        }

        else {
            if ($('#hdnClientID').val() == "0") {
                $('.msgtext').text("Client is added successfully!");
                $('#MsgClientModel').modal('show');
                $('#grdClients').dataTable().fnDestroy();
                $('#grdClients > tbody').append(response.d);
                GridClients.init();
                FillClients();
            }

            else {
                $('.msgtext').text("Client is updated successfully!");
                $('#MsgClientModel').modal('show');
                $('#grdClients').dataTable().fnDestroy();
                var clientid = '#' + $('#hdnClientID').val();
                $(clientid).remove();
                $('#grdClients > tbody').append(response.d);
                GridClients.init();
                FillClients();
            }
        }
        $('body').loader('hide');
    }

    $('.bfh-selectbox').on('change.bfhselectbox', function () {
        
        var country = $(this).val();

        $('#SelState').empty();
        $('#SelState').append('<option value="">-------------------------------------Select-------------------------------------</option>');
        for (state in BFHStatesList[country]) {
            if (BFHStatesList[country].hasOwnProperty(state)) {
                $('#SelState').append('<option value="' + BFHStatesList[country][state].code + '">' + BFHStatesList[country][state].name + '</option>');
            }
        }
        
    });

    $("#ContentPlaceHolder1_UCManageClient1_drpClients").change(function () {

        var ClientID = $(this).val();

        $('#grdClients > tbody > tr').each(function () {
           
            if (ClientID == "0" || ClientID == "-1")
                $(this).show();
            else if ($(this).attr("id") != ClientID)
                $(this).hide();
            else {
                $(this).show();
            }
        });

    });
    function OnSelectedClient(response) {

        $('#grdClients').dataTable().fnDestroy();
        $('#grdClients > tbody').empty();
        $('#grdClients > tbody').append(response.d);
        GridClients.init();

    }

    $("#btnAddClient").click(function () {
        ClearFields();
        $('#hdnClientID').val("0");
        $('#dialogclientform').modal('show');
    });

    $("#btnSubmitClient").click(function () {
        
        ValidateClientForm();
    });

    $('#grdClients').on('click', '.editClient', function (e) {

        var trid = $(this).attr("id"); // table row ID 
        $('#hdnClientID').val(trid);

        $('body').loader('show', { overlay: true });

        setTimeout(function () {
            var ID = $('#hdnClientID').val();

            $.ajax({
                url: "Clients.aspx/EditClient",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"ID":"' + ID + '"}',
                dataType: "json",
                success: OnClientEditSuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }, 2000);
    });

    function OnClientEditSuccess(response) {

        var objClient = JSON.parse(response.d);

        $.each(objClient, function (key, value) {

            $("#txtClient").val(value.Client);
            $("#SelType").val(value.Type);
            $("#txtAddr1").val(value.Addr1);
            $("#txtAddr2").val(value.Addr2);
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
            $("#txtCity").val(value.City);
            $("#txtZipCode").val(value.Zip);
            $("#txtContact").val(value.Contact);
            $("#txtEmail").val(value.Email);

        });

        $('body').loader('hide');
        $('#dialogclientform').modal('show');

    }
    $('#grdClients').on('click', '.delClient', function (e) {

        var trid = $(this).attr("id"); // table row ID 
        $('#hdnClientID').val(trid);
        $('#DeleteClientModel').modal('show');

    });

    $('#btndelclientYes').click(function () {

        $('body').loader('show', { overlay: true });
        setTimeout(function () {
            var ID = $('#hdnClientID').val();

            $.ajax({
                url: "Clients.aspx/DeleteClient",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"ID":"' + ID + '"}',
                dataType: "json",
                success: OnClientDeleteSuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }, 2000);
    });

    function OnClientDeleteSuccess(response) {

        if (response.d == "True") {
            $('.msgtext').text("Client has been deleted successfully!");
            $('#grdClients').dataTable().fnDestroy();
            var clientid = '#' + $('#hdnClientID').val();
            $(clientid).remove();
            GridClients.init();
        }
        else
            $('.msgtext').text("Client is not deleted!");

        $('#MsgClientModel').modal('show');
        $('body').loader('hide');
    }


});


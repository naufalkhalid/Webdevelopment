
var TableEditableCategory = function () {

    var handleTable = function () {

        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }

            oTable.fnDraw();
        }

        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            $(jqTds[0]).css("display", "none");
            $('#hfRow').val($(aData[0]).attr("id") + ',' + $(aData[1]).attr("id"));
            jqTds[0].innerHTML = '<input type="text" class="form-control input-small"  style="display:none" value="' + $(aData[0]).text() + '">';
            jqTds[1].innerHTML = '<input type="text" class="form-control input-large" value="' + $(aData[1]).text() + '">';
            jqTds[2].innerHTML = '<a class="edit" href="">Save</a>';
            jqTds[3].innerHTML = '<a class="cancel" href="">Cancel</a>';
        }
        function deleteRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            $(aData[0]).attr("value")

            $.ajax({
                url: "CommunityDocuments.aspx/DeleteCategory",
                type: "POST",
                async: false,
                contentType: "application/json; charset=utf-8",
                data: '{"Catid":"' + $(jqTds[0]).text().trim() + '","CatName":"' + $(jqTds[1]).text().trim() + '"}',
                dataType: "json",
                //  success: OnCategorySuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });

        }
        function saveRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            saveCategory($(jqInputs[0]).val(), $(jqInputs[1]).val());
            var ids = $('#hfRow').val();
            var arrids = ids.split(',')
            oTable.fnUpdate('  <span id=' + arrids[0] + '>' + $(jqInputs[0]).val() + '</span>   ', nRow, 0, false);
            oTable.fnUpdate(' <span id=' + arrids[1] + '>' + $(jqInputs[1]).val() + '</span> ', nRow, 1, false);
            oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 2, false);
            oTable.fnUpdate('<a class="delete" href="">Delete</a>', nRow, 3, false);
            oTable.fnDraw();
            location.reload();
        }
        function saveCategory(id, value) {

            $.ajax({
                url: "CommunityDocuments.aspx/UpdateCategory",
                type: "POST",
                async: false,
                contentType: "application/json; charset=utf-8",
                data: '{"Catid":"' + id + '","CatName":"' + value + '"}',
                dataType: "json",
                success: OnCategorySuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }
        function OnCategorySuccess(response) {

            switch (response.d) {
                case "True":
                    alert("Category Updated Sucessfully...")
                    break;
                case "False":
                    alert("Category Not Updated ...")
                    break;
            }

        }
        function cancelEditRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 2, false);
            oTable.fnDraw();
        }

        var table = $('#sample_editable_1_Category');

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
                [0, "asc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#sample_editable_1_wrapper_Category");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

        $('#sample_editable_1_new_Category').click(function (e) {
            e.preventDefault();

            if (nNew && nEditing) {
                if (confirm("Previose row not saved. Do you want to save it ?")) {
                    saveRow(oTable, nEditing); // save
                    $(nEditing).find("td:first").html("Untitled");
                    nEditing = null;
                    nNew = false;

                } else {
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;

                    return;
                }
            }

            var aiNew = oTable.fnAddData(['', '', '', '', '', '']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
        });

        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == true) {
                deleteRow(oTable, $(this).parents('tr')[0]);
                location.reload();
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
            // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();

            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nNew = false;
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && this.innerHTML == "Save") {
                /* Editing this row and want to save it */
                saveRow(oTable, nEditing);
                nEditing = null;
                // alert("Updated! Do not forget to do some ajax to sync with backend :)");
            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable();
        }

    };

}();

$(function () {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('[id$=txtlastRecOn]').val(today);
    $('[id$=txtDatePosted]').val(today);


    var tableDocuments = $('#sample_editable_1_Documents');

    var oTableDocuments = tableDocuments.dataTable({
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
            [0, "asc"]
        ] // set first column as a default sort by asc
    });

    tableDocuments.on('click', '.editDoc', function (e) {
        e.preventDefault();
        var nRowDoc = $(this).parents('tr')[0];
        editRowDocuments(oTableDocuments, nRowDoc);

    });
    $('[id$=btnCancel]').css('display', 'none');
    $('[id$=btnCancel]').on('click', '', function () {
        $('[id$=ddlCategories]').val("0");
        $('[id$=txtDatePosted]').val(today);
        $('[id$=txtlastRecOn]').val(today);
        $('[id$=commdocname]').text('');
        $('[id$=btnAddDocuments]').val("Add Document");
        $('[id$=hfComDocID]').val('');
        $('[id$=btnCancel]').css('display', 'none');

    });
    $(document).on('change', $('[id$=fudocuments]'), function () {
        if ($('[id$=fudocuments]').val() != "") {
            $('[id$=commdocname]').css('display', 'none');
        }
        else {
            $('[id$=commdocname]').css('display', '');
        }
    });
    function editRowDocuments(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        var jqTds = $('>td', nRow);
        //alert($(aData[0]).text());
        $('[id$=ddlCategories]').val($(aData[1]).text());
        $('[id$=txtDatePosted]').val($(aData[5]).text());
        $('[id$=txtlastRecOn]').val($(aData[4]).text());
        $('[id$=commdocname]').text('File Name: ' + $(aData[2]).text());
        $('[id$=btnAddDocuments]').val("Update Document");
        $('[id$=hfComDocID]').val($(aData[0]).text());
        $('[id$=btnCancel]').css('display', 'block');

    }

    tableDocuments.on('click', '.deleteDoc', function (e) {
        e.preventDefault();

        if (confirm("Are you sure to delete this row ?") == true) {
            deleteCommDoc(oTableDocuments, $(this).parents('tr')[0]);
        }
        else {
            return;
        }


        var nRow = $(this).parents('tr')[0];
        oTableDocuments.fnDeleteRow(nRow);
    });

    function deleteCommDoc(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        var jqTds = $('>td', nRow);
        $(aData[0]).attr("value")

        $.ajax({
            url: "CommunityDocuments.aspx/DeleteCommunityDocuments",
            type: "POST",
            async: false,
            contentType: "application/json; charset=utf-8",
            data: '{"CommDocid":"' + $(jqTds[0]).text().trim() + '"}',
            dataType: "json",
            success: OnDeleteCommunityDocumentsSuccess,
            failure: function (response) {
                //alert(response.d);
            }
        });
    }

    function OnDeleteCommunityDocumentsSuccess(response) {
        switch (response.d) {
            case "true":
                alert("Community Document Deleted Sucessfully...")
                break;
            case "false":
                alert("Community Document Not Deleted, Try Again...");
                break;
        }
    }
});


var FormValidationCommunityDocuments = function () {


    // advance validation
    var handleValidation3 = function () {
        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation

        var form3 = $('#form_CommunityDocuments');
        var error3 = $('.alert-danger', form3);
        var success3 = $('.alert-success', form3);

        var datepicker1 = $('[id$=datepicker1]')
        form3.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input

            rules: {
                name: {
                    minlength: 2,
                    required: false
                },
                email: {
                    required: false,
                    email: true
                },
                options1: {
                    required: true
                },
                datepicker1: {
                    required: true
                },
                select: {
                    required: true
                },
                datepicker: {
                    required: true
                },
                occupation: {
                    minlength: 5,
                },
                membership: {
                    required: true
                },
                service: {
                    required: true,
                    minlength: 2
                },
                markdown: {
                    required: true
                },
                editor1: {
                    required: true
                },
                editor2: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                membership: {
                    required: "Please select a Membership type"
                },
                service: {
                    required: "Please select  at least 2 types of Service",
                    minlength: jQuery.validator.format("Please select  at least {0} types of Service")
                }
            },

            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) {
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) {
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) {
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) {
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit   
                success3.hide();
                error3.show();
                Metronic.scrollTo(error3, -200);
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
                success3.show();
                error3.hide();
            }

        });

        //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
        $('.select2me', form3).change(function () {
            form3.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
        });


        //initialize datepicker
        $('.date-picker').datepicker({
            rtl: Metronic.isRTL(),
            autoclose: true
        });
        $('.date-picker .form-control').change(function () {
            form3.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
        })
    }



    return {
        //main function to initiate the module
        init: function () {

            handleValidation3();

        }

    };

}();

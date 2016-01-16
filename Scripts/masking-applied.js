/// <reference path="jquery-1.9.1.js" />
/// <reference path="jquery.maskedinput.edited-1.3.js" />

/**
references above are provided to enable intellisense only
@author : Mobin Molai
@date : 21 July, 2011
*/

//Initial Variables
var _eventsBinded = false;
var _waterMarkTexts = new Object();
_waterMarkTexts["phone"] = "(###)###-####";
_waterMarkTexts["email"] = "abc@example.com";
_waterMarkTexts["url"] = "http://www.abc.com";
_waterMarkTexts["postalcode"] = "X#X #X#";
_waterMarkTexts["zipcodeUS"] = "#####";
_waterMarkTexts["date"] = "MM/DD/YYYY";
_waterMarkTexts["hst"] = "#########";

var _placeholder = "_";
var _custom_masks = new Object();
_custom_masks["phone"] = "(999)999-9999";
_custom_masks["postalcode"] = "a9a 9a9";
_custom_masks["zipcodeUS"] = "99999";
_custom_masks["date"] = "M9/D9/Y999";
_custom_masks["hst"] = "999999999";

var _maskstypes_to_be_uppercase = "postalcode;zipcodeUS";

$.mask.definitions['D'] = '[0123]';
$.mask.definitions['M'] = '[01]';
$.mask.definitions['Y'] = '[12]';

//defining attribute variables
var attr_masktype = "masktype";
var attr_maskformat = "maskformat";
var attr_watermark = "maskwatermark";

//related to jQuery AJAX
var ASPNet_AjaxRequest_InProgress = false;
//var jQuery_AjaxRequest_InProgress = true;

function pageLoad() {
    ASPNet_AjaxRequest_InProgress = false;
    $("#processMessage").hide();
    onMaskingLoad();
    addAjaxSendAndCompleteEvents();
}

$(document).ready(function (e) {
    onMaskingLoad();
    addAjaxSendAndCompleteEvents();
});

function isEventNameBound(element, eventName) {
    var returnValue = false;
    var events = $._data(element, "events");
    var eventType = eventName.split('.')[0];
    var namespace = eventName.split('.').length > 1 ? eventName.split('.')[1] : "";
    if (events != undefined && events[eventType] != undefined) {
        var arrayEvents = $(events[eventType]);
        arrayEvents.each(function () {
            if (this.namespace == namespace) {
                returnValue = true;
                return;
            }
        })
    }
    return returnValue;
}

function addAjaxSendAndCompleteEvents() {
    if (!_eventsBinded) {
        $(document).ajaxStart(function () {
            $("#processMessage").show();
        });
        $(document).ajaxStop(function () {
            if (!ASPNet_AjaxRequest_InProgress) {
                $("#processMessage").hide();
            }
        });

        if (typeof (Sys) != "undefined" && typeof (Sys.WebForms) != "undefined") {
            var prm = Sys.WebForms.PageRequestManager.getInstance();
            prm.add_initializeRequest(initializeRequest);
        }
        _eventsBinded = true;
    }
}


function initializeRequest(sender, args) {
    ASPNet_AjaxRequest_InProgress = true;
    $("#processMessage").show();
}

function showProgressLoader() {
    $("#processMessage").show();
}

function onMaskingLoad() {
    $("span[masktype]").each(function () {
        var masktype = $(this).attr("masktype");
        $(this).children("input[type=text]").each(function () {
            $(this).attr("masktype", masktype);
        });
    });

    //Applying Masking to all inputs with "masktype" attribute
    applyMasking();

    $(document).on("click", "form input[type=submit]", function () {
        $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
    });

    // when form is posted back clear water marks
    $(document).on("submit", 'form', function () {
        if (typeof (Page_IsValid) != "undefined") {
            if (typeof (this.validated) != "undefined" && this.validated) {
                clearWaterMarks();
                return true;
            }
            else if (!Page_IsValid) {
                var val = $("input[type=submit][clicked=true]");
                if (typeof (val) != "undefined") {
                    if (typeof (val.attr("onclick")) == "undefined") {
                        clearWaterMarks();
                        return true;
                    }
                    else if (val.attr("onclick") == "return true;") {
                        clearWaterMarks();
                        return true;
                    }
                }
                return false;
            }
        }
        clearWaterMarks();
    });

    $(document).on("change", "select[onchange*=__doPostBack]", function () { clearWaterMarks(); });

    $("a[href*=WebForm_DoPostBackWithOptions]").click(function () { clearWaterMarks(); });

    //for supporting eWorld's Calendar Popup 
    $("input[onchange*=CalendarPopup_FindCalendar][masktype]").each(function () {
        this.onchange = function onchange(event) {
            FixDateFormat(this.id);
        }
    });

    $(document).on("change", "input[masktype=date]", function () {
        FixDateFormat(this.id);
    });

    $(document).on("keypress", "input[masktype=date]", function (e) {
        if (e.keyCode == 13)
            FixDateFormat(this.id);
    });

    $(document).on("click", "span[onclick^='CalendarPopup_FindCalendar('][onclick$='Clear()']", function () {
        var dateInputId = $(this).parents("div").attr("id").replace("calendar", "textBox");
        $("#" + dateInputId).clearbuffer();
        checkValueAndApplyWaterMark(document.getElementById(dateInputId));
    });
}

function applyMasking() {
    //Applying Masking to all inputs with "masktype" attribute
    $("input[type=text][masktype]").each(function () {
        var this_masktype = $(this).attr("masktype");
        var this_mask = _custom_masks[this_masktype];
        var this_watermarktext = _waterMarkTexts[this_masktype] ? _waterMarkTexts[this_masktype] : $(this).attr("maskwatermark");
        if (this_mask)
            $(this).attr("maskformat", this_mask);

        if (this_watermarktext) {
            //Checking for validators and then setting the initial value for required fieldvalidator
            if (this.Validators != null && this.Validators != undefined) {
                $.each(this.Validators, function (index, validator) {
                    if (validator.initialvalue != null && validator.initialvalue != undefined)
                        validator.initialvalue = this_watermarktext;
                    if (validator.validationexpression != null && validator.validationexpression != undefined)
                        validator.validationexpression = this_watermarktext + "|" + validator.validationexpression;
                });
            }

            //adding water mark text attribute to the actual control
            $(this).attr("maskwatermark", this_watermarktext);

            //checking the value of the input and applying water mark text if empty
            checkValueAndApplyWaterMark(this);

            $(this).focus(function () {
                var this_mask = $(this).attr(attr_maskformat);
                var this_watermarktext = $(this).attr(attr_watermark);
                $(this).css("color", "#333");
                if (typeof this_mask == 'undefined' || this_mask == false) {
                    if ($.trim($(this).val()) == this_watermarktext)
                        $(this).val("");
                }
            });

            if (!isEventNameBound(this, "blur.maskingapplied")) {
                $(this).bind("blur.maskingapplied", function (e) {
                    if (_maskstypes_to_be_uppercase.indexOf(this_masktype) != -1) {
                        $(this).val($(this).val().toUpperCase());
                    }
                    checkValueAndApplyWaterMark(this, 'blur');
                });
            }
        }
        if (this_mask) {
            //applying masking plugin
            $(this).mask(this_mask, { placeholder: _placeholder });
            $(this).attr("maskformat", this_mask);
            $(this).change(function () {
                var watermark = $(this).attr("maskwatermark") ? $(this).attr("maskwatermark") : "";
                if (this.value == "" || this.value == watermark) {
                    $(this).clearbuffer();
                }
            });
            if (this.Validators != null && this.Validators != undefined) {
                $.each(this.Validators, function (index, validator) {
                    if (validator.validationexpression != null && validator.validationexpression != undefined)
                        validator.validationexpression = getMaskReplacedWithPlaceHolder(this_mask) + "|" + validator.validationexpression;
                });
            }
        }
    });
}

/**
* 
*/
function checkValueAndApplyWaterMark(control, calledby) {
    var this_watermarktext = $(control).attr(attr_watermark);
    var this_mask = $(control).attr(attr_maskformat);
    var this_mask_with_placeholder = "";
    if (this_mask)
        this_mask_with_placeholder = $.trim(this_mask.replace(/9/g, _placeholder).replace(/a/g, _placeholder).replace(/M/g, _placeholder).replace(/D/g, _placeholder).replace(/Y/g, _placeholder));
    //"/^[_|\s]+$(?![a-z]|[0-9])/" this regular expression will check if the string contains '_' or whitespaces only. If string contains any other character than '_' or whitespace it will return false;
    if ($.trim($(control).val()) == "" || $.trim($(control).val()) == this_mask_with_placeholder || $.trim($(control).val()) == this_watermarktext || /^[_|\s]+$(?![a-z]|[0-9])/gi.test($.trim($(control).val()))) {
        if (calledby != null && calledby != undefined) {
            if (calledby == 'blur' && $.trim($(control).val()) != this_watermarktext) {
                //Keeping some checks and balances for eWorld's Calendar Popup Control to make its validation work correctly.
                //check if the control is a calendar Popup from eWorld then do following stuff
                if ($(control).attr("onchange") != null && $(control).attr("onchange") != undefined) {
                    if ($(control).attr("onchange").toString().indexOf("CalendarPopup_FindCalendar") != -1) {
                        CalendarPopup_FindCalendar(control.id.replace('_textBox', '')).Clear();
                    }
                }
            }
        }
        //now applying watermark text
        $(control).val(this_watermarktext);
        $(control).css("color", "gray");
    }
}

function showWaterMarkText() {
    $("input[" + attr_watermark + "]").each(function () {
        checkValueAndApplyWaterMark(this);
    });
}

function getMaskReplacedWithPlaceHolder(mask) {
    var returnValue = mask;
    for (var i in $.mask.definitions) {
        eval_str = "returnValue = returnValue.replace(/" + (i == "*" ? "\\" + i : i) + "/g, '" + _placeholder + "')";
        returnValue = eval(eval_str);
    }
    return returnValue;
}

function clearWaterMarks() {
    if (document.forms[0]["data_not_submitted"] != null && document.forms[0]["data_not_submitted"] != undefined) {
        if (document.forms[0]["data_not_submitted"])
            return;
    }
    $("input[type=text][masktype]").each(function () {
        clearWaterMarkByControl(this.id);
    });
}

function clearWaterMarkByControl(control_id) {
    var control = document.getElementById(control_id);
    if ($(control).attr(attr_watermark)) {
        if ($(control).val() == $(control).attr(attr_watermark)) {
            $(control).val("");
        }
        if ($(control).attr("masktype") == "date") {
            if (document.getElementById(control.id.replace("textBox", "hidden")) != null && document.getElementById(control.id.replace("textBox", "hidden")) != undefined) {
                if ($(control).attr(attr_maskformat)) {
                    var placeholder_maskformat = getMaskReplacedWithPlaceHolder($(control).attr(attr_maskformat));
                    if ($("#" + $.trim(control.id.replace("textBox", "hidden"))).val() == $.trim(placeholder_maskformat))
                        $("#" + control.id.replace("textBox", "hidden")).val("");
                }
            }
        }
    }
    if ($(control).attr(attr_maskformat)) {
        var placeholder_maskformat = getMaskReplacedWithPlaceHolder($(control).attr(attr_maskformat));
        if ($.trim($(control).val()) == $.trim(placeholder_maskformat))
            $(control).val();
    }
}


//Below Code is only for supporting eWorld's Calendar Popup
/**
* FixDateFormat is only used when using eWorld's Calendar Popup
*/
function FixDateFormat(id) {
    if ($('#' + id)[0]) {
        if ($('#' + id).val().length > 0) {
            var maskformat = $('#' + id).attr("maskformat");
            var watermarkmask = $('#' + id).attr(attr_watermark);
            var maskformat_placeholder = getMaskReplacedWithPlaceHolder(maskformat);
            if ($('#' + id).val() != maskformat_placeholder && $("#" + id).val() != watermarkmask) {
                var dt = new Date($('#' + id).val());
                if (!isNaN(dt)) {
                    if (dt.getFullYear() > 1900 && dt.getFullYear() < 3000) {
                        if (typeof (CalendarPopup_FindCalendar) != "undefined") {
                            if (typeof (CalendarPopup_FindCalendar(id.replace(id.substr(id.indexOf('_textBox'), id.length), ''))) != "undefined")
                                CalendarPopup_FindCalendar(id.replace(id.substr(id.indexOf('_textBox'), id.length), '')).SelectDate($('#' + id).val());
                        }
                        $("#" + id).css("color", "#333");
                    }
                    else {
                        alert('Invalid date range. Please enter date greater than year 1900');
                        $('#' + id).clearbuffer();
                        $('#' + id).focus();
                    }
                }
                else {
                    alert('Invalid date format. Please enter date in correct format i.e. \'mm/dd/yyyy\'');
                    $('#' + id).clearbuffer();
                    $('#' + id).focus();
                }
            }
            else {
                if (typeof (CalendarPopup_FindCalendar) != "undefined" && typeof (CalendarPopup_FindCalendar(id.replace('_textBox', ''))) != "undefined")
                    CalendarPopup_FindCalendar(id.replace('_textBox', '')).Clear();
            }
        }
        checkValueAndApplyWaterMark(document.getElementById(id), 'blur');
    }
}
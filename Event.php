<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.2.0
Version: 3.2.0
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8" />
    <title>Calendar</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
    <link href="assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/select2/select2.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/clockface/css/clockface.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/bootstrap-datepicker/css/datepicker3.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/bootstrap-datetimepicker/css/datetimepicker.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/bootstrap-toastr/toastr.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css" />

   
    <!-- END PAGE LEVEL STYLES -->
    <!-- BEGIN THEME STYLES -->
    <link href="assets/global/css/components.css" rel="stylesheet" type="text/css" />
    <link href="assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="assets/admin/layout/css/layout.css" rel="stylesheet" type="text/css" />
    <link id="style_color" href="assets/admin/layout/css/themes/default.css" rel="stylesheet" type="text/css" />
    <link href="assets/admin/layout/css/custom.css" rel="stylesheet" type="text/css" />
    <!-- END THEME STYLES -->
    <!--<link rel="shortcut icon" href="favicon.ico"/>-->
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<!-- DOC: Apply "page-header-fixed-mobile" and "page-footer-fixed-mobile" class to body element to force fixed header or footer in mobile devices -->
<!-- DOC: Apply "page-sidebar-closed" class to the body and "page-sidebar-menu-closed" class to the sidebar menu element to hide the sidebar by default -->
<!-- DOC: Apply "page-sidebar-hide" class to the body to make the sidebar completely hidden on toggle -->
<!-- DOC: Apply "page-sidebar-closed-hide-logo" class to the body element to make the logo hidden on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-hide" class to body element to completely hide the sidebar on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-fixed" class to have fixed sidebar -->
<!-- DOC: Apply "page-footer-fixed" class to the body element to have fixed footer -->
<!-- DOC: Apply "page-sidebar-reversed" class to put the sidebar on the right side -->
<!-- DOC: Apply "page-full-width" class to the body element to have full width page without the sidebar menu -->
<body class="page-header-fixed page-quick-sidebar-over-content ">

    <!-- BEGIN HEADER -->

    <!-- END HEADER -->

    <!-- BEGIN CONTAINER -->
<div class="modal fade" id="SeacrhEvents" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">

                    <div>

                        <h4 class="modal-title" id="H1" style="font-weight: bold; float: left">Search Event:</h4>
                        <h4 class="modal-title" id="H2"></h4>
                        <div class="clearfix" style=""></div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <form action="#" class="form-horizontal">
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="portlet-body form">
                                <form id="form_search" method="post" class="form-horizontal" role="form">
                                    <div class="form-body">
                                        <div class="alert alert-danger display-hide">
                                            <button class="close" data-close="alert"></button>
                                            You have some form errors. Please check below.
                                        </div>



                                        <div class="form-group">
                                            <label for="startdate" class="control-label col-md-4">
                                                StartDate:
                                             <span class="required">* </span>
                                            </label>

                                            <div class="col-md-6">
                                                <div class="input-group">
                                                    <input type="text" size="16" readonly style="cursor: pointer;" class="form-control " data-provide="datepicker"   data-date-format="yyyy/mm/dd" id="st_dt" name="eventstartdate">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="enddate" class="control-label col-md-4">
                                                EndDate:
                                             <span class="required">* </span>
                                            </label>

                                            <div class="col-md-6">
                                                <div class="input-group">
                                                    <input type="text" id="ed_dt"  size="16" readonly style="cursor: pointer;" class="form-control " data-provide="datepicker" id="Text3" data-date-format="yyyy/mm/dd" name="eventenddate">
                                                </div>
                                            </div>
                                        </div>



                                        <div style="text-align: center">
                                            <button type="button" id="btn_search" class="btn   blue">Search</button>
                                            <button type="button" id="Button3" class="btn red" data-dismiss="modal">Cancel</button>

                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div style="text-align: center" id="div_search">


                                        <div class="portlet box blue">
                                            <div class="portlet-title">
                                                <div class="caption">
                                                    <i class="fa fa-cogs"></i>Events
                                                </div>
                                                <div class="tools">
                                                    <a href="javascript:;" class="collapse"></a>




                                                </div>
                                            </div>
                                            <div class=" ">
                                                <div class="col-md-12">
                                                    <table class="table" id="gridsearchevents" class="table table-striped table-hover table-bordered">

                                                        <thead>

                                                            <tr>

                                                                <th>Place</th>

                                                                <th>StartDate</th>

                                                                <th>EndDate</th>

                                                                <th>Description</th>
                                                                <th colspan="2"></th>
                                                            </tr>

                                                        </thead>

                                                        <tbody>
                                                        </tbody>

                                                    </table>


                                                </div>

                                                <br />

                                            </div>

                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="AddUpdateEvents" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">

                    <div>

                        <h4 class="modal-title" id="LabelHeadingAddUpdateEvent" style="font-weight: bold; float: left">Add Event:</h4>
                        <h4 class="modal-title" id="lblserviceid"></h4>
                        <div class="clearfix" style=""></div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <form action="#" class="form-horizontal">
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="portlet-body form">
                                <form id="form_Events" method="post" class="form-horizontal" role="form">
                                    <div class="form-body">
                                        <div class="alert alert-danger display-hide">
                                            <button class="close" data-close="alert"></button>
                                            You have some form errors. Please check below.
                                        </div>

                                        <div class="form-group">
                                            <label for="place" class="control-label col-md-4">
                                                Place:
                                             <span class="required">* </span>
                                            </label>

                                            <div class="col-md-6">
                                                <input type="text" id="place" name="place" placeholder="EventPlace" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="startdate" class="control-label col-md-4">
                                                StartDate:
                                             <span class="required">* </span>
                                            </label>

                                            <div class="col-md-6">
                                                <div class="input-group">
                                                    <input type="text" size="16" readonly style="cursor: pointer;" class="form-control " data-provide="datepicker" id="eventstartdate" data-date-format="yyyy/mm/dd" name="eventstartdate">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="enddate" class="control-label col-md-4">
                                                EndDate:
                                             <span class="required">* </span>
                                            </label>

                                            <div class="col-md-6">
                                                <div class="input-group">
                                                    <input type="text" size="16" readonly style="cursor: pointer;" class="form-control " data-provide="datepicker" id="eventenddate" data-date-format="yyyy/mm/dd" name="eventenddate">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-4">
                                                Description:<span class="required">
										* </span>
                                            </label>
                                            <div class="col-md-4">
                                                <textarea id="txtDesc" name="txtDesc" style="width: 350px; resize: none" class="form-control" rows="3" placeholder="Description"></textarea>
                                            </div>
                                        </div>


                                        <div style="text-align: center">
                                            <button type="submit" id="Submit" class="btn btn_add btn_op blue">Submit</button>
                                            <button type="button" id="Cancel" class="btn red" data-dismiss="modal">Cancel</button>

                                        </div>
                                    </div>
                                    <br />
                                    <div style="text-align: center" id="commentsdiv">



                                        <br />

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="dialog-del" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <p>Do YOU want to Delete this record?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnSRDelNo" class="btn red" data-dismiss="modal">No</button>
                    <button type="button" id="btnSRDelYes" class="btn blue" data-dismiss="modal">Yes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <input type="hidden" id="delete_value" />
        <div class="modal fade" id="dialog-details" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Event Details</h4>
                </div>
                <div class="modal-body">
                     <table width="100%" >
                        <tr>
                            <td width="45%"><strong>Place</strong></td>
                            <td id="modalPlace"></td>
                        </tr>
                        <tr>
                            <td><strong>Created Date</strong></td>
                            <td id="modalCreatedDate"></td>
                        </tr>
                        <tr>
                            <td><strong>Start Date</strong></td>
                            <td id="modalStartDate"></td>
                        </tr>
                        <tr>
                            <td><strong>End Date</strong></td>
                            <td id="modalEndDate"></td>
                        </tr>
                        <tr>
                            <td><strong>Description</strong></td>
                            <td id="modalDescription"></td>
                        </tr>
                        <tr>
                            <td><strong></strong></td>
                            <td id="googleMap"></td>
                        </tr>
                     </table>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnSRDelNo" class="btn blue" data-dismiss="modal">Close</button>
                 </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <div class="modal fade" id="success1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <p class="msgtext" id="msg_txt1"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" id="Button1" class="btn green" data-dismiss="modal">OK</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <div class="page-content" style="min-height: 1127px">
        <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->

        <!-- /.modal -->
        <!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
        <!-- BEGIN STYLE CUSTOMIZER -->

        <!-- END STYLE CUSTOMIZER -->
        <!-- BEGIN PAGE HEADER-->
        <h3 class="page-title">Calendar
        </h3>
        <div>
        </div>
        <div></div>
        <!-- END PAGE HEADER-->
        <!-- BEGIN PAGE CONTENT-->
        <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
                <!-- BEGIN EXAMPLE TABLE PORTLET-->
                <div class="portlet box blue">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="fa fa-edit"></i>Calendar
                        </div>

                    </div>
                    <div class="portlet-body">
                        <input type="button" class="btn blue add_event" id="btnmodal" name="btnmodal" value="Add Event" />
      <input type="button" class="btn blue seacrh_event" id="btn_searchmodal" name="btn_search" value="Search Event" />
      <input type="button" class="btn blue add_event" id="authorize-button" name="btnmodal" value="Authorize" />
      <input type="button" class="btn blue add_event" style="visibility:hidden;" id="btnCreateEvents" name="btnmodal" value="Sync With Google" />
        <input type="button" class="btn blue add_event" style="visibility:hidden;" id="btnsync" name="btnmodal" value="Sync With Google" />


                        <br />
                        <table class="table" id="gridEvents" class="table table-striped table-hover table-bordered">

                            <thead>

                                <tr>

                                    <th>Place</th>

                                    <th>StartDate</th>

                                    <th>EndDate</th>
                                    
                                    <th>Description</th>
                                    <th colspan="2"></th>
                                </tr>

                            </thead>

                            <tbody>

                                 
                            </tbody>

                        </table>


                    </div>
                </div>
                <!-- END EXAMPLE TABLE PORTLET-->
            </div>
            <div class="col-md-2"></div>
        </div>
        <!-- END PAGE CONTENT -->
    </div>

    <!-- END CONTENT -->
    <!-- BEGIN QUICK SIDEBAR -->


    <!-- END QUICK SIDEBAR -->


    <!-- END CONTAINER -->
    <!-- BEGIN FOOTER -->

    <!-- END FOOTER -->
    <!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
    <!-- BEGIN CORE PLUGINS -->
    <!--[if lt IE 9]>
<script src="assets/global/plugins/respond.min.js"></script>
<script src="assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
    <script src="assets/global/plugins/jquery-1.11.0.min.js" type="text/javascript"></script>
    <script src="assets/global/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
    <!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
    <script src="assets/global/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
    <script src="assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
    <script src="assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
    <script src="assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
    <script src="assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
    <script src="assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
    <!-- END CORE PLUGINS -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script type="text/javascript" src="assets/global/plugins/select2/select2.min.js"></script>
    <script type="text/javascript" src="assets/global/plugins/datatables/media/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="assets/global/plugins/datatables/extensions/TableTools/js/dataTables.tableTools.min.js"></script>
    <script type="text/javascript" src="assets/global/plugins/datatables/extensions/ColReorder/js/dataTables.colReorder.min.js"></script>
    <script type="text/javascript" src="assets/global/plugins/datatables/extensions/Scroller/js/dataTables.scroller.min.js"></script>
    <script type="text/javascript" src="assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
    <script type="text/javascript" src="assets/global/plugins/clockface/js/clockface.js"></script>
     <script src="assets/admin/pages/scripts/table-advanced.js"></script>
  
    
    <script type="text/javascript" src="assets/global/plugins/bootstrap-daterangepicker/moment.min.js"></script>
    <script type="text/javascript" src="assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
    <script type="text/javascript" src="assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js"></script>
    <script type="text/javascript" src="assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <!-- END PAGE LEVEL PLUGINS -->
    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="assets/global/scripts/metronic.js" type="text/javascript"></script>
    <script src="assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
    <script src="assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
    <script src="assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
    <script src="assets/admin/pages/scripts/table-editable.js"></script>
    <script src="assets/admin/pages/scripts/form-validation.js"></script>
    <script type="text/javascript" src="assets/global/plugins/jquery-validation/js/jquery.validate.min.js"></script>
    <script type="text/javascript" src="assets/global/plugins/jquery-validation/js/additional-methods.min.js"></script>
    <script src="JsCalendar.js"></script>
  <script src="googleCal.js"></script>
    <script src="https://apis.google.com/js/client.js?onload=handleClientLoad" type="text/javascript"></script>
</body>
<!-- END BODY -->
</html>

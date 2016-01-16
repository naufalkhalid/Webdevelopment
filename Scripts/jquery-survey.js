
$(document).ready(function () {

   
    // User Survey View Model
    $(function () {


        $(".AnswerQuestion").click(function () {

            var RecID = $(this).attr("id");
            $.ajax({
                url: "Survey.aspx/GetSurveyQuestions",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"SurveyID":"' + RecID + '"}',
                dataType: "json",
                success: OnViewSurveyQuestionSuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        });

        function OnViewSurveyQuestionSuccess(response) {

            var objSurvQuest = JSON.parse(response.d);
          
            for (var i = 0; i < objSurvQuest.length; i++) {

                for (var keyValue in objSurvQuest[i]) {

                    if (keyValue == "SurveyTopic")
                        $("#lblSurveyHeading").text(objSurvQuest[i][keyValue]);

                    if (keyValue == "Question")
                        $("#lblQuestion").text("Question: " + objSurvQuest[i][keyValue]);

                   
                    if (keyValue == "AnswerID") {
                        if (i == 0) 
                            $("#radAnswer1").val(objSurvQuest[i][keyValue]);
                        if (i == 1) 
                            $("#radAnswer2").val(objSurvQuest[i][keyValue]);
                    }

                    if (keyValue == "OfferedAnswer") {
                    }

                }
            }

            $("#dialog-form").modal('show');
        }

        $("#btnSubmitSurvey").click(function () {


            var SurveyUserAnswer = {
                Description: $("#txtComments").val(),
                Status: "Answered",
                UserAnswerID: $("input:radio[name=radAnswers]:checked").val(),
                
            }

            $.ajax({
                url: "Survey.aspx/SubmitSurveyAnswers",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: "{'SurveyUserAnswer':" + JSON.stringify(SurveyUserAnswer) + "}",
                dataType: "json",
                success: OnViewSurveyReplySuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });

            
        });
        $("#btnDeclineSurvey").click(function () {


            var SurveyUserAnswer = {
                Description: $("#txtComments").val(),
                Status: "Declined"
            }

            $.ajax({
                url: "Survey.aspx/SubmitSurveyAnswers",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: "{'SurveyUserAnswer':" + JSON.stringify(SurveyUserAnswer) + "}",
                dataType: "json",
                success: OnViewSurveyReplySuccess,
                failure: function (response) {
                    //alert(response.d);
                }
            });


        });

        function OnViewSurveyReplySuccess(response) {

            switch (response.d) {
                case "True":
                    $(".msgtext").text("Survey Repaly is submitted successfully.")
                    $('#dialog-message-Model').modal('show');
                    break;

                case "False":
                    $(".msgtext").text("Survey Repaly is not submitted.");
                    $('#dialog-message-Model').modal('show');
                    break;
            }
            
        }

        $("#btnDeclineSurvey").click(function () {
            document.location = "Survey.aspx";
        });

        $("#btnOk").click(function () {
            document.location = "Survey.aspx";
        });

    });

    // Admin Survey View Model
    $(function () {
   
        $("#btnAddSurvey").click(function () {
            
            $("#hdnAddUpdSurv").val("Add");
            $("#dialog-form").modal('show');
        });

        $("#btnSubmitAdminSurvey").click(function () {
            
            if ($("#hdnAddUpdSurv").val() == "Add")
                AddSurvey();
            else
                UpdateSurvey();

           
        });

        function AddSurvey() {

            var SurveyTopic = $("#txtAdminTopic").val();
            var Question = $("#txtAdminQuestion").val();
            var OfferedAnswer1 = $("#txtAdminAns1").val();
            var OfferedAnswer2 = $("#txtAdminAns2").val();
            var OfferedAnswer3 = $("#txtAdminAns3").val();
            var OfferedAnswer4 = $("#txtAdminAns4").val();

            $.ajax({
                url: "Survey.aspx/SubmitAdminSurvey",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"SurveyTopic":"' + SurveyTopic + '","Question":"' + Question + '","OfferedAnswer1":"' + OfferedAnswer1 + '","OfferedAnswer2":"' + OfferedAnswer2 + '","OfferedAnswer3":"' + OfferedAnswer3 + '","OfferedAnswer4":"' + OfferedAnswer4 + '"}',
                dataType: "json",
                success: OnAdminSurveySetup,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        }
        function UpdateSurvey() {

            
            var SurveyID = $("#hdnSurveyID").val();
            var SurveyTopic = $("#txtAdminTopic").val();
            var QuesID = $("#hdnQuestionID").val();
            var Question = $("#txtAdminQuestion").val();
            var OffAnsID1 = $("#hdnOfferedID1").val();
            var OffAns1 = $("#txtAdminAns1").val();
            var OffAnsID2 = $("#hdnOfferedID2").val();
            var OffAns2 = $("#txtAdminAns2").val();
            var OffAnsID3 = $("#hdnOfferedID3").val();
            var OffAns3 = $("#txtAdminAns3").val();
            var OffAnsID4 = $("#hdnOfferedID4").val();
            var OffAns4 = $("#txtAdminAns4").val();

            alert('1');
            $.ajax({
                url: "Survey.aspx/EditAdminSurveySetUp",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"SurveyID":"' + SurveyID + '","SurveyTopic":"' + SurveyTopic + '","QuesID":"' + QuesID + '","Question":"' + Question + '","OffAnsID1":"' + OffAnsID1 + '","OffAns1":"' + OffAns1 + '","OffAnsID2":"' + OffAnsID2 + '","OffAns2":"' + OffAns2 + '","OffAnsID3":"' + OffAnsID3 + '","OffAns3":"' + OffAns3 + '","OffAnsID4":"' + OffAnsID4 + '","OffAns4":"' + OffAns4 + '"}',
                dataType: "json",
                success: OnAdminSurveySetup,
                failure: function (response) {
                    //alert(response.d);
                }
            });



        }

        function OnAdminSurveySetup(response) {

          $(".msgtext").text(response.d)
          $('#dialog-message-Model').modal('show');  
         
        }

        $(".AdminEditQuestion").click(function () {

            var RecID = $(this).attr("id");
            $("#hdnAddUpdSurv").val("Update");
            $.ajax({
                url: "Survey.aspx/GetSurveyQuestions",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{"SurveyID":"' + RecID + '"}',
                dataType: "json",
                success: OnEditAdminSurveySetUp,
                failure: function (response) {
                    //alert(response.d);
                }
            });
        });

        function OnEditAdminSurveySetUp(response) {
            
            var objSurvQuest = JSON.parse(response.d);
            $("#dialog-form").modal('show');
            for (var i = 0; i < objSurvQuest.length; i++) {

                for (var keyValue in objSurvQuest[i]) {

                    if (keyValue == "ID")
                        $("#hdnSurveyID").val(objSurvQuest[i][keyValue]);

                    if (keyValue == "SurveyTopic")
                        $("#txtAdminTopic").val(objSurvQuest[i][keyValue]);

                    if (keyValue == "QuestionID")
                        $("#hdnQuestionID").val(objSurvQuest[i][keyValue]);

                    if (keyValue == "Question")
                        $("#txtAdminQuestion").val(objSurvQuest[i][keyValue]);

                    if (keyValue == "AnswerID") {
                        if (i == 0)
                            $("#hdnOfferedID1").val(objSurvQuest[i][keyValue]);
                        if (i == 1)
                            $("#hdnOfferedID2").val(objSurvQuest[i][keyValue]);
                        if (i == 2)
                            $("#hdnOfferedID3").val(objSurvQuest[i][keyValue]);
                        if (i == 3)
                            $("#hdnOfferedID4").val(objSurvQuest[i][keyValue]);
                    }

                    if (keyValue == "OfferedAnswer") {
                        if (i == 0)
                            $("#txtAdminAns1").val(objSurvQuest[i][keyValue]);
                        if (i == 1)
                            $("#txtAdminAns2").val(objSurvQuest[i][keyValue]);
                        if (i == 2)
                            $("#txtAdminAns3").val(objSurvQuest[i][keyValue]);
                        if (i == 3)
                            $("#txtAdminAns4").val(objSurvQuest[i][keyValue]);
                    }


                }
            }
        }

        $("#btnDelSurveyYes").click(function () {

            var RecID = $(this).attr("id");

        });
    });
});
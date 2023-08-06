let risposteEsatte = 0;
let domandeTotali = 0;

function setNewQuestion(){
    $.ajax({
        url: "NewQuestionServlet", success: function (responseJson) {
            if (responseJson != null){
                $("#testoDomanda").text(responseJson.testo);
                $("#RispostaEsatta").val(responseJson.rispostaEsatta);
                $(".pulsantiRisposta").remove();
                $.each(responseJson.risposte, function (index, risposta) {
                    $("#containerRisposte").append("<button class='pulsantiRisposta' id='pulsante" + index + "' onclick='verificaRisposta(" + index + ")'>" + risposta + "</button>");
                })
            }
            else setNewQuestion();
        }
    })
}

function verificaRisposta(i){
    let pulsantePremuto = $("#pulsante"+i).text();
    if (pulsantePremuto == $("#RispostaEsatta").val()){
        risposteEsatte++;
        updateCounters();
        showAnswerResult(true, $("#RispostaEsatta").val());
    }
    else {
        updateCounters();
        showAnswerResult(false, $("#RispostaEsatta").val());
    }
    if (domandeTotali < 20)
        setNewQuestion();
    else
        endQuiz();
}

function updateCounters(){
    domandeTotali++;
    $("#answerCounter").html("Risposte Corrette: " + risposteEsatte + "<br>Risposte Totali: " + domandeTotali);
}

function showAnswerResult (correct, answer){
    $("#checkAnswer").show();
    $("#testoDomanda").hide();
    $("#containerRisposte").hide();
    if (correct){
        $("#checkAnswer").text("Risposta esatta!\nClicca qui per continuare!");
    }
    else {
        $("#checkAnswer").text("Risposta Errata! La risposta esatta era " + answer + "\nClicca qui per continuare");
    }
}

function newAnswer() {
    $("#checkAnswer").hide();
    $("#testoDomanda").show();
    $("#containerRisposte").show();
}

function endQuiz(){
    $("#checkAnswer").remove();
    $("#testoDomanda").remove();
    $("#containerRisposte").remove();
    $("#answerCounter").remove();
    $("body").append("<a href='index.jsp' id='endQuizAnchor'><div id='EndQuiz'>Quiz Terminato! <br> Risposte Corrette: " + risposteEsatte +
        "<br>Risposte Totali: " + domandeTotali + "<br>Premere sul riquadro per tornare alla Homepage</div></a>");
}
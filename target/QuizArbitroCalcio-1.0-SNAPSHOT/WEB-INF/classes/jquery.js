let risposteCorrette = 0;
let totali = 0;
const idBandiere = new Array();
let nazioniGioco;
let offset;


$(document).ready(function () {
    $("#FlagQuiz").click(function () {
        $(".ButtonQuiz").hide();
        $("#TitleHeader").text("Guess the flag QUIZ");
        categorySelector(0);
    })
})

function chooseNation (x){
    let nazioniTotali = $("#TotaleNazioni").val();
    switch (x){
        case 0:
            nazioniGioco = 47;
            offset = 0;
            break;
        case 1:
            offset = 47;
            nazioniGioco = 47;
            break;
        case 2:
            offset = 94;
            nazioniGioco = 34;
            break;
        case 3:
            offset = 128;
            nazioniGioco = 53;
            break;
        case 4:
            offset = 181;
            nazioniGioco = nazioniTotali - offset;
            break;
        case 5:
            nazioniGioco = nazioniTotali;
            offset = 0;
            break;
        default:
            nazioniGioco = nazioniTotali;
            offset = 0;
            break;
    }
    let flagID = Math.floor(Math.random() * nazioniGioco + 1) + offset;
    while (idBandiere.includes(flagID)){
        flagID = Math.floor(Math.random() * nazioniGioco + 1) + offset;
    }
    return flagID;
}

function flagQuiz (x){
    $(".ButtonCategory").remove();
    $("#categoryHeader").remove();
    let flagID = chooseNation(x);
    $("body").append("<div id='BandieraDiv'>" +
        "<img src='./ImgServlet?id=" + flagID + "' id='flagImg'><br>" +
        "<input type='text' value='Inserisci Nazione' id='nationInput' ondblclick='cancelVal()'> " +
        "<input type='button' id='SubmitButton' class='bottone' value='Verifica Risultato' onclick='verificaRisposta(" + flagID + ", " + x +")'>" +
        "<p id='risultato'>Risposte Corrette: " + risposteCorrette + " / Totali: " + totali + " </p>" +
        "<input type='button' class='bottone' value='Nuova Partita' onclick='newGame(0)'> " +
        "<input type='button' class='bottone' value='Torna al Menu Principale' onclick='backToMenu()'>" +
        "<input type='button' class='bottone' value='Termina Partita' onclick='endQuiz(0)'> </div>");
}

function capitalQuiz (x){
    $(".ButtonCategory").remove();
    $("#categoryHeader").remove();
    let flagID = chooseNation(x);
    $("body").append("<div id='BandieraDiv'>" +
        "<img src='./ImgServlet?id=" + flagID + "' id='flagImg'><br>" +
        "<input type='text' value='Inserisci Capitale' id='nationInput' ondblclick='cancelVal()'> " +
        "<input type='button' id='SubmitButton' class='bottone' value='Verifica Risultato' onclick='verificaRisposta2(" + flagID + ", " + x + ")'>" +
        "<p id='risultato'>Risposte Corrette: " + risposteCorrette + " / Totali: " + totali + " </p>" +
        "<input type='button' id='ResetButton' class='bottone'  value='Nuova Partita' onclick='newGame(1)'> " +
        "<input type='button' id='ResetButton' class='bottone'  value='Torna al Menu Principale' onclick='backToMenu()'>" +
        "<input type='button' class='bottone' value='Termina Partita' onclick='endQuiz(1)'></div>");
}


function verificaRisposta(flagID, x){
    let userInput = $("#nationInput").val();
    $.get("CheckAnswerServlet?flagID=" + flagID, function (responseJson) {
        $("#SubmitButton").remove();
        $("#nationInput").prop("disabled", true);
        totali++;
        $.each(responseJson, function (index, bandiera) {
            if (bandiera.nazione.toLowerCase() == userInput.toLowerCase()) {
                risposteCorrette++;
                $("#risultato").html("Risposta Corretta<br>Nazione: " + bandiera.nazione + "<br>Capitale: " + bandiera.capitale +
                    "<br>Continente: " + bandiera.continente + "<br>Risposte Corrette: " + risposteCorrette + " / Totali: " + totali);
            } else {
                $("#risultato").html("Risposta Errata<br>Nazione: " + bandiera.nazione + "<br>Capitale: " + bandiera.capitale +
                    "<br>Continente: " + bandiera.continente + "<br>Risposte Corrette: " + risposteCorrette + " / Totali: " + totali);
            }
        })
        $("#risultato").append("<br><input type='button' class='bottone' value='Continua a Giocare' onclick='continueQuiz(0, " + x + ")'>");
        idBandiere.push(flagID);
    })
}

function verificaRisposta2(flagID, x){
    let userInput = $("#nationInput").val();
    $.get("CheckAnswerServlet?flagID=" + flagID, function (responseJson) {
        $("#SubmitButton").remove();
        totali++;
        $("#nationInput").prop("disabled", true);
        $.each(responseJson, function (index, bandiera) {
            if (bandiera.capitale.toLowerCase() == userInput.toLowerCase()) {
                risposteCorrette++;
                $("#risultato").html("Risposta Corretta<br>Nazione: " + bandiera.nazione + "<br>Capitale: " + bandiera.capitale +
                    "<br>Continente: " + bandiera.continente + "<br>Risposte Corrette: " + risposteCorrette + " / Totali: " + totali);
            } else {
                $("#risultato").html("Risposta Errata<br>Nazione: " + bandiera.nazione + "<br>Capitale: " + bandiera.capitale +
                    "<br>Continente: " + bandiera.continente + "<br>Risposte Corrette: " + risposteCorrette + " / Totali: " + totali);
            }
        })
        $("#risultato").append("<br><input type='button' class='bottone' value='Continua a Giocare' onclick='continueQuiz(1, " + x + ")'>");
        idBandiere.push(flagID);
    })
}

$(document).ready(function () {
    $("#CapitalQuiz").click(function () {
        $(".ButtonQuiz").hide();
        $("#TitleHeader").text("Guess the Capital QUIZ");
        categorySelector(1);
    })
})

function cancelVal(){
    $("#nationInput").val("");
}

function backToMenu(){
    $("#BandieraDiv").remove();
    $(".ButtonQuiz").show();
    $("#TitleHeader").text("GeoTest");
    idBandiere.forEach(function () {
        idBandiere.pop();
    })
    risposteCorrette = 0;
    totali = 0;
}

$(document).ready(function(){
    $("#InsertNations").click(function () {
        $(".ButtonQuiz").hide();
        insert2();
    })
})

function insert2() {
    $("#TitleHeader").text("Insert new nations");
    $("body").append("<form action='InsertNationServlet' id='BandieraDiv' method='post' enctype='multipart/form-data'>" +
        "<label for='NomeNazione'>Inserisci il nome della nuova nazione </label>" +
        "<input type='text' name='NomeNazione'id='NomeNazione'><br><br>" +
        "<label for='CapitaleNazione'>Inserisci la capitale della nuova nazione </label>" +
        "<input type='text' name='CapitaleNazione'id='CapitaleNazione'><br><br>" +
        "<label for='ContinenteNazione'>Inserisci il continente della nuova nazione </label>" +
        "<input type='text' name='ContinenteNazione'id='ContinenteNazione'><br><br>" +
        "<label for='bandiera'>Inserisci la bandiera della nuova nazione </label>" +
        "<input type='file' name='bandiera' id='bandiera'><br><br>" +
        "<input type='submit' id='SubmitButton2' value='Inserisci la nazione''> " +
        "<input type='button' value='Torna al menu principale' onclick='backToMenu()'>" +
        "</form>");
}

$(document).ready(updateCounter())

function updateCounter (){
    $.ajax({url: "CountNationsServlet", success: function (counter) {
            $("#TotaleNazioni").val(counter);
        }})
}

function endQuiz (quizType) {
    $("#BandieraDiv").remove();
    $("body").append("<div id='BandieraDiv'>" +
        "<h2>Gioco Terminato</h2>" +
        "<p id='risultato'>Risposte Corrette: " + risposteCorrette + " / Totali: " + totali + " </p>" +
        "<input type='button' id='ResetButton' class='bottone' value='Nuova Partita' onclick='newGame(" + quizType + ")'> " +
        "<input type='button' id='ResetButton' class='bottone' value='Torna al Menu Principale' onclick='backToMenu()'></div>");
}

function newGame (quizType){
    totali = 0;
    risposteCorrette = 0;
    idBandiere.forEach(function () {
        idBandiere.pop();
    })
    categorySelector(quizType);
}

function continueQuiz (quizType, x) {
    $("#BandieraDiv").remove();
    if (nazioniGioco == totali)
        endQuiz(quizType);
    else {
        if (quizType == 0)
            flagQuiz(x);
        else
            capitalQuiz(x);
    }
}

function categorySelector(quizType) {
    $("#BandieraDiv").remove();
    if (quizType == 0)
    $("body").append("<h2 id='categoryHeader'>Choose the continent</h2>" +
        "<button class='ButtonCategory' id='EuropeQuiz' onclick='flagQuiz(0)'>Europe</button>" +
        "<button class='ButtonCategory' id='AsiaQuiz' onclick='flagQuiz(1)'>Asia</button>" +
        "<button class='ButtonCategory ' id='AmericaQuiz' onclick='flagQuiz(2)'>America</button>" +
        "<button class='ButtonCategory' id='AfricaQuiz' onclick='flagQuiz(3)'>Africa</button>" +
        "<button class='ButtonCategory' id='OceaniaQuiz' onclick='flagQuiz(4)'>Oceania</button>" +
        "<button class='ButtonCategory' id='WorldQuiz' onclick='flagQuiz(5)'>All the continents</button>");
    else
        $("body").append("<h2 id='categoryHeader'>Choose the continent</h2>" +
            "<button class='ButtonCategory' id='EuropeQuiz' onclick='capitalQuiz(0)'>Europe</button>" +
            "<button class='ButtonCategory' id='AsiaQuiz' onclick='capitalQuiz(1)'>Asia</button>" +
            "<button class='ButtonCategory' id='AmericaQuiz' onclick='capitalQuiz(2)'>America</button>" +
            "<button class='ButtonCategory' id='AfricaQuiz' onclick='capitalQuiz(3)'>Africa</button>" +
            "<button class='ButtonCategory' id='OceaniaQuiz' onclick='capitalQuiz(4)'>Oceania</button>" +
            "<button class='ButtonCategory' id='WorldQuiz' onclick='capitalQuiz(5)'>All the continents</button>");
}

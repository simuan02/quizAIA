<%@ page import="model.Domanda" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="model.DomandaDAO" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Random" %>
<%@ page import="java.sql.SQLException" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Quiz Arbitro</title>
    <link type="text/css" rel="stylesheet" href="stylesheet.css">
    <script src ="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="script.js"></script>
</head>
<body>
    <h1 id="firstTitle">QUIZ A.I.A. COMPLETO</h1>
    <hr>

    <%
        List<Domanda> allQuestions;
        Domanda d = null;
        try {
            allQuestions = DomandaDAO.findAll();
            Random r = new Random();
            d = allQuestions.get(r.nextInt(allQuestions.size()));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        %>
    <p id="testoDomanda"><%=d.getTesto()%></p>
        <div id="containerRisposte">
    <%
        int i = 0;
        for (String risposta: d.getRisposte()){
        %>
            <button class="pulsantiRisposta" id="pulsante<%=i%>" onclick="verificaRisposta(<%=i%>)"><%=risposta%></button>
            <%
            i++;
        }
    %>
        </div>
    <div id = "checkAnswer" onclick="setTimeout(newAnswer, 1500)"></div>
    <input type="hidden" id="RispostaEsatta" value="<%=d.getRispostaEsatta()%>">
    <p id = answerCounter>Risposte Corrette: 0<br>Risposte Totali: 0</p>
</body>
</html>

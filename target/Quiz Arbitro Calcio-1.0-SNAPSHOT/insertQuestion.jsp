<%--
  Created by IntelliJ IDEA.
  User: Limon
  Date: 30/07/2023
  Time: 18:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Quiz Arbitro</title>
    <link type="text/css" rel="stylesheet" href="stylesheet.css">
</head>
<body>
<h1 id="firstTitle">QUIZ A.I.A. COMPLETO</h1>
<hr>
<form action="InsertQuestionServlet" method="post">
    <label for="TestoDomanda2">Inserisci il testo della domanda </label><br>
    <input type="text" name="TestoDomanda2" maxlength="255" id="TestoDomanda2" class="FormInputs"><br>
    <label for="PossibleAnswers">Inserisci le possibili risposte, separate da ;</label><br>
    <input type="text" name="PossibleAnswers" id="PossibleAnswers" class="FormInputs"><br>
    <label for="CorrectAnswer">Inserisci la risposta esatta tra le precedenti  </label>
    <input type="text" name="CorrectAnswer" id="CorrectAnswer" class="FormInputs"><br>
    <input type="submit" value="Invia domanda" id="FormSubmit">
</form>
</body>
</html>

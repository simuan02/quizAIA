<%@ page import="model.Domanda" %>
<%@ page import="model.DomandaDAO" %>
<%@ page import="java.sql.SQLException" %><%--
  Created by IntelliJ IDEA.
  User: Simone
  Date: 25/07/2023
  Time: 23:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Quiz Arbitro</title>
    <link type="text/css" rel="stylesheet" href="stylesheet.css">
</head>
<body>
<%
    HttpSession session2 = request.getSession();
    try {
        session2.setAttribute("NumeroDomandeDB", DomandaDAO.findAll().size());
    } catch (SQLException e) {
        e.printStackTrace();
    }
%>
<h1 id="firstTitle">QUIZ A.I.A. COMPLETO</h1>
<hr>
<button type="submit" class="StartButton"><a href="quiz.jsp" class="StartLink">Inizia il Quiz</a></button>
<button type="submit" class="StartButton"><a href="insertQuestion.jsp" class="StartLink">Inserisci una nuova domanda</a></button>
</body>
</html>

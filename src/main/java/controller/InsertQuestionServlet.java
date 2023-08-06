package controller;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import model.Domanda;
import model.DomandaDAO;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "InsertQuestionServlet", value = "/InsertQuestionServlet")
public class InsertQuestionServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String testoDomanda = request.getParameter("TestoDomanda2");
        String risposte = request.getParameter("PossibleAnswers");
        String rispostaEsatta = request.getParameter("CorrectAnswer");
        String[] possibiliRisposte = risposte.split(";");
        ArrayList<String> possibiliRisposte2 = new ArrayList<>();
        for (int i = 0; i < possibiliRisposte.length; i++){
            possibiliRisposte2.add(possibiliRisposte[i]);
        }
        if (!possibiliRisposte2.contains(rispostaEsatta)){
        }
        else {
            Domanda d = new Domanda();
            d.setTesto(testoDomanda);
            d.setRispostaEsatta(rispostaEsatta);
            d.setRisposte(possibiliRisposte2);
            try{
                DomandaDAO.insertQuestion(d);
            }
            catch(SQLException e){
            }
        }
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/index.jsp");
        dispatcher.forward(request, response);
    }
}

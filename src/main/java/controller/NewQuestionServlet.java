package controller;

import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import model.Domanda;
import model.DomandaDAO;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Random;

@WebServlet(name = "NewQuestionServlet", value = "/NewQuestionServlet")
public class NewQuestionServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Random r = new Random();
        try {
            int idDomanda = r.nextInt((int)request.getSession().getAttribute("NumeroDomandeDB") + 1);
            Domanda d = DomandaDAO.findById(idDomanda);
            String json = new Gson().toJson(d);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}

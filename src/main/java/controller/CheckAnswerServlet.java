package controller;

import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "CheckAnswerServlet", value = "/CheckAnswerServlet")
public class CheckAnswerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*int id = Integer.parseInt(request.getParameter("flagID"));
        Bandiera b = BandieraDAO.doRetrieveByID(id);
        List<Bandiera> bandieraList = new ArrayList<>();
        bandieraList.add(b);
        String json = new Gson().toJson(bandieraList);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);*/
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}

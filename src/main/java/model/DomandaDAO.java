package model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DomandaDAO {

    public static List<Domanda> findAll () throws SQLException {
        Connection conn = ConPool.getConnection();
        Statement stmt = conn.createStatement();
        String query = "SELECT * FROM Domanda";
        List<Domanda> domande = new ArrayList<>();
        ResultSet rs = stmt.executeQuery(query);
        while(rs.next()){
            Domanda d = new Domanda();
            d.setTesto(rs.getString(2));
            d.setRispostaEsatta(rs.getString(3));
            d.setRisposte(findAllAnswersById(rs.getInt(1), conn));
            domande.add(d);
        }
        return domande;
    }
    public static Domanda findById (int id) throws SQLException {
        Connection conn = ConPool.getConnection();
        Statement stmt = conn.createStatement();
        String query = "SELECT * FROM Domanda WHERE id= " + id;
        ResultSet rs = stmt.executeQuery(query);
        if(rs.next()){
            Domanda d = new Domanda();
            d.setTesto(rs.getString(2));
            d.setRispostaEsatta(rs.getString(3));
            d.setRisposte(findAllAnswersById(rs.getInt(1), conn));
            return d;
        }
        return null;
    }

    private static List<String> findAllAnswersById(int id, Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        String query = "SELECT risposta FROM RisposteDomanda WHERE domanda = " + id;
        List<String> risposte = new ArrayList<>();
        ResultSet rs = stmt.executeQuery(query);
        while(rs.next()){
            risposte.add(rs.getString(1));
        }
        return risposte;
    }

    public static void insertQuestion(Domanda d) throws SQLException{
        Connection conn = ConPool.getConnection();
        PreparedStatement pstmt = conn.prepareStatement("INSERT INTO Domanda (testo, rispostaEsatta) VALUES (?, ?)");
        pstmt.setString(1, d.getTesto());
        pstmt.setString(2, d.getRispostaEsatta());
        pstmt.executeUpdate();
        insertPossibleAnswers(d);
    }

    private static int getLastQuestionID() throws SQLException {
        Connection conn = ConPool.getConnection();
        Statement stmt = conn.createStatement();
        String query = "SELECT * FROM Domanda";
        int id = -1;
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()){
            id = rs.getInt(1);
        }
        return id;
    }

    public static void insertPossibleAnswers(Domanda d) throws SQLException {
        Connection conn = ConPool.getConnection();
        int insertedQuestionId = getLastQuestionID();
        for (String risposta : d.getRisposte()){
            PreparedStatement pstmt = conn.prepareStatement("INSERT INTO risposteDomanda VALUES (?, ?)");
            pstmt.setString(1, risposta);
            pstmt.setInt(2, insertedQuestionId);
            pstmt.executeUpdate();
        }
    }
}

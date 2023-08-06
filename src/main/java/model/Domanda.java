package model;

import java.util.ArrayList;
import java.util.List;

public class Domanda {

    public Domanda() {
    }

    public String getTesto() {
        return testo;
    }

    public void setTesto(String testo) {
        this.testo = testo;
    }

    public String getRispostaEsatta() {
        return rispostaEsatta;
    }

    public void setRispostaEsatta(String rispostaEsatta) {
        this.rispostaEsatta = rispostaEsatta;
    }

    public List<String> getRisposte() {
        return risposte;
    }

    public void setRisposte(List<String> risposte) {
        this.risposte = risposte;
    }

    private String testo;
    private String rispostaEsatta;
    private List<String> risposte;
}
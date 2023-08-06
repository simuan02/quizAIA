package model;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.TimeZone;

public class ConPool {

    private static DataSource datasource;
    public static Connection getConnection() throws SQLException {
        if (datasource == null) {
            PoolProperties p = new PoolProperties();
            p.setUrl("jdbc:mysql://database-domande-reg-calcio.cbhupd99vbtp.eu-north-1.rds.amazonaws.com:3306/DomandeCalcioDB?serverTimezone=" + TimeZone.getDefault().getID());
            p.setDriverClassName("com.mysql.cj.jdbc.Driver");
            p.setUsername("admin");
            p.setPassword("Stricken");
            p.setMaxActive(100);
            p.setInitialSize(10);
            p.setMinIdle(10);
            p.setRemoveAbandonedTimeout(60);
            p.setRemoveAbandoned(true);
            datasource = new DataSource();
            datasource.setPoolProperties(p);
        }
        return datasource.getConnection();
    }
}

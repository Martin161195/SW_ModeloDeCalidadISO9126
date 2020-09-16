package pe.com.swmciso.webservice.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import pe.com.swmciso.webservice.bean.Entidad;
import pe.com.swmciso.webservice.dao.ISwmcisoDAO;
import pe.com.swmciso.webservice.response.ResponseGetCaracteristicas;
import pe.com.swmciso.webservice.response.ResponseGetMetricas;
import pe.com.swmciso.webservice.response.ResponseGetSubcaracteristicas;

@Slf4j
@Transactional
@Repository
public class SwmcisoDAOImpl implements ISwmcisoDAO {

	@Autowired
	private JdbcTemplate bigTConn;

	@Override
	public ResponseGetCaracteristicas getCaracteristicas() {
		ResponseGetCaracteristicas response = new ResponseGetCaracteristicas();
		List<Entidad> lista = new ArrayList<Entidad>();
		String storeProcedure = "PROC_listar_caracteristicas";
		log.info("INICIO - getCaracteristicas");
		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + storeProcedure + "}");
			callStmt.execute();

			ResultSet rs = callStmt.getResultSet();

			while (rs.next()) {
				Entidad valor = new Entidad();
				valor.setId(rs.getInt("id"));
				valor.setNombre(rs.getString("nombre"));
				lista.add(valor);
			}

			response.setCaracteristicas(lista);
			log.info("FIN - getCaracteristicas");
			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseGetSubcaracteristicas getSubcaracteristicas(Integer idCaracteristica) {
		ResponseGetSubcaracteristicas response = new ResponseGetSubcaracteristicas();
		List<Entidad> lista = new ArrayList<Entidad>();
		String storeProcedure = "PROC_listar_subcaracteristicas";
		log.info("INICIO - getSubcaracteristicas");
		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + storeProcedure + "(?)}");
			callStmt.setInt(1, idCaracteristica);
			callStmt.execute();

			ResultSet rs = callStmt.getResultSet();

			while (rs.next()) {
				Entidad valor = new Entidad();
				valor.setId(rs.getInt("id"));
				valor.setNombre(rs.getString("nombre"));
				lista.add(valor);
			}

			response.setSubcaracteristicas(lista);
			log.info("FIN - getSubcaracteristicas");
			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseGetMetricas getMetricas(Integer idSubcaracteristica) {
		ResponseGetMetricas response = new ResponseGetMetricas();
		List<Entidad> lista = new ArrayList<Entidad>();
		String storeProcedure = "PROC_listar_metricas";
		log.info("INICIO - getMetricas");
		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + storeProcedure + "(?)}");
			callStmt.setInt(1, idSubcaracteristica);
			callStmt.execute();

			ResultSet rs = callStmt.getResultSet();

			while (rs.next()) {
				Entidad valor = new Entidad();
				valor.setId(rs.getInt("id"));
				valor.setNombre(rs.getString("nombre"));
				lista.add(valor);
			}

			response.setMetricas(lista);
			log.info("FIN - getMetricas");
			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}
}

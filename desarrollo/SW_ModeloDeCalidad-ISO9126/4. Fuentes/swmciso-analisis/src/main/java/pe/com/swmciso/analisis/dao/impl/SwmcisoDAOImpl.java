package pe.com.swmciso.analisis.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import pe.com.swmciso.analisis.dao.ISwmcisoDAO;
import pe.com.swmciso.analisis.request.RequestGuardarMatrizPareada;
import pe.com.swmciso.analisis.request.RequestGuardarPonderacionEntidad;
import pe.com.swmciso.analisis.response.ResponseGuardarMatrizPareada;
import pe.com.swmciso.analisis.response.ResponseGuardarPonderacionEntidad;

@Slf4j
@Transactional
@Repository
public class SwmcisoDAOImpl implements ISwmcisoDAO {

	@Autowired
	JdbcTemplate bigTConn;

	@Override
	public ResponseGuardarMatrizPareada guardarMatrizPareada(RequestGuardarMatrizPareada request) {
		ResponseGuardarMatrizPareada response = new ResponseGuardarMatrizPareada();
		String spTransporte = "PROC_guardar_matriz_pareada";
		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?,?,?,?)}");
			callStmt.setInt(1, request.getIdProyecto());
			callStmt.setInt(2, request.getIdEntidadX());
			callStmt.setInt(3, request.getIdEntidadY());
			callStmt.setBigDecimal(4, request.getValor());
			callStmt.setString(5, request.getTipo());
			callStmt.setInt(6, request.getIdEntidadPadre());
			callStmt.registerOutParameter(7, Types.INTEGER);
			callStmt.registerOutParameter(8, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(3));
			response.setMessage(callStmt.getString(4));

			log.info(response.getMessage());

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseGuardarPonderacionEntidad guardarPonderacionEntidad(RequestGuardarPonderacionEntidad request) {
		// TODO Auto-generated method stub
		return null;
	}
}

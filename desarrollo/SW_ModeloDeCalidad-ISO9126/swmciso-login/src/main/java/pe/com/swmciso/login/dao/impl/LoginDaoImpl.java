package pe.com.swmciso.login.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import pe.com.swmciso.login.bean.RequestLoginBean;
import pe.com.swmciso.login.bean.RequestRegisterBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseRegisterBean;
import pe.com.swmciso.login.dao.ILoginDao;

@Slf4j
@Transactional
@Repository
public class LoginDaoImpl implements ILoginDao {

	@Autowired
	JdbcTemplate bigTConn;

	@Override
	public ResponseLoginBean actualizarCud(RequestLoginBean request) {
		ResponseLoginBean response = new ResponseLoginBean();
		String spTransporte = "POCEDURE_HECHO_POR_EDUARDO";

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?)}");
			callStmt.setString(1, request.getUser());
			callStmt.setString(2, request.getPassword());
			callStmt.registerOutParameter(3, Types.INTEGER);
			callStmt.registerOutParameter(4, Types.VARCHAR);
			callStmt.registerOutParameter(5, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(3));
			response.setMessage(callStmt.getString(4));
			response.setRoles(callStmt.getString(5));

			log.info(response.getMessage());

			if (response.getCode() != 0 && response.getCode() != 1 && response.getCode() != 2) {
				response.setCode(-1);
				response.setMessage("Ha ocurrido un error. Intente nuevamente");
			}

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseRegisterBean registerUser(RequestRegisterBean requestRegisterBean) {
		return null;
	}
}

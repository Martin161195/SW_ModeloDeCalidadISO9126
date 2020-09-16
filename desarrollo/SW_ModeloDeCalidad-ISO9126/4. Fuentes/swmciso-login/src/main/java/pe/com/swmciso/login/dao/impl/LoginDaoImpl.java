<<<<<<< HEAD
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
import pe.com.swmciso.login.bean.RequestCambioClaveBean;
import pe.com.swmciso.login.bean.RequestRegistroBean;
import pe.com.swmciso.login.bean.RequestValidacionBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseValidacionBean;
import pe.com.swmciso.login.dao.ILoginDao;

@Slf4j
@Transactional
@Repository
public class LoginDaoImpl implements ILoginDao {

	@Autowired
	JdbcTemplate bigTConn;

	@Override
	public ResponseLoginBean validarUsuario2(RequestValidacionBean request) {
		ResponseLoginBean response = new ResponseLoginBean();
		String spTransporte = "PROC_login";

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?)}");
			callStmt.setString(1, request.getUser());
			callStmt.setString(2, request.getPassword());
			callStmt.registerOutParameter(3, Types.INTEGER);
			callStmt.registerOutParameter(4, Types.VARCHAR);
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
	public ResponseLoginBean registrarUsuario(RequestRegistroBean request) {
		ResponseLoginBean response = new ResponseLoginBean();
		String spTransporte = "PROC_crear_usuario";

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?,?,?)}");
			callStmt.setString(1, request.getUser());
			callStmt.setString(2, request.getPassword());
			callStmt.setString(3, request.getNombreEmpresa());
			callStmt.setString(4, request.getNombrePersona());
			callStmt.setString(5, request.getEmail());
			callStmt.registerOutParameter(6, Types.INTEGER);
			callStmt.registerOutParameter(7, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(6));
			response.setMessage(callStmt.getString(7));

			log.info(response.getMessage());

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseValidacionBean validarUsuario(RequestValidacionBean request) {
		ResponseValidacionBean response = new ResponseValidacionBean();
		String spTransporte = "PROC_login_validar";

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?,?)}");
			callStmt.setString(1, request.getUser());
			callStmt.setString(2, request.getPassword());
			callStmt.registerOutParameter(3, Types.INTEGER);
			callStmt.registerOutParameter(4, Types.VARCHAR);
			callStmt.registerOutParameter(5, Types.VARCHAR);
			callStmt.registerOutParameter(6, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(3));
			response.setMessage(callStmt.getString(4));
			response.setNombreEmpresa(callStmt.getString(5));
			response.setNombrePersona(callStmt.getString(6));

			log.info(response.getMessage());

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseLoginBean cambiarClave(RequestCambioClaveBean request) {
		ResponseLoginBean response = new ResponseLoginBean();
		String spTransporte = "PROC_cambiar_clave";

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?)}");
			callStmt.setString(1, request.getUser());
			callStmt.setString(2, request.getPassword());
			callStmt.setString(3, request.getNewPassword());
			callStmt.registerOutParameter(4, Types.INTEGER);
			callStmt.registerOutParameter(5, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(4));
			response.setMessage(callStmt.getString(5));

			log.info(response.getMessage());

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}
}
=======
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
import pe.com.swmciso.login.bean.RequestCambioClaveBean;
import pe.com.swmciso.login.bean.RequestRegistroBean;
import pe.com.swmciso.login.bean.RequestValidacionBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseValidacionBean;
import pe.com.swmciso.login.dao.ILoginDao;

@Slf4j
@Transactional
@Repository
public class LoginDaoImpl implements ILoginDao {

	@Autowired
	JdbcTemplate bigTConn;

	@Override
	public ResponseLoginBean validarUsuario2(RequestValidacionBean request) {
		ResponseLoginBean response = new ResponseLoginBean();
		String spTransporte = "PROC_login";

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?)}");
			callStmt.setString(1, request.getUser());
			callStmt.setString(2, request.getPassword());
			callStmt.registerOutParameter(3, Types.INTEGER);
			callStmt.registerOutParameter(4, Types.VARCHAR);
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
	public ResponseLoginBean registrarUsuario(RequestRegistroBean request) {
		ResponseLoginBean response = new ResponseLoginBean();
		String spTransporte = "PROC_crear_usuario";

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?,?,?)}");
			callStmt.setString(1, request.getUser());
			callStmt.setString(2, request.getPassword());
			callStmt.setString(3, request.getNombreEmpresa());
			callStmt.setString(4, request.getNombrePersona());
			callStmt.setString(5, request.getEmail());
			callStmt.registerOutParameter(6, Types.INTEGER);
			callStmt.registerOutParameter(7, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(6));
			response.setMessage(callStmt.getString(7));

			log.info(response.getMessage());

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseValidacionBean validarUsuario(RequestValidacionBean request) {
		ResponseValidacionBean response = new ResponseValidacionBean();
		String spTransporte = "PROC_login_validar";

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?,?)}");
			callStmt.setString(1, request.getUser());
			callStmt.setString(2, request.getPassword());
			callStmt.registerOutParameter(3, Types.INTEGER);
			callStmt.registerOutParameter(4, Types.VARCHAR);
			callStmt.registerOutParameter(5, Types.VARCHAR);
			callStmt.registerOutParameter(6, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(3));
			response.setMessage(callStmt.getString(4));
			response.setNombreEmpresa(callStmt.getString(5));
			response.setNombrePersona(callStmt.getString(6));

			log.info(response.getMessage());

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseLoginBean cambiarClave(RequestCambioClaveBean request) {
		ResponseLoginBean response = new ResponseLoginBean();
		String spTransporte = "PROC_cambiar_clave";

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?)}");
			callStmt.setString(1, request.getUser());
			callStmt.setString(2, request.getPassword());
			callStmt.setString(3, request.getNewPassword());
			callStmt.registerOutParameter(4, Types.INTEGER);
			callStmt.registerOutParameter(5, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(4));
			response.setMessage(callStmt.getString(5));

			log.info(response.getMessage());

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}
}
>>>>>>> 55afbddd3e28e49a61abd2dec2378d958cf01ff7

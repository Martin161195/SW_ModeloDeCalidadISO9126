package pe.com.teamsoft.swiso.demo.model;

import lombok.Data;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Data
@Entity
@Table(name = "Cuenta", schema = "swmciso9126")
public class User {


    @Id
    @Column(name="idCuenta")
    private Integer idCuenta;
    @Column(name = "usuario")
    private String usuario;
    @Column(name="contraseña")
    private String contraseña;
    @Column(name="correo")
    private String correo;
    @Column(name = "nombreEmpresa")
    private String nombreEmpresa;
    @Column(name="nombrePersona")
    private String nombrePersona;
}

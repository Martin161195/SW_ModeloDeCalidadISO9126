package pe.com.teamsoft.swiso.demo.repository;


import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pe.com.teamsoft.swiso.demo.model.User;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {


    @Procedure("PROC_LOGIN")
    int PROC_LOGIN(String user, String password);

    @Procedure("PROC_crear_usuario")
    int PROC_CREAR_USUARIO(String user, String password);

    @Procedure("PROC_cambiar_contraseña")
    int PROC_cambiar_contrasenia(String user, String newPassword);

}

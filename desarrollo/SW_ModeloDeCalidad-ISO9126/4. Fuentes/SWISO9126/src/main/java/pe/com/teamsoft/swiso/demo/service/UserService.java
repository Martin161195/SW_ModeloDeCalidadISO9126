package pe.com.teamsoft.swiso.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.teamsoft.swiso.demo.model.User;
import pe.com.teamsoft.swiso.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User registerUser(User user){
        userRepository.save(user);
        return user;
    }

    public String  singIn(String usuario, String password){
        userRepository.PROC_LOGIN(usuario, password);
        return "ingreso";
    }

    public User singUp(User user){
        userRepository.PROC_CREAR_USUARIO(user.getUsuario(), user.getContraseña());
        return user;
    }

    public String changePassword(String user, String newPassword){
        userRepository.PROC_cambiar_contrasenia(user, newPassword);
        return "Contraseña Cambiada";
    }


}

package pe.com.teamsoft.swiso.demo.web.api.userController;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pe.com.teamsoft.swiso.demo.model.User;
import pe.com.teamsoft.swiso.demo.service.UserService;

@RestController
@RequestMapping("/api")
@Slf4j
public class userController {

    @Autowired
    private UserService userService;


    @PostMapping(value = "/signin")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String signinUser(@RequestBody String user, @RequestBody String password){
        return userService.singIn(user, password);
    }




    @PostMapping(value = "signup")
    @ResponseStatus(HttpStatus.CREATED)
    public User signUpUser(@RequestBody User user){
        return  userService.registerUser(user);
    }


    @PostMapping(value = "changePassword")
    @ResponseStatus(HttpStatus.CREATED)
    public String signUpUser(@RequestBody String user, @RequestBody String newPassword){
        return  userService.changePassword(user, newPassword);
    }
}

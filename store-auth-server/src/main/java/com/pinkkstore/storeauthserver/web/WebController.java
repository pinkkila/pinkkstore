package com.pinkkstore.storeauthserver.web;

import com.pinkkstore.storeauthserver.appuser.AppUser;
import com.pinkkstore.storeauthserver.appuser.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class WebController {
    private final AppUserRepository appUserRepository;
    
    @GetMapping("/login")
    String login() {
        return "login";
    }
    
    @GetMapping("/register")
    public String registerNewUser(Model model) {
        String username = "customer_" + UUID.randomUUID().toString().substring(0, 8);
        String password = UUID.randomUUID().toString().substring(0, 12);
        
        String noopPassword = "{noop}" + password;
        
        appUserRepository.save(new AppUser(null, username, noopPassword));
        
        model.addAttribute("username", username);
        model.addAttribute("password", password);
        
        return "register";
    }
}

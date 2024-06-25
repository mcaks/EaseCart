package com.ecommerce.easecart.controller;

import com.ecommerce.easecart.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public void sendEmail() {
        emailService.sendOrderConfirmationEmail("@gmail.com");
    }
}

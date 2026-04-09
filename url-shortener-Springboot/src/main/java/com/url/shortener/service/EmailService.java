package com.url.shortener.service;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Linkly — Your Password Reset OTP");
        message.setText(
                "Hi,\n\n" +
                        "You requested a password reset for your Linkly account.\n\n" +
                        "Your OTP is: " + otp + "\n\n" +
                        "This OTP is valid for 10 minutes.\n" +
                        "If you did not request this, please ignore this email.\n\n" +
                        "— Linkly Team"
        );
        mailSender.send(message);
    }
}
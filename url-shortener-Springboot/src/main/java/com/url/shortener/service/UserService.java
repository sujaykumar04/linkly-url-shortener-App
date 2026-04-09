package com.url.shortener.service;

import com.url.shortener.dtos.LoginRequest;
import com.url.shortener.models.PasswordResetOtp;
import com.url.shortener.models.User;
import com.url.shortener.repository.PasswordResetOtpRepository;
import com.url.shortener.repository.UserRepository;
import com.url.shortener.security.jwt.JwtAuthenticationResponse;
import com.url.shortener.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@AllArgsConstructor
public class UserService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private PasswordResetOtpRepository passwordResetOtpRepository;
    private EmailService emailService;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public JwtAuthenticationResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails);
        return new JwtAuthenticationResponse(jwt);
    }

    public User findByUsername(String name) {
        return userRepository.findByUsername(name).orElseThrow(
                () -> new UsernameNotFoundException("User not found with username: " + name)
        );
    }

    // ── Forgot Password ─────────────────────────────────

    @Transactional
    public void generateAndSendOtp(String email) {
        // Check email exists
        userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("No account found with this email address.")
        );

        // Delete any existing OTP for this email
        passwordResetOtpRepository.deleteByEmail(email);

        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        // Save OTP with 10 min expiry
        PasswordResetOtp resetOtp = new PasswordResetOtp();
        resetOtp.setEmail(email);
        resetOtp.setOtp(otp);
        resetOtp.setExpiryTime(LocalDateTime.now().plusMinutes(10));
        resetOtp.setUsed(false);
        passwordResetOtpRepository.save(resetOtp);

        // Send email
        emailService.sendOtpEmail(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {
        PasswordResetOtp resetOtp = passwordResetOtpRepository
                .findTopByEmailOrderByExpiryTimeDesc(email)
                .orElseThrow(() -> new RuntimeException("OTP not found. Please request a new one."));

        if (resetOtp.isUsed()) {
            throw new RuntimeException("OTP has already been used. Please request a new one.");
        }
        if (LocalDateTime.now().isAfter(resetOtp.getExpiryTime())) {
            throw new RuntimeException("OTP has expired. Please request a new one.");
        }
        if (!resetOtp.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP. Please try again.");
        }

        return true;
    }

    @Transactional
    public void resetPassword(String email, String otp, String newPassword) {
        // Verify OTP one more time
        verifyOtp(email, otp);

        // Mark OTP as used
        PasswordResetOtp resetOtp = passwordResetOtpRepository
                .findTopByEmailOrderByExpiryTimeDesc(email)
                .orElseThrow(() -> new RuntimeException("OTP not found."));
        resetOtp.setUsed(true);
        passwordResetOtpRepository.save(resetOtp);

        // Update password
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found."));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
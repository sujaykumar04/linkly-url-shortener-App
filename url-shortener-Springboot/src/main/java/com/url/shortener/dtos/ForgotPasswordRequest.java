package com.url.shortener.dtos;

import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private String email;
}
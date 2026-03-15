
// This file / class is not important for our project . It can be deleted , its just kept because we have generated
// JWT token using this file

package com.url.shortener.security;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Encoders;

public class KeyGenerator {
    public static void main(String[] args) {
        String base64Key = Encoders.BASE64.encode(Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256).getEncoded());
        System.out.println(base64Key);
    }
}

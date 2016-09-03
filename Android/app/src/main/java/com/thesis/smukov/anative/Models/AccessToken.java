package com.thesis.smukov.anative.Models;

/**
 * Created by Smukov on 03-Sep-16.
 */
public class AccessToken {
    private String accessToken;
    private String refreshToken;
    private String authIdToken;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getAuthIdToken() {
        return authIdToken;
    }

    public void setAuthIdToken(String authIdToken) {
        this.authIdToken = authIdToken;
    }
}

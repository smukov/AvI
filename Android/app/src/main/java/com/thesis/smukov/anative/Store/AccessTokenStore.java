package com.thesis.smukov.anative.Store;

import android.app.Activity;
import android.content.SharedPreferences;

import com.thesis.smukov.anative.Models.AccessToken;

/**
 * Created by Smukov on 03-Sep-16.
 */
public class AccessTokenStore {

    public static String PREF_AUTH_ACCESS_TOKEN = "pref_auth_access_token";
    public static String PREF_AUTH_REFRESH_TOKEN = "pref_auth_refresh_token";
    public static String PREF_AUTH_ID_TOKEN = "pref_auth_id_token";

    public static void storeAccessToken(Activity activity, com.auth0.core.Token accessToken){
        SharedPreferences prefs = activity.getSharedPreferences(Constants.PREF_FILE_NAME, 0);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(PREF_AUTH_ACCESS_TOKEN, accessToken.getAccessToken());
        editor.putString(PREF_AUTH_REFRESH_TOKEN, accessToken.getRefreshToken());
        editor.putString(PREF_AUTH_ID_TOKEN, accessToken.getIdToken());

        editor.commit();
    }

    public static void storeAccessToken(Activity activity, AccessToken accessToken){
        SharedPreferences prefs = activity.getSharedPreferences(Constants.PREF_FILE_NAME, 0);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(PREF_AUTH_ACCESS_TOKEN, accessToken.getAccessToken());
        editor.putString(PREF_AUTH_REFRESH_TOKEN, accessToken.getRefreshToken());
        editor.putString(PREF_AUTH_ID_TOKEN, accessToken.getIdToken());

        editor.commit();
    }

    public static AccessToken getAccessToken(Activity activity){
        SharedPreferences prefs = activity.getSharedPreferences(Constants.PREF_FILE_NAME, 0);
        AccessToken accessToken = new AccessToken();

        accessToken.setAccessToken(prefs.getString(PREF_AUTH_ACCESS_TOKEN, ""));
        accessToken.setRefreshToken(prefs.getString(PREF_AUTH_REFRESH_TOKEN, ""));
        accessToken.setIdToken(prefs.getString(PREF_AUTH_ID_TOKEN, ""));

        return accessToken;
    }

}

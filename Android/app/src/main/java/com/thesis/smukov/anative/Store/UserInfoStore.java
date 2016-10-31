package com.thesis.smukov.anative.Store;

import android.app.Activity;
import android.content.SharedPreferences;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.thesis.smukov.anative.Models.UserInfo;


/**
 * Created by Smukov on 03-Sep-16.
 */
public class UserInfoStore {

    public static String PREF_USER_NAME = "pref_user_name";
    public static String PREF_USER_EMAIL = "pref_user_email";
    public static String PREF_USER_AUTH_ID = "pref_user_auth_id";
    public static String PREF_USER_PICTURE_URL = "pref_user_picture_url";

    public static String PREF_USER_EMPLOYMENT = "pref_user_employment";
    public static String PREF_USER_EDUCATION = "pref_user_education";
    public static String PREF_USER_KNOWLEDGEABLE_IN = "pref_user_knowledgeable_in";
    public static String PREF_USER_INTERESTS = "pref_user_interests";
    public static String PREF_USER_CURRENT_GOALS = "pref_user_current_goals";

    private DatabaseReference firebaseDb;

    public UserInfoStore(){
        firebaseDb = FirebaseDatabase.getInstance().getReference();
    }


    public static void storeUserProfileInfo(Activity activity, com.auth0.core.UserProfile userProfile){
        SharedPreferences prefs = activity.getSharedPreferences(Constants.PREF_FILE_NAME, 0);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(PREF_USER_NAME, userProfile.getName());
        editor.putString(PREF_USER_EMAIL, userProfile.getEmail());
        editor.putString(PREF_USER_AUTH_ID, userProfile.getId());
        editor.putString(PREF_USER_PICTURE_URL, userProfile.getPictureURL());

        editor.commit();
    }

    public void storeUserInfo(Activity activity, UserInfo userInfo){
        SharedPreferences prefs = activity.getSharedPreferences(Constants.PREF_FILE_NAME, 0);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(PREF_USER_NAME, userInfo.getName());
        editor.putString(PREF_USER_EMAIL, userInfo.getEmail());
        editor.putString(PREF_USER_AUTH_ID, userInfo.getAuthId());
        editor.putString(PREF_USER_PICTURE_URL, userInfo.getPictureUrl());
        editor.putString(PREF_USER_EMPLOYMENT, userInfo.getEmployment());
        editor.putString(PREF_USER_EDUCATION, userInfo.getEducation());
        editor.putString(PREF_USER_KNOWLEDGEABLE_IN, userInfo.getKnowledgeableIn());
        editor.putString(PREF_USER_INTERESTS, userInfo.getInterests());
        editor.putString(PREF_USER_CURRENT_GOALS, userInfo.getCurrentGoals());

        editor.commit();

        firebaseDb.child("users").child(userInfo.getId()).setValue(userInfo.toMap());
    }

    public UserInfo getUserInfo(Activity activity){
        SharedPreferences prefs = activity.getSharedPreferences(Constants.PREF_FILE_NAME, 0);
        UserInfo userInfo = new UserInfo();

        userInfo.setName(prefs.getString(PREF_USER_NAME, "N/A"));
        userInfo.setEmail(prefs.getString(PREF_USER_EMAIL, ""));
        userInfo.setAuthId(prefs.getString(PREF_USER_AUTH_ID, ""));
        userInfo.setPictureUrl(prefs.getString(PREF_USER_PICTURE_URL, ""));
        userInfo.setEmployment(prefs.getString(PREF_USER_EMPLOYMENT, ""));
        userInfo.setEducation(prefs.getString(PREF_USER_EDUCATION, ""));
        userInfo.setKnowledgeableIn(prefs.getString(PREF_USER_KNOWLEDGEABLE_IN, ""));
        userInfo.setInterests(prefs.getString(PREF_USER_INTERESTS, ""));
        userInfo.setCurrentGoals(prefs.getString(PREF_USER_CURRENT_GOALS, ""));

        return userInfo;
    }


}

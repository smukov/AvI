package com.thesis.smukov.anative.Models;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.ServerValue;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Smukov on 03-Sep-16.
 */
@IgnoreExtraProperties
public class UserInfo implements IFirebaseObject{

    protected String authId;
    protected String name;
    protected String email;
    protected String pictureUrl;

    protected String employment;
    protected String education;
    protected String knowledgeableIn;
    protected String interests;
    protected String currentGoals;

    protected double locationLat;
    protected double locationLon;

    public String getId() {return authId;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getAuthId() {
        return authId;
    }

    public void setAuthId(String authId) {
        this.authId = authId;
    }

    public String getEmployment() {
        return employment;
    }

    public void setEmployment(String employment) {
        this.employment = employment;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getKnowledgeableIn() {
        return knowledgeableIn;
    }

    public void setKnowledgeableIn(String knowledgeableIn) {
        this.knowledgeableIn = knowledgeableIn;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getCurrentGoals() {
        return currentGoals;
    }

    public void setCurrentGoals(String currentGoals) {
        this.currentGoals = currentGoals;
    }

    public double getLocationLat() {
        return locationLat;
    }

    public void setLocationLat(double locationLat) {
        this.locationLat = locationLat;
    }

    public double getLocationLon() {
        return locationLon;
    }

    public void setLocationLon(double locationLon) {
        this.locationLon = locationLon;
    }

    @Exclude
    @Override
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("lastModifiedTime", ServerValue.TIMESTAMP);
        result.put("authId", authId);
        result.put("name", name);
        result.put("email", email);
        result.put("pictureUrl", pictureUrl);
        result.put("employment", employment);
        result.put("education", education);
        result.put("knowledgeableIn", knowledgeableIn);
        result.put("interests", interests);
        result.put("currentGoals", currentGoals);
        result.put("locationLat", locationLat);
        result.put("locationLon", locationLon);

        return result;
    }
}

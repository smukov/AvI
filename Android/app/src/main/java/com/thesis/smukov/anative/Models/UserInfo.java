package com.thesis.smukov.anative.Models;

import com.google.firebase.database.IgnoreExtraProperties;

/**
 * Created by Smukov on 03-Sep-16.
 */
@IgnoreExtraProperties
public class UserInfo {

    private String name;
    private String email;
    private String pictureUrl;
    private String authId;

    private String employment;
    private String education;
    private String knowledgeableIn;
    private String interests;
    private String currentGoals;

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
}

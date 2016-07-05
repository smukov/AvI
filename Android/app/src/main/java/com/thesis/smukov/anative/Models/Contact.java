package com.thesis.smukov.anative.Models;

/**
 * Created by smuko on 05-Jul-16.
 */
public class Contact {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String employment;
    private String education;
    private String knowledgeableIn;
    private String interests;
    private String currentGoals;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

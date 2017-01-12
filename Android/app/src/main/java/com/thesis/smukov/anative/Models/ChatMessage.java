package com.thesis.smukov.anative.Models;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.ServerValue;

import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by smukov on 26-Jun-16.
 */
@IgnoreExtraProperties
public class ChatMessage implements IFirebaseObject {
    private String id;
    private String senderId;
    private String message;
    private Long timestamp;

    private boolean isMe;
    private String dateTime;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public boolean getIsme() {
        return isMe;
    }
    public void setMe(boolean isMe) {
        this.isMe = isMe;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getSenderId() {
        return senderId;
    }
    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }
    public String getDate() {
        return dateTime;
    }
    public Long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
        this.dateTime = DateFormat.getDateTimeInstance().format(new Date(timestamp));
    }


    @Exclude
    @Override
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("sender", senderId);
        result.put("message", message);
        result.put("timestamp", ServerValue.TIMESTAMP);
        return result;
    }
}

package com.thesis.smukov.anative.Store;

import android.util.Log;

import com.google.firebase.database.DatabaseReference;
import com.thesis.smukov.anative.Models.ChatMessage;

/**
 * Created by Smukov on 12-Jan-17.
 */
public class ChatStore {

    public static ChatMessage addMessage(
            DatabaseReference firebaseDb,
            String groupId,
            ChatMessage message){

        DatabaseReference pushRef = firebaseDb
                .child("chat")
                .child("messages")
                .child(groupId)
                .push();

        pushRef.setValue(message.toMap());

        message.setId(pushRef.getKey());
        return message;
    }

    public static String createChatGroup(
            DatabaseReference firebaseDb,
            String firstUserId,
            String secondUserId){

        String groupName = firstUserId + secondUserId;

        firebaseDb
                .child("chat")
                .child("users")
                .child(firstUserId)
                .child(secondUserId)
                .setValue(groupName);

        firebaseDb
                .child("chat")
                .child("users")
                .child(secondUserId)
                .child(firstUserId)
                .setValue(groupName);

        return groupName;
    }

}

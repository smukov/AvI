package com.thesis.smukov.anative.Store;

import android.util.Log;

import com.google.firebase.database.DatabaseReference;

/**
 * Created by Smukov on 19-Nov-16.
 */
public class ConnectionsStore {
    public static void setConnection(
            DatabaseReference firebaseDb,
            String userId,
            String newConnectionId,
            String connectionStatusCurrentUser,
            String connectionStatusTargetUser){

        Log.i("smuk", "userId: " + userId);
        Log.i("smuk", "newConnectionId: " + newConnectionId);

        firebaseDb
                .child("connections")
                .child(userId)
                .child(newConnectionId)
                .setValue(connectionStatusCurrentUser);

        firebaseDb
                .child("connections")
                .child(newConnectionId)
                .child(userId)
                .setValue(connectionStatusTargetUser);
    }
}

package com.thesis.smukov.anative;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.RelativeLayout;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.Gson;
import com.thesis.smukov.anative.Adapters.ChatAdapter;
import com.thesis.smukov.anative.Models.ChatMessage;
import com.thesis.smukov.anative.Models.Contact;
import com.thesis.smukov.anative.Store.ChatStore;
import com.thesis.smukov.anative.Store.UserInfoStore;

import java.util.ArrayList;

public class ChatActivity extends AppCompatActivity {

    private Contact contact;
    private String userId;
    private String groupId;

    private EditText messageET;
    private ListView messagesContainer;
    private ImageButton sendBtn;
    private ChatAdapter adapter;
    private ArrayList<ChatMessage> chatHistory;

    private DatabaseReference firebaseDb =
            FirebaseDatabase.getInstance().getReference();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        Intent intent = getIntent();
        if (intent != null) {
            handleIntentExtras(intent);
        }

        setTitle(contact.getName());
        initControls();

        this.userId = UserInfoStore.getUserInfo(this).getId();
        setFirebaseListeners(this.userId);
    }

    private void initControls() {
        messagesContainer = (ListView) findViewById(R.id.messagesContainer);

        if(adapter == null){
            adapter = new ChatAdapter(ChatActivity.this, new ArrayList<ChatMessage>());
        }
        messagesContainer.setAdapter(adapter);

        messageET = (EditText) findViewById(R.id.messageEdit);
        sendBtn = (ImageButton) findViewById(R.id.chatSendButton);

        sendBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String messageText = messageET.getText().toString();
                if (TextUtils.isEmpty(messageText)) {
                    return;
                }

                ChatMessage chatMessage = new ChatMessage();
                chatMessage.setSenderId(userId);
                chatMessage.setMessage(messageText);

                ChatStore.addMessage(firebaseDb, groupId, chatMessage);

                messageET.setText("");
            }
        });
    }

    private void handleIntentExtras(Intent intent) {
        Bundle extras = intent.getExtras();

        if (extras != null) {
            this.contact = new Gson().fromJson(extras.getString("contact"), Contact.class);
        }
    }

    private void setFirebaseListeners(final String userId){

        //first get the group id
        firebaseDb.child("chat").child("users").child(userId).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.hasChild(contact.getId())) {
                    //there is an existing chat group with this user
                    groupId = (String) dataSnapshot.child(contact.getId()).getValue();
                }else{
                    //there is no existing chat group with this user, so create one
                    groupId = ChatStore.createChatGroup(firebaseDb, userId, contact.getId());
                }

                //now start listening for messages in this chat group
                firebaseDb.child("chat").child("messages").child(groupId)
                        .orderByChild("timestamp").limitToLast(500).addChildEventListener(new ChildEventListener() { //TODO: lower amount of messages and implement drag to load
                    @Override
                    public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                        ChatMessage newMessage = new ChatMessage();

                        String senderId = (String) dataSnapshot.child("sender").getValue();
                        newMessage.setSenderId(senderId);
                        newMessage.setMe(senderId.equals(userId));
                        newMessage.setMessage((String) dataSnapshot.child("message").getValue());
                        newMessage.setTimestamp((Long) dataSnapshot.child("timestamp").getValue());

                        displayMessage(newMessage);
                    }

                    @Override
                    public void onChildChanged(DataSnapshot dataSnapshot, String s) {

                    }

                    @Override
                    public void onChildRemoved(DataSnapshot dataSnapshot) {

                    }

                    @Override
                    public void onChildMoved(DataSnapshot dataSnapshot, String s) {

                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {

                    }
                });
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

    public void displayMessage(ChatMessage message) {
        adapter.add(message);
        adapter.notifyDataSetChanged();
        scroll();
    }

    private void scroll() {
        messagesContainer.setSelection(messagesContainer.getCount() - 1);
    }

}

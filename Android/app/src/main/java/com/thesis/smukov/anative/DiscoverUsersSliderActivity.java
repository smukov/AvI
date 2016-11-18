package com.thesis.smukov.anative;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.thesis.smukov.anative.DiscoverUsers.DiscoverUsersPagerAdapter;
import com.thesis.smukov.anative.Models.Connections;
import com.thesis.smukov.anative.Models.Contact;
import com.thesis.smukov.anative.Store.UserInfoStore;

import java.util.ArrayList;

public class DiscoverUsersSliderActivity extends AppCompatActivity {

    private ViewPager pager;
    private DiscoverUsersPagerAdapter pagerAdapter;

    private DatabaseReference firebaseDb =
            FirebaseDatabase.getInstance().getReference();

    FloatingActionButton fabAccept;
    FloatingActionButton fabDismiss;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_discover_users_slider);

        // Instantiate a ViewPager and a PagerAdapter.
        pager = (ViewPager) findViewById(R.id.pager);
        pager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
                if(position == pagerAdapter.getCount()-1){
                    fabAccept.hide();
                    fabDismiss.hide();
                }else{
                    fabAccept.show();
                    fabDismiss.show();
                }
            }

            @Override
            public void onPageSelected(int position) {

            }

            @Override
            public void onPageScrollStateChanged(int state) {
                switch(state)
                {
                    case ViewPager.SCROLL_STATE_DRAGGING:

                        break;

                    case ViewPager.SCROLL_STATE_IDLE:
                        //this happens when the smooth scroll ends
                        //check if there is any pending item to be deleted
                        int pendingDeletePosition = pagerAdapter.getItemToDelete();
                        if(pendingDeletePosition != -1){
                            pagerAdapter.setItemToDelete(-1);

                            //We need to do this so that ViewPager would delete all its its views.
                            pager.setAdapter(null);

                            //now remove the item from the adapter, reassign it, and scroll to next item
                            pagerAdapter.remove(pendingDeletePosition);
                            pager.setAdapter(pagerAdapter);
                            pager.setCurrentItem(pendingDeletePosition);
                        }

                        break;

                    case ViewPager.SCROLL_STATE_SETTLING:
                        break;
                }
            }
        });

        fabAccept = (FloatingActionButton) findViewById(R.id.fab_accept);
        fabAccept.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(pager.getCurrentItem() < pagerAdapter.getCount()-1){
                    removeContact(pager.getCurrentItem());
                    //TODO: update db
                }
            }
        });
        fabDismiss = (FloatingActionButton) findViewById(R.id.fab_dismiss);
        fabDismiss.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(pager.getCurrentItem() < pagerAdapter.getCount()-1){
                    removeContact(pager.getCurrentItem());
                    //TODO: update db
                }
            }
        });

        setFirebaseListeners(UserInfoStore.getUserInfo(this).getId());
    }

    private void setFirebaseListeners(String userId){
        firebaseDb.child("connections").child(userId).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Connections connections =
                        dataSnapshot.getValue(Connections.class);

                if(connections == null){
                    Log.i("smuk", "No connections found in Firebase");
                    getPotentialConnections(new Connections());
                }else{
                    Log.i("smuk", "Retrieved connections from Firebase");
                    Log.i("smuk", "Number of connections: " + connections.size());

                    getPotentialConnections(connections);
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

    private void getPotentialConnections(final Connections connections){
        //now that I have connections, get the users that aren't connected
        firebaseDb.child("users").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                ArrayList<Contact> contacts = new ArrayList<Contact>();

                Log.i("smuk", "Retrieved users from Firebase");

                for (DataSnapshot child : dataSnapshot.getChildren()) {
                    if (connections.containsKey(child.getKey()) == false) {
                        contacts.add(child.getValue(Contact.class));
                        Log.i("smuk", "Found new contact");
                    }
                }
                loadContacts(contacts);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

    private void addContact(Contact contact) {
        pagerAdapter.add(contact);
        pagerAdapter.notifyDataSetChanged();
    }

    private void removeContact(int position) {
        pagerAdapter.setItemToDelete(position);
        //triggers the OnPageChangeListener above that will handle the item deletion
        pager.setCurrentItem(position+1);
    }

    private void loadContacts(ArrayList<Contact> lstContacts){
        if(pagerAdapter == null){
            pagerAdapter = new DiscoverUsersPagerAdapter(getSupportFragmentManager(), lstContacts);
            pager.setAdapter(pagerAdapter);
        }else {
            pagerAdapter.clear();
            pagerAdapter.add(lstContacts);
            pagerAdapter.notifyDataSetChanged();
        }
    }

    private void setConnection(String userId,
                              String newConnectionId,
                              boolean isConnected){
        firebaseDb
                .child("connections")
                .child(userId)
                .child(newConnectionId)
                .setValue(isConnected);

        firebaseDb
                .child("connections")
                .child(newConnectionId)
                .child(userId)
                .setValue(isConnected);
    }
}

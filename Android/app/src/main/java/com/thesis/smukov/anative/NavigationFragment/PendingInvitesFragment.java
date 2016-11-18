package com.thesis.smukov.anative.NavigationFragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.thesis.smukov.anative.Adapters.PendingInvitesAdapter;
import com.thesis.smukov.anative.Models.Contact;
import com.thesis.smukov.anative.NavigationActivity;
import com.thesis.smukov.anative.R;
import com.thesis.smukov.anative.Store.ConnectionsStore;
import com.thesis.smukov.anative.Store.UserInfoStore;
import com.wdullaer.swipeactionadapter.SwipeActionAdapter;
import com.wdullaer.swipeactionadapter.SwipeDirection;

import java.util.ArrayList;
import java.util.HashMap;

import static com.wdullaer.swipeactionadapter.SwipeDirection.*;

/**
 * Created by Smukov on 09-Jul-16.
 */
public class PendingInvitesFragment  extends BaseNavigationListFragment {

    private PendingInvitesAdapter adapter;
    private SwipeActionAdapter swipeAdapter;
    private ListView listView;

    private String userId = "";
    private DatabaseReference firebaseDb =
            FirebaseDatabase.getInstance().getReference();

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        myView = inflater.inflate(R.layout.pending_invites_layout, container, false);
        return myView;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        setTitle(getResources().getString(R.string.titlePendingInvites));
        prepareFloatingActionButton();

        userId = UserInfoStore.getUserInfo(getActivity()).getId();
        setFirebaseListeners(userId);

        listView = getListView();
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                ContactFragment contactFragment = new ContactFragment();
                contactFragment.setContact(adapter.getItem(position));

                ((NavigationActivity)getActivity()).openNewFragment(contactFragment);
            }
        });
    }

    @Override
    protected void prepareFloatingActionButton() {
        if(fab == null){
            fab = (FloatingActionButton) getActivity().findViewById(R.id.fab);
        }
        fab.hide();
    }

    private void setFirebaseListeners(String userId){
        firebaseDb.child("connections").child(userId).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                final HashMap<String, String> connections =
                        (HashMap<String, String>) dataSnapshot.getValue();

                if(connections == null){
                    Log.i("smuk", "No connections found in Firebase");
                    loadContacts(new ArrayList<Contact>());
                }else{
                    Log.i("smuk", "Retrieved connections from Firebase");
                    Log.i("smuk", "Number of connections: " + connections.size());

                    //now that I have connections, get the contacts
                    firebaseDb.child("users").addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(DataSnapshot dataSnapshot) {
                            ArrayList<Contact> contacts = new ArrayList<Contact>();

                            Log.i("smuk", "Retrieved users from Firebase");

                            for (DataSnapshot child : dataSnapshot.getChildren()) {
                                if (connections.containsKey(child.getKey())
                                        && connections.get(child.getKey()).equals(Contact.CONNECION_PENDING)) {
                                    contacts.add(child.getValue(Contact.class));
                                    Log.i("smuk", "Found existing contact");
                                }
                            }
                            loadContacts(contacts);
                        }

                        @Override
                        public void onCancelled(DatabaseError databaseError) {

                        }
                    });
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

    public void displayContact(Contact contact) {
        adapter.add(contact);
        adapter.notifyDataSetChanged();
    }

    private void loadContacts(ArrayList<Contact> lstContacts){

        if(adapter == null) {
            adapter = new PendingInvitesAdapter(getActivity(), lstContacts);
            swipeAdapter = new SwipeActionAdapter(adapter);
            swipeAdapter.setListView(getListView());
            setListAdapter(swipeAdapter);

            // Set backgrounds for the swipe directions
            swipeAdapter.addBackground(DIRECTION_NORMAL_LEFT,R.layout.row_swipe_left_layout)
                    .addBackground(DIRECTION_NORMAL_RIGHT,R.layout.row_swipe_right_layout)
                    .setFixedBackgrounds(true);

            swipeAdapter.setSwipeActionListener(new SwipeActionAdapter.SwipeActionListener(){
                @Override
                public boolean hasActions(int position, SwipeDirection direction){
                    if(direction.isLeft()) return true; // Change this to false to disable left swipes
                    if(direction.isRight()) return true;
                    return false;
                }

                @Override
                public boolean shouldDismiss(int position, SwipeDirection direction){
                    // Always dismiss items
                    return true;//direction == DIRECTION_NORMAL_LEFT;
                }

                @Override
                public void onSwipe(int[] positionList, SwipeDirection[] directionList){
                    for(int i=0;i<positionList.length;i++) {
                        SwipeDirection direction = directionList[i];
                        int position = positionList[i];
                        String action = "";

                        switch (direction) {
                            case DIRECTION_FAR_LEFT:
                            case DIRECTION_NORMAL_LEFT:
                                action = Contact.CONNECION_DECLINED;

                                break;
                            case DIRECTION_FAR_RIGHT:
                            case DIRECTION_NORMAL_RIGHT:
                                action = Contact.CONNECION_ACCEPTED;
                                break;
                        }

                        ConnectionsStore.setConnection(firebaseDb, userId,
                                adapter.getItem(position).getId(), action);

                        adapter.remove(position);
                        adapter.notifyDataSetChanged();
                        swipeAdapter.notifyDataSetChanged();
                    }
                }
            });
        }else{
            adapter.clear();
            adapter.add(lstContacts);
            adapter.notifyDataSetChanged();
        }
    }
}

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

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.thesis.smukov.anative.Adapters.ContactsAdapter;
import com.thesis.smukov.anative.Models.Contact;
import com.thesis.smukov.anative.NavigationActivity;
import com.thesis.smukov.anative.R;
import com.thesis.smukov.anative.Store.UserInfoStore;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by smuko on 05-Jul-16.
 */
public class ContactsFragment extends BaseNavigationListFragment {

    private ContactsAdapter adapter;
    private ListView listView;

    private DatabaseReference firebaseDb =
            FirebaseDatabase.getInstance().getReference();

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        myView = inflater.inflate(R.layout.contacts_layout, container, false);
        return myView;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        setTitle(getResources().getString(R.string.titleMyContacts));
        prepareFloatingActionButton();

        setFirebaseListeners(UserInfoStore.getUserInfo(getActivity()).getId());

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

    private void setFirebaseListeners(String userId){
        firebaseDb.child("connections").child(userId).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                final HashMap<String, Boolean> connections =
                        (HashMap<String, Boolean>) dataSnapshot.getValue();

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
                                        && connections.get(child.getKey())) {
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

    @Override
    protected void prepareFloatingActionButton() {
        if(fab == null){
            fab = (FloatingActionButton) getActivity().findViewById(R.id.fab);
        }
        fab.hide();
    }

    public void displayContact(Contact contact) {
        adapter.add(contact);
        adapter.notifyDataSetChanged();
    }

    private void loadContacts(ArrayList<Contact> lstContacts){
        if(adapter == null){
            adapter = new ContactsAdapter(getActivity(), lstContacts);
            setListAdapter(adapter);
        }
        else{
            adapter.clear();
            adapter.add(lstContacts);
            adapter.notifyDataSetChanged();
        }
    }
}

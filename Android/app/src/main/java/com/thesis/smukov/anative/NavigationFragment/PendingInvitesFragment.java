package com.thesis.smukov.anative.NavigationFragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.thesis.smukov.anative.Adapters.PendingInvitesAdapter;
import com.thesis.smukov.anative.Models.Contact;
import com.thesis.smukov.anative.NavigationActivity;
import com.thesis.smukov.anative.R;
import com.wdullaer.swipeactionadapter.SwipeActionAdapter;
import com.wdullaer.swipeactionadapter.SwipeDirection;

import java.util.ArrayList;

import static com.wdullaer.swipeactionadapter.SwipeDirection.*;

/**
 * Created by Smukov on 09-Jul-16.
 */
public class PendingInvitesFragment  extends BaseNavigationListFragment {

    private PendingInvitesAdapter adapter;
    private SwipeActionAdapter swipeAdapter;
    private ArrayList<Contact> lstContacts;
    private ListView listView;

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

        loadContacts();

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

    public void displayContact(Contact contact) {
        adapter.add(contact);
        adapter.notifyDataSetChanged();
    }

    private void loadContacts(){

        lstContacts = new ArrayList<Contact>();

        Contact con = new Contact();
        con.setName("Gregory House");
        con.setEmployment("Head of Diagnostic @ PPT Hospital");
        con.setEducation("Attended Hopkins University 1979-1984");
        lstContacts.add(con);
        Contact con2 = new Contact();
        con2.setName("Hugh Laurie");
        con2.setEmployment("Actor, Writer, Director, Author, etc.");
        con2.setEducation("Attended Selwyn College, Cambridge 1978 - 1984");
        lstContacts.add(con2);

        adapter = new PendingInvitesAdapter(getActivity(), new ArrayList<Contact>());
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
                            action = "Dismissed";
                            break;
                        case DIRECTION_FAR_RIGHT:
                        case DIRECTION_NORMAL_RIGHT:
                            action = "Accepted";
                            break;
                    }
                    Toast.makeText(
                            getActivity(),
                            action + " invite from " + adapter.getItem(position).getName(),
                            Toast.LENGTH_SHORT
                    ).show();
                    adapter.remove(position);
                    adapter.notifyDataSetChanged();
                    swipeAdapter.notifyDataSetChanged();
                }
            }
        });

        for(int i=0; i<lstContacts.size(); i++) {
            Contact contact = lstContacts.get(i);
            displayContact(contact);
        }
    }
}

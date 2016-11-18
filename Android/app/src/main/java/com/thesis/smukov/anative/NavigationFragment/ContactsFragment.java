package com.thesis.smukov.anative.NavigationFragment;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import com.thesis.smukov.anative.Adapters.ContactsAdapter;
import com.thesis.smukov.anative.Models.Contact;
import com.thesis.smukov.anative.NavigationActivity;
import com.thesis.smukov.anative.R;

import java.util.ArrayList;

/**
 * Created by smuko on 05-Jul-16.
 */
public class ContactsFragment extends BaseNavigationListFragment {

    private ContactsAdapter adapter;
    private ArrayList<Contact> lstContacts;
    private ListView listView;

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

        adapter = new ContactsAdapter(getActivity(), new ArrayList<Contact>());
        setListAdapter(adapter);

        for(int i=0; i<lstContacts.size(); i++) {
            Contact contact = lstContacts.get(i);
            displayContact(contact);
        }
    }
}

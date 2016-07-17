package com.thesis.smukov.anative.DiscoverUsers;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import com.google.gson.Gson;
import com.thesis.smukov.anative.Models.Contact;

import java.util.List;

/**
 * Created by Smukov on 17-Jul-16.
 */
public class DiscoverUsersPagerAdapter  extends FragmentStatePagerAdapter {

    private final List<Contact> lstContacts;
    private int itemToDelete = -1;

    public DiscoverUsersPagerAdapter(FragmentManager fm, List<Contact> contacts) {
        super(fm);
        lstContacts = contacts;
    }

    @Override
    public Fragment getItem(int position) {
        if (lstContacts != null) {

            if(lstContacts.size() == 0 || position >= lstContacts.size()){
                return new NoMoreUsersFragment();
            }
            else {
                DiscoverUserFragment duf = new DiscoverUserFragment();

                Bundle bundle = new Bundle();
                bundle.putString("contact", new Gson().toJson(lstContacts.get(position)));
                duf.setArguments(bundle);

                return duf;
            }

        } else {
            return new NoMoreUsersFragment();
        }
    }

    @Override
    public int getCount() {
        //take into account the last "No More Users.." page
        if (lstContacts != null) {
            return lstContacts.size() + 1;
        } else {
            return 1;
        }
    }

    public void setItemToDelete(int position){
        this.itemToDelete = position;
    }

    public int getItemToDelete(){
        return this.itemToDelete;
    }

    public void add(Contact contact) {
        lstContacts.add(contact);
    }

    public void add(List<Contact> contacts) {
        lstContacts.addAll(contacts);
    }

    public void remove(int position){
        if(lstContacts.size() != 0 && position < lstContacts.size()) {
            lstContacts.remove(position);
        }
    }

}

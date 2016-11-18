package com.thesis.smukov.anative;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.thesis.smukov.anative.DiscoverUsers.DiscoverUsersPagerAdapter;
import com.thesis.smukov.anative.Models.Contact;

import java.util.ArrayList;

public class DiscoverUsersSliderActivity extends AppCompatActivity {

    private ViewPager pager;
    private DiscoverUsersPagerAdapter pagerAdapter;
    private ArrayList<Contact> lstContacts;

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

        loadContacts();
    }


    public void addContact(Contact contact) {
        pagerAdapter.add(contact);
        pagerAdapter.notifyDataSetChanged();
    }

    public void removeContact(int position) {
        pagerAdapter.setItemToDelete(position);
        //triggers the OnPageChangeListener above that will handle the item deletion
        pager.setCurrentItem(position+1);
    }

    private void loadContacts(){

        lstContacts = new ArrayList<Contact>();

        Contact con = new Contact();
        con.setName("#1 Gregory House");
        con.setEmployment("Head of Diagnostic @ PPT Hospital");
        con.setEducation("Attended Hopkins University 1979-1984");
        lstContacts.add(con);
        Contact con2 = new Contact();
        con2.setName("#2 Hugh Laurie");
        con2.setEmployment("Actor, Writer, Director, Author, etc.");
        con2.setEducation("Attended Selwyn College, Cambridge 1978 - 1984");
        lstContacts.add(con2);
        Contact con3 = new Contact();
        con3.setName("#3 Gregory House");
        con3.setEmployment("Head of Diagnostic @ PPT Hospital");
        con3.setEducation("Attended Hopkins University 1979-1984");
        lstContacts.add(con3);
        Contact con4 = new Contact();
        con4.setName("#4 Hugh Laurie");
        con4.setEmployment("Actor, Writer, Director, Author, etc.");
        con4.setEducation("Attended Selwyn College, Cambridge 1978 - 1984");
        lstContacts.add(con4);

        pagerAdapter = new DiscoverUsersPagerAdapter(getSupportFragmentManager(), lstContacts);
        pager.setAdapter(pagerAdapter);
    }
}

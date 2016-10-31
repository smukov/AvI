package com.thesis.smukov.anative;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.app.Fragment;
import android.app.FragmentManager;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.google.gson.Gson;
import com.thesis.smukov.anative.Models.AccessToken;
import com.thesis.smukov.anative.Models.UserInfo;
import com.thesis.smukov.anative.NavigationFragment.ContactsFragment;
import com.thesis.smukov.anative.NavigationFragment.INavigationFragment;
import com.thesis.smukov.anative.NavigationFragment.PendingInvitesFragment;
import com.thesis.smukov.anative.NavigationFragment.ProfileFragment;
import com.thesis.smukov.anative.NavigationFragment.SettingsFragment;
import com.thesis.smukov.anative.Store.AccessTokenStore;
import com.thesis.smukov.anative.Store.UserInfoStore;

public class NavigationActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    FragmentManager fragmentManager;
    INavigationFragment currentFragment;
    FloatingActionButton fab;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_navigation);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Intent intent = getIntent();
        if(intent != null){
            handleIntentExtras(intent);
        }


        fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        //instantiate the fragmentManager and set the default view to profile
        currentFragment = new ProfileFragment();
        fragmentManager = getFragmentManager();
        fragmentManager.beginTransaction()
                .replace(R.id.content_frame ,(Fragment) currentFragment)
                .commit();

        //initialize the default application settings
        PreferenceManager.setDefaultValues(this, R.xml.preferences, false);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        //getMenuInflater().inflate(R.menu.navigation, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        boolean openNewFragment = true;

        if (id == R.id.nav_contacts) {
            currentFragment = new ContactsFragment();

        } else if (id == R.id.nav_pending_invites) {
            currentFragment = new PendingInvitesFragment();

        } else if (id == R.id.nav_discover_users){
            Intent intent = new Intent(this, DiscoverUsersSliderActivity.class);
            startActivity(intent);
            openNewFragment = false;
        } else if (id == R.id.nav_settings) {
            currentFragment = new SettingsFragment();

        } else if (id == R.id.nav_send_feedback) {
            Intent intent = new Intent(Intent.ACTION_SENDTO);
            intent.setData(Uri.parse(
                    "mailto:" + getResources().getString(R.string.feedback_email) +
                    "?subject=" + getResources().getString(R.string.feedback_subject)));
            startActivity(Intent.createChooser(intent, ""));
            openNewFragment = false;
        } else {
            //by default always go to nav_my_profile fragment
            currentFragment = new ProfileFragment();
        }

        if(openNewFragment){
            openNewFragment(currentFragment);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void openNewFragment(INavigationFragment newFragment){
        fragmentManager.beginTransaction()
                .replace(R.id.content_frame, (Fragment) newFragment)
                .commit();
    }

    private void handleIntentExtras(Intent intent){
        Bundle extras = intent.getExtras();

        if(extras != null){
            Boolean wasLoggedIn = extras.getBoolean("wasLoggedIn", true);
            UserInfo userInfo = new Gson().fromJson(extras.getString("userInfo"), UserInfo.class);
            AccessToken accessToken = new Gson().fromJson(extras.getString("accessToken"), AccessToken.class);

            AccessTokenStore.storeAccessToken(this, accessToken);
            if(wasLoggedIn == false){
                //if user wasn't logged in, I should store his information
                UserInfoStore userInfoStore = new UserInfoStore();
                userInfoStore.storeUserInfo(this, userInfo);
            }
        }
    }
}

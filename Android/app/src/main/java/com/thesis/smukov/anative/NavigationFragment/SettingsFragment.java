package com.thesis.smukov.anative.NavigationFragment;

import android.content.Intent;
import android.os.Bundle;
import android.preference.Preference;
import android.preference.PreferenceFragment;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.thesis.smukov.anative.LoginActivity;
import com.thesis.smukov.anative.Models.AccessToken;
import com.thesis.smukov.anative.R;
import com.thesis.smukov.anative.Store.AccessTokenStore;

/**
 * Created by Smukov on 15-Jun-16.
 */
public class SettingsFragment extends PreferenceFragment
        implements INavigationFragment {

    protected FloatingActionButton fab;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Load the preferences from an XML resource
        addPreferencesFromResource(R.xml.preferences);

        Preference button = findPreference(getString(R.string.pref_log_out_button));
        button.setOnPreferenceClickListener(new Preference.OnPreferenceClickListener() {
            @Override
            public boolean onPreferenceClick(Preference preference) {
                //just set an empty token, and that will log out the user
                AccessToken accessToken = new AccessToken();
                AccessTokenStore.storeAccessToken(getActivity(), accessToken);

                Intent intent = new Intent(getActivity(), LoginActivity.class);
                //remove all active activities, so user can't go back
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);
                return true;
            }
        });
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        getActivity().setTitle(getResources().getString(R.string.titleSettings));
        prepareFloatingActionButton();
    }

    protected void prepareFloatingActionButton(){
        if(fab == null){
            fab = (FloatingActionButton) getActivity().findViewById(R.id.fab);
        }
        fab.hide();
    }
}

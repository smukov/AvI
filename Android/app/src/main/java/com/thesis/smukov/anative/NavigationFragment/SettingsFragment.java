package com.thesis.smukov.anative.NavigationFragment;

import android.os.Bundle;
import android.preference.PreferenceFragment;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.thesis.smukov.anative.R;

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

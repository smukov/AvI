package com.thesis.smukov.anative.NavigationFragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.thesis.smukov.anative.R;

/**
 * Created by smuko on 15-Jun-16.
 */
public class SettingsFragment extends BaseNavigationFragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        myView = inflater.inflate(R.layout.settings_layout, container, false);
        return myView;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        prepareFloatingActionButton();
    }

    @Override
    protected void prepareFloatingActionButton(){
        fab.hide();
    }
}

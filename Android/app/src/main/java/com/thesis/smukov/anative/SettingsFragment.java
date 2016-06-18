package com.thesis.smukov.anative;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.thesis.smukov.anative.interfaces.INavigationFragment;

/**
 * Created by smuko on 15-Jun-16.
 */
public class SettingsFragment extends Fragment
        implements INavigationFragment {

    View myView;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        myView = inflater.inflate(R.layout.settings_layout, container, false);
        return myView;
    }

    @Override
    public void handleFabAction(int actionId) {

    }
}

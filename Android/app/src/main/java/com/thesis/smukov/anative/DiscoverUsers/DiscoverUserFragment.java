package com.thesis.smukov.anative.DiscoverUsers;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.thesis.smukov.anative.R;

/**
 * Created by Smukov on 17-Jul-16.
 */
public class DiscoverUserFragment extends Fragment{

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ViewGroup rootView = (ViewGroup) inflater.inflate(
                R.layout.discover_contact_layout, container, false);

        return rootView;
    }

}

package com.thesis.smukov.anative;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

/**
 * Created by smukov on 18-Jun-16.
 */
public class ContactFragment extends Fragment{

    View myView;
    TextView profileName;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        myView = inflater.inflate(R.layout.contact_layout, container, false);
        return myView;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        profileName = (TextView) view.findViewById(R.id.profile_name);
        profileName.setText("Dr. Gregory House");
    }
}

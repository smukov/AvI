package com.thesis.smukov.anative.NavigationFragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.thesis.smukov.anative.R;

/**
 * Created by smukov on 15-Jun-16.
 */
public class ProfileFragment extends BaseNavigationFragment {

    TextView profileName;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        myView = inflater.inflate(R.layout.profile_layout, container, false);
        return myView;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        prepareFloatingActionButton();

        profileName = (TextView) view.findViewById(R.id.profile_name);
        profileName.setText("Dr. Gregory House");
    }

    @Override
    protected void prepareFloatingActionButton(){
        fab.show();
        fab.setImageDrawable(ContextCompat.getDrawable(getActivity(), R.drawable.ic_create_black_24dp));
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Called from Profile Fragment", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }
}

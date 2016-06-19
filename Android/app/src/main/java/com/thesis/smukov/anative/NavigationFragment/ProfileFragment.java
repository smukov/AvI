package com.thesis.smukov.anative.NavigationFragment;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.content.ContextCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;

import com.thesis.smukov.anative.R;

/**
 * Created by smukov on 15-Jun-16.
 */
public class ProfileFragment extends BaseNavigationFragment {

    Boolean isEditable = false;

    TextView profileName;
    EditText txtEmployment;
    EditText txtEducation;
    EditText txtInterests;
    EditText txtKnowledgeable;
    EditText txtCurrentGoals;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        myView = inflater.inflate(R.layout.profile_layout, container, false);
        return myView;
    }

    @SuppressLint("WrongViewCast")
    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        prepareFloatingActionButton();

        profileName = (TextView) view.findViewById(R.id.profile_name);
        profileName.setText("Dr. Gregory House");

        txtEmployment = (EditText) view.findViewById(R.id.txtEmployment);
        txtEducation = (EditText) view.findViewById(R.id.txtEducation);
        txtInterests = (EditText) view.findViewById(R.id.txtInterests);
        txtKnowledgeable = (EditText) view.findViewById(R.id.txtKnowledgeable);
        txtCurrentGoals = (EditText) view.findViewById(R.id.txtCurrentGoals);

        toggleEditMode(isEditable);
    }

    @Override
    protected void prepareFloatingActionButton(){
        if(fab == null){
            fab = (FloatingActionButton) getActivity().findViewById(R.id.fab);
        }

        fab.show();
        fab.setImageDrawable(ContextCompat.getDrawable(getActivity(), R.drawable.ic_create_black_24dp));
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                isEditable = !isEditable;
                toggleEditMode(isEditable);
            }
        });
    }

    private void toggleEditMode(Boolean isEditable){
        txtEmployment.setEnabled(isEditable);
        txtEducation.setEnabled(isEditable);
        txtInterests.setEnabled(isEditable);
        txtKnowledgeable.setEnabled(isEditable);
        txtCurrentGoals.setEnabled(isEditable);

        if(isEditable){
            fab.setImageDrawable(ContextCompat.getDrawable(getActivity(), R.drawable.ic_done_black_24dp));
        }else{
            fab.setImageDrawable(ContextCompat.getDrawable(getActivity(), R.drawable.ic_create_black_24dp));
        }
    }
}

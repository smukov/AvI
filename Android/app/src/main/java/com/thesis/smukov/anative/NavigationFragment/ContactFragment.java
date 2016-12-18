package com.thesis.smukov.anative.NavigationFragment;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.thesis.smukov.anative.ChatActivity;
import com.thesis.smukov.anative.Models.Contact;
import com.thesis.smukov.anative.Models.UserInfo;
import com.thesis.smukov.anative.NavigationActivity;
import com.thesis.smukov.anative.R;
import com.thesis.smukov.anative.Store.UserInfoStore;
import com.thesis.smukov.anative.Utils.DownloadImageTask;

import org.w3c.dom.Text;

import de.hdodenhof.circleimageview.CircleImageView;

/**
 * Created by smukov on 18-Jun-16.
 */
public class ContactFragment extends BaseNavigationFragment {

    Contact contact;

    CircleImageView profileImage;
    TextView profileName;
    TextView employment;
    TextView education;
    TextView interests;
    TextView knowledgeable;
    TextView currentGoals;
    TextView distance;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        myView = inflater.inflate(R.layout.contact_layout, container, false);
        return myView;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        setTitle(contact.getName());
        prepareFloatingActionButton();

        profileImage = (CircleImageView) view.findViewById(R.id.profile_image);
        profileName = (TextView) view.findViewById(R.id.profile_name);
        employment = (TextView) view.findViewById(R.id.txtEmployment);
        education = (TextView) view.findViewById(R.id.txtEducation);
        interests = (TextView) view.findViewById(R.id.txtInterests);
        knowledgeable = (TextView) view.findViewById(R.id.txtKnowledgeable);
        currentGoals = (TextView) view.findViewById(R.id.txtCurrentGoals);
        distance = (TextView) view.findViewById(R.id.txtDistance);

        prepareUI(contact);
    }

    @Override
    protected void prepareFloatingActionButton(){
        if(fab == null){
            fab = (FloatingActionButton) getActivity().findViewById(R.id.fab);
        }

        fab.show();
        fab.setImageDrawable(ContextCompat.getDrawable(getActivity(), R.drawable.ic_forum_black_24dp));
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getActivity(), ChatActivity.class);
                startActivity(intent);
            }
        });
    }

    public void setContact(Contact contact){
        this.contact = contact;
    }

    private void prepareUI(Contact contact){
        if(contact.getPictureUrl() != null && contact.getPictureUrl().isEmpty() == false){
            new DownloadImageTask(profileImage)
                    .execute(contact.getPictureUrl());
        }
        profileName.setText(contact.getName());
        employment.setText(contact.getEmployment());
        education.setText(contact.getEducation());
        interests.setText(contact.getInterests());
        knowledgeable.setText(contact.getKnowledgeableIn());
        currentGoals.setText(contact.getCurrentGoals());
        distance.setText(contact.getDistanceAsString(
            UserInfoStore.getLocation(getActivity())));
    }
}

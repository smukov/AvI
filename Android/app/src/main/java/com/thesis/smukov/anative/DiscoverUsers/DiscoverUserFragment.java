package com.thesis.smukov.anative.DiscoverUsers;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.google.gson.Gson;
import com.thesis.smukov.anative.Models.Contact;
import com.thesis.smukov.anative.R;
import com.thesis.smukov.anative.Utils.DownloadImageTask;

import de.hdodenhof.circleimageview.CircleImageView;

/**
 * Created by Smukov on 17-Jul-16.
 */
public class DiscoverUserFragment extends Fragment{

    private Contact contact;

    CircleImageView profileImage;
    TextView profileName;
    TextView employment;
    TextView education;
    TextView interests;
    TextView knowledgeable;
    TextView currentGoals;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ViewGroup rootView = (ViewGroup) inflater.inflate(
                R.layout.discover_contact_layout, container, false);

        Bundle bundle = getArguments();
        String contactJSON = bundle.getString("contact");
        this.contact = new Gson().fromJson(contactJSON, Contact.class);

        return rootView;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        profileImage = (CircleImageView) view.findViewById(R.id.profile_image);
        profileName = (TextView) view.findViewById(R.id.profile_name);
        employment = (TextView) view.findViewById(R.id.txtEmployment);
        education = (TextView) view.findViewById(R.id.txtEducation);
        interests = (TextView) view.findViewById(R.id.txtInterests);
        knowledgeable = (TextView) view.findViewById(R.id.txtKnowledgeable);
        currentGoals = (TextView) view.findViewById(R.id.txtCurrentGoals);

        prepareUI(contact);
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
    }

}

package com.thesis.smukov.anative.Models;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import java.util.Map;

/**
 * Created by smuko on 05-Jul-16.
 */
@IgnoreExtraProperties
public class Contact extends UserInfo{

    @Exclude
    public static final String CONNECION_ACCEPTED = "Accepted";
    @Exclude
    public static final String CONNECION_DECLINED = "Declined";
    @Exclude
    public static final String CONNECION_PENDING = "Pending";

    @Exclude
    @Override
    public Map<String, Object> toMap() {
        Map<String, Object> map = super.toMap();
        //if you need to add additional properties to Contact
        //make sure to add it here to map
        return map;
    }
}

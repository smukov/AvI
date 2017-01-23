package com.thesis.smukov.anative.Models;

import android.location.Location;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import java.util.Map;

/**
 * Created by smuko on 05-Jul-16.
 */
@IgnoreExtraProperties
public class Contact extends UserInfo{

    @Exclude
    public static final String CONNECTION_ACCEPTED = "Accepted";
    @Exclude
    public static final String CONNECTION_DECLINED = "Declined";
    @Exclude
    public static final String CONNECTION_INCOMING = "Incoming";
    @Exclude
    public static final String CONNECTION_OUTGOING = "Outgoing";

    @Exclude
    public float calculateDistance(Location distanceTo){
        float distanceInMeters = this.getLocation().distanceTo(distanceTo);
        return distanceInMeters / 1000;
    }

    @Exclude
    public String getDistanceAsString(Location distanceTo){
        float distanceInKm = calculateDistance(distanceTo);
        return String.format("%.2f", distanceInKm) + " km";
    }

    @Exclude
    @Override
    public Map<String, Object> toMap() {
        Map<String, Object> map = super.toMap();
        //if you need to add additional properties to Contact
        //make sure to add it here to map
        return map;
    }
}

package com.thesis.smukov.anative.Adapters;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.thesis.smukov.anative.Models.Contact;
import com.thesis.smukov.anative.R;
import com.thesis.smukov.anative.Utils.DownloadImageTask;

import java.util.List;

import de.hdodenhof.circleimageview.CircleImageView;

/**
 * Created by smuko on 05-Jul-16.
 */
public class ContactsAdapter extends BaseAdapter {

    private final List<Contact> lstContacts;
    private Activity context;

    public ContactsAdapter(Activity context, List<Contact> contacts) {
        this.context = context;
        this.lstContacts = contacts;
    }

    @Override
    public int getCount() {
        if (lstContacts != null) {
            return lstContacts.size();
        } else {
            return 0;
        }
    }

    @Override
    public Contact getItem(int position) {
        if (lstContacts != null) {
            return lstContacts.get(position);
        } else {
            return null;
        }
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;
        Contact contact = getItem(position);
        LayoutInflater vi = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        if (convertView == null) {
            convertView = vi.inflate(R.layout.list_item_contact, null);
            holder = createViewHolder(convertView);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }

        if(contact.getPictureUrl() != null && contact.getPictureUrl().isEmpty() == false){
            new DownloadImageTask(holder.profileImage)
                    .execute(contact.getPictureUrl());
        }
        holder.txtFullName.setText(contact.getName());
        holder.txtEmployment.setText(contact.getEmployment());
        holder.txtEducation.setText(contact.getEducation());

        return convertView;
    }

    public void add(Contact contact) {
        lstContacts.add(contact);
    }

    public void add(List<Contact> contacts) {
        lstContacts.addAll(contacts);
    }

    public void clear(){
        lstContacts.clear();
    }

    private ViewHolder createViewHolder(View v) {
        ViewHolder holder = new ViewHolder();
        holder.profileImage = (CircleImageView) v.findViewById(R.id.profile_image);
        holder.txtFullName = (TextView) v.findViewById(R.id.profile_name);
        holder.txtEmployment = (TextView) v.findViewById(R.id.txtEmployment);
        holder.txtEducation = (TextView) v.findViewById(R.id.txtEducation);
        return holder;
    }

    private static class ViewHolder {
        public CircleImageView profileImage;
        public TextView txtFullName;
        public TextView txtEmployment;
        public TextView txtEducation;
    }

}

package com.thesis.smukov.anative.NavigationFragment;

import android.app.Fragment;
import android.support.design.widget.FloatingActionButton;
import android.view.View;


public abstract class BaseNavigationFragment extends Fragment
    implements INavigationFragment{

    protected View myView;
    protected FloatingActionButton fab;

    @Override
    public void setFloatingActionButton(FloatingActionButton fab) {
        this.fab = fab;
    }

    protected abstract void prepareFloatingActionButton();
}

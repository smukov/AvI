package com.thesis.smukov.anative.NavigationFragment;

import android.app.ListFragment;
import android.support.design.widget.FloatingActionButton;
import android.view.View;


public abstract class BaseNavigationListFragment extends ListFragment
    implements INavigationFragment{

    protected View myView;
    protected FloatingActionButton fab;

    protected abstract void prepareFloatingActionButton();
}

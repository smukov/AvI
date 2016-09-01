package com.thesis.smukov.anative;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

import com.auth0.core.Token;
import com.auth0.core.UserProfile;
import com.auth0.lock.Lock;
import com.auth0.lock.LockActivity;
import com.auth0.lock.LockContext;

/**
 * A login screen that offers login via oAuth.
 */
public class LoginActivity extends AppCompatActivity {

    private UserProfile userProfile;
    private Token accessToken;

    private final BroadcastReceiver receiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            userProfile = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_PROFILE_PARAMETER);
            accessToken = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
            Log.i("smuk", "User " + userProfile.getName() + " logged in");

            final Intent loggedInIntent =
                    new Intent(getApplicationContext(), NavigationActivity.class);
            startActivity(loggedInIntent);
            finish();
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        // Set up the login form.

        Button btnLogin = (Button) findViewById(R.id.btnLogIn);
        btnLogin.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin();
            }
        });


        LockContext.configureLock(
                new Lock.Builder()
                        .loadFromApplication(getApplication())
                        .closable(true));

        final LocalBroadcastManager broadcastManager =
                LocalBroadcastManager.getInstance(getApplicationContext());
        broadcastManager.registerReceiver(receiver, new IntentFilter(Lock.AUTHENTICATION_ACTION));
    }

    /**
     * Attempts to sign in or register the account specified by the login form.
     * If there are form errors (invalid email, missing fields, etc.), the
     * errors are presented and no actual login attempt is made.
     */
    private void attemptLogin() {

        Intent lockIntent = new Intent(this, LockActivity.class);
        startActivity(lockIntent);
    }
}


package com.thesis.smukov.anative;

import android.app.Activity;
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
import android.widget.TextView;

import com.auth0.api.authentication.AuthenticationAPIClient;
import com.auth0.api.authentication.DelegationRequest;
import com.auth0.api.callback.BaseCallback;
import com.auth0.api.callback.RefreshIdTokenCallback;
import com.auth0.core.Auth0;
import com.auth0.core.Token;
import com.auth0.core.UserProfile;
import com.auth0.lock.Lock;
import com.auth0.lock.LockActivity;
import com.auth0.lock.LockContext;
import com.google.gson.Gson;
import com.thesis.smukov.anative.Models.AccessToken;
import com.thesis.smukov.anative.Models.UserInfo;
import com.thesis.smukov.anative.Store.AccessTokenStore;
import com.thesis.smukov.anative.Store.UserInfoStore;

/**
 * A login screen that offers login via oAuth.
 */
public class LoginActivity extends AppCompatActivity {

    private UserProfile userProfile;
    private Token token;

    private final BroadcastReceiver receiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            userProfile = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_PROFILE_PARAMETER);
            token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);

            logTokens(userProfile, token);

            UserInfo userInfo = new UserInfo();
            userInfo.setName(userProfile.getName());
            userInfo.setEmail(userProfile.getEmail());
            userInfo.setPictureUrl(userProfile.getPictureURL());
            userInfo.setAuthId(userProfile.getId());

            AccessToken accessToken = new AccessToken();
            accessToken.setIdToken(token.getIdToken());
            accessToken.setRefreshToken(token.getRefreshToken());
            accessToken.setAccessToken(token.getAccessToken());

            navigateToNavigationActivity(accessToken, userInfo, false);
            finish();
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        // Set up the login form.

        final Button btnLogin = (Button) findViewById(R.id.btnLogIn);
        btnLogin.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin();
            }
        });
        btnLogin.setVisibility(View.GONE);

        final TextView txtPleaseWait = (TextView) findViewById(R.id.textPleaseWait);
        txtPleaseWait.setVisibility(View.VISIBLE);


        //try to get the login token and log in automatically
        final AccessToken accessToken = AccessTokenStore.getAccessToken(this);
        if(accessToken.getIdToken() == ""){
            //no Id token, user needs to log in.
            instantiateRequiredObjectsForLogin();
            txtPleaseWait.setVisibility(View.GONE);
            btnLogin.setVisibility(View.VISIBLE);

        }else {
            //Id token found, try to log in automatically
            final AuthenticationAPIClient aClient = new AuthenticationAPIClient(
                    new Auth0(getResources().getString(R.string.auth0_client_id),
                            getResources().getString(R.string.auth0_domain)));

            final AppCompatActivity thisActivity = this;

            aClient.tokenInfo(accessToken.getIdToken())
                    .start(new BaseCallback<UserProfile>() {
                        @Override
                        public void onSuccess(final UserProfile payload) {
                            // Valid ID > Navigate to the app's MainActivity
                            startActivity(new Intent(getApplicationContext(), NavigationActivity.class));

                            navigateToNavigationActivity(
                                    AccessTokenStore.getAccessToken(thisActivity),
                                    UserInfoStore.getUserInfo(thisActivity),
                                    true
                                    );
                        }

                        @Override
                        public void onFailure(Throwable error) {
                            //invalid id, try to refresh the token
                            aClient.delegationWithRefreshToken(accessToken.getRefreshToken())
                                    .start(new RefreshIdTokenCallback() {
                                        @Override
                                        public void onSuccess(String idToken, String tokenType, int expiresIn) {
                                            //managed to refresh the token
                                            accessToken.setIdToken(idToken);

                                            navigateToNavigationActivity(
                                                    AccessTokenStore.getAccessToken(thisActivity),
                                                    UserInfoStore.getUserInfo(thisActivity),
                                                    true
                                            );
                                        }

                                        @Override
                                        public void onFailure(Throwable error) {
                                            //need to log in again
                                            instantiateRequiredObjectsForLogin();
                                            txtPleaseWait.setVisibility(View.GONE);
                                            btnLogin.setVisibility(View.VISIBLE);
                                        }
                                    });
                        }
                    });
        }
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

    private void navigateToNavigationActivity(AccessToken accessToken, UserInfo userInfo, Boolean wasLoggedIn){
        final Intent loggedInIntent =
                new Intent(getApplicationContext(), NavigationActivity.class);

        loggedInIntent.putExtra("wasLoggedIn", wasLoggedIn);
        loggedInIntent.putExtra("userInfo", new Gson().toJson(userInfo));
        loggedInIntent.putExtra("accessToken", new Gson().toJson(accessToken));

        startActivity(loggedInIntent);
    }

    private void instantiateRequiredObjectsForLogin(){
        LockContext.configureLock(
                new Lock.Builder()
                        .loadFromApplication(getApplication())
                        .closable(true));

        final LocalBroadcastManager broadcastManager =
                LocalBroadcastManager.getInstance(getApplicationContext());
        broadcastManager.registerReceiver(receiver, new IntentFilter(Lock.AUTHENTICATION_ACTION));
    }

    private void logTokens(UserProfile userProfile, Token accessToken){
        Log.i("smuk", "User " + userProfile.getName() + " logged in");
        Log.i("smuk", "Email  " + userProfile.getEmail());
        Log.i("smuk", "Id " + userProfile.getId());
        Log.i("smuk", "Nick " + userProfile.getNickname());
        Log.i("smuk", "PictureUrl " + userProfile.getPictureURL());
        Log.i("smuk", "extra info " + userProfile.getExtraInfo());
        Log.i("smuk", "User identities " + userProfile.getIdentities());

        Log.i("smuk", "AccessToken " + accessToken.getAccessToken());
        Log.i("smuk", "RefreshToken " + accessToken.getRefreshToken());
        Log.i("smuk", "IdToken " + accessToken.getIdToken());
        Log.i("smuk", "Type " + accessToken.getType());
    }

    private class AuthenticationException extends Exception{
    }
}


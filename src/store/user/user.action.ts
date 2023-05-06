import { User } from 'firebase/auth';

import { AdditionalInformation, UserData } from 'utils/firebase';
import { Action, ActionWithPayload, createAction, withMatcher } from 'utils/reducer';
import { USER_ACTION_TYPES } from './user.type';

type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;

type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    { email: string; password: string }
>;

type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;

type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAIlED, Error>;

export type SignUpStart = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_UP_START,
    { email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    { user: User; additionalDetails: AdditionalInformation }
>;

type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAIlED, Error>;

type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAIlED, Error>;

export const setCurrentUser = withMatcher(
    (user: UserData): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user),
);

export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

// sign in
export const googleSignInStart = withMatcher(
    (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START),
);

export const emailSignInStart = withMatcher(
    (email: string, password: string): EmailSignInStart =>
        createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }),
);

export const signInSuccess = withMatcher(
    (user: UserData & { id: string }): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user),
);

export const signInFailed = withMatcher(
    (error: Error): SignInFailed => createAction(USER_ACTION_TYPES.SIGN_IN_FAIlED, error),
);

// sign up
export const signUpStart = withMatcher(
    (email: string, password: string, displayName: string): SignUpStart =>
        createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName }),
);

export const signUpSuccess = withMatcher(
    (user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
        createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails }),
);

export const signUpFailed = withMatcher(
    (error: Error): SignUpFailed => createAction(USER_ACTION_TYPES.SIGN_UP_FAIlED, error),
);

// sign out
export const signOutStart = withMatcher((): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher(
    (error: Error): SignOutFailed => createAction(USER_ACTION_TYPES.SIGN_OUT_FAIlED, error),
);

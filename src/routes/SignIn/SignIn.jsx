import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';

import { auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from 'utils/firebase';

const SignIn = () => {
    useEffect(() => {
        const checkGoogleRedirectResult = async () => {
            const response = await getRedirectResult(auth);
            console.log('response: ', response);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        };

        checkGoogleRedirectResult();
    }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
        </div>
    );
};

export default SignIn;

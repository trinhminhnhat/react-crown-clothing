import { signInWithGooglePopup } from 'utils/firebase';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log('response: ', response);
    };

    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
        </div>
    );
};

export default SignIn;

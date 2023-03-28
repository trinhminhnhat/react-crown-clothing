import { getRedirectResult } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';

import Button from 'components/Button';
import FormInput from 'components/FormInput';
import { UserContext } from 'contexts/user.context';
import {
    auth,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
} from 'utils/firebase';
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const { setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        const checkGoogleRedirectResult = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        };
        checkGoogleRedirectResult();
    }, []);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        setCurrentUser(user);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                default:
                    console.log('Login error: ', error);
            }
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form action="#" onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    id="password"
                    minLength={6}
                    name="password"
                    onChange={handleChange}
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>
                        Sign in Google
                    </Button>
                    {/* <Button type="button" buttonType="google" onClick={signInWithGoogleRedirect}>
                        Sign in Google Redirect
                    </Button> */}
                </div>
            </form>
        </div>
    );
};

export default SignInForm;

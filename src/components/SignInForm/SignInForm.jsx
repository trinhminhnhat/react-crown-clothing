import { getRedirectResult } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from 'components/Button';
import FormInput from 'components/FormInput';
import { emailSignInStart, googleSignInStart } from 'store/user/user.action';
import { auth, createUserDocumentFromAuth } from 'utils/firebase';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

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

    const signInWithGoogle = () => {
        dispatch(googleSignInStart());
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
            dispatch(emailSignInStart(email, password))

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
        <SignInContainer>
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

                <ButtonsContainer>
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Sign in Google
                    </Button>
                    {/* <Button type="button" buttonType="google" onClick={signInWithGoogleRedirect}>
                        Sign in Google Redirect
                    </Button> */}
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;

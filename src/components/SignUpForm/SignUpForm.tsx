import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Button';
import FormInput from 'components/FormInput';
import { signUpStart } from 'store/user/user.action';
import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormFields((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Password does not match');
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Can not create user, email already in use');
            } else {
                console.log('error createAuthUserWithEmailAndPassword: ', error);
            }
        }
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form action="#" onSubmit={handleSubmit}>
                <FormInput
                    label="Display name"
                    type="text"
                    required
                    id="displayName"
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                />

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

                <FormInput
                    label="Confirm password"
                    type="password"
                    required
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                />

                <Button type="submit">Sign up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;

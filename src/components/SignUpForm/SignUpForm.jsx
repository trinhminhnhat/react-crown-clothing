import { useState } from 'react';

import Button from 'components/Button';
import FormInput from 'components/FormInput';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from 'utils/firebase';
import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
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

        if (password !== confirmPassword) {
            alert('Password does not match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {
                displayName,
            });

            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
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

import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from 'utils/firebase';

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
        <div>
            <h1>Sign up with your email and password</h1>
            <form action="#" onSubmit={handleSubmit}>
                <label htmlFor="displayName">Display name</label>
                <input
                    type="text"
                    required
                    id="displayName"
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                />

                <label htmlFor="email">Email</label>
                <input type="email" required id="email" name="email" onChange={handleChange} value={email} />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    required
                    id="password"
                    minLength={6}
                    name="password"
                    onChange={handleChange}
                    value={password}
                />

                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                    type="password"
                    required
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                />

                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default SignUpForm;

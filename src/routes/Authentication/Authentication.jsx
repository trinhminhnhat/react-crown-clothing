
import SignInForm from 'components/SignInForm';
import SignUpForm from 'components/SignUpForm';
import './authentication.styles.scss';

const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
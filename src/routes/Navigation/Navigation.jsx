import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as CrownLogo } from 'assets/img/crown.svg';
import { UserContext } from 'contexts/user.context';
import { signOutUser } from 'utils/firebase';
import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const handleSignOut = async () => {
        await signOutUser();
        setCurrentUser(null);
    };

    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={handleSignOut}>
                            Sign Out
                        </span>
                    ) : (
                        <Link className="nav-link" to="/auth">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;

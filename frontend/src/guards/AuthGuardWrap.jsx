import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/auth-context";
import PropTypes from "prop-types";

const AuthGuardWrap = (props) => {
    const {children} = props;

    const path = useLocation();
    const navigate = useNavigate()
    const { isAuthenticated } = useAuthContext();
    const ignore = useRef(false);
    const [checked, setChecked] = useState(false);

    // Only do authentication check on component mount.
    // This flow allows you to manually redirect the user after sign-out, otherwise this will be
    // triggered and will automatically redirect to sign-in page.

    useEffect(
        () => {
            if (!path) {
                return;
            }

            // Prevent from calling twice in development mode with React.StrictMode enabled
            if (ignore.current) {
                return;
            }

            ignore.current = true;

            if (!isAuthenticated) {
                console.log('Not authenticated, redirecting');
                navigate('/')
            } else {
                setChecked(true);
            }
        },
        [path]
    );

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.

    return <>{children}</>

};
AuthGuardWrap.propTypes = {
    children: PropTypes.node
};

export default AuthGuardWrap

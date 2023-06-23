import {createContext, useContext, useEffect, useReducer, useRef} from 'react';
import {loginReq} from "../api/auth";

const HANDLERS = {
    INITIALIZE: 'INITIALIZE',
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT'
};


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

const handlers = {
    [HANDLERS.INITIALIZE]: (state, action) => {
        const user = action.payload;

        return {
            ...state,
            ...(
                // if payload (user) is provided, then is authenticated
                user
                    ? ({
                        isAuthenticated: true,
                        isLoading: false,
                        user
                    })
                    : ({
                        isLoading: false
                    })
            )
        };
    },
    [HANDLERS.SIGN_IN]: (state, action) => {
        const user = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    [HANDLERS.SIGN_OUT]: (state) => {
        return {
            ...state,
            isAuthenticated: false,
            user: null
        };
    }
};

const reducer = (state, action) => (
    handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext(initialState);

export const AuthProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const initialized = useRef(false);

    const initialize = async () => {
        // Prevent from calling twice in development mode with React.StrictMode enabled
        if (initialized.current) {
            return;
        }

        initialized.current = true;

        let isAuthenticated = false;

        try {
            isAuthenticated = !!window.sessionStorage.getItem('token');
        } catch (err) {
            console.error(err);
        }

        if (isAuthenticated) {
            const user = {
                id: '5e86809283e28b96d2d38537',
                name: 'default user',
                email: 'default.user@tururu.io'
            };

            dispatch({
                type: HANDLERS.INITIALIZE,
                payload: user
            });
        } else {
            dispatch({
                type: HANDLERS.INITIALIZE
            });
        }
    };

    useEffect(
        () => {
            initialize();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const signIn = async (name, password) => {
        try {
            const authData = await loginReq(name, password);
            window.sessionStorage.setItem('token', authData.token);
        } catch (err) {
            const error = err.response.data.errors
            throw new Error(error[0].msg)
        }

        const user = {
            id: '5e86809283e28b96d2d38537',
            name: 'default',
            email: 'anika.visser@devias.io'
        };

        dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
        });
    };

    const signUp = async (email, name, password) => {
        throw new Error('Sign up is not implemented');
    };

    const signOut = () => {
        window.sessionStorage.removeItem('token');
        dispatch({
            type: HANDLERS.SIGN_OUT
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                signUp,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);

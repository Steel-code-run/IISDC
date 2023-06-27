import {createContext, useContext, useEffect, useReducer, useRef} from 'react';
import {loginReq} from "../api/auth";
import {getUserById} from "../api/users";

enum HANDLERS {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT'
}

export interface User {
    id: number
    email: string
    password: string
    name: string
    blocked: boolean
    roleId: number
    user_telegram_settingsId: number | null
    users_telegramsId: number | null
    role: {
        id: number
        name: string
    }
}

export type StateType = {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: Partial<User> | null,
    signIn?: (name: string, password: string) => void
    signOut?: () => void
    signUp?: (email: string, name: string, password: string) => void
}

type ActionType = {
    type: keyof typeof HANDLERS
    payload?: Partial<User>
}

export type AuthProviderProps = {
    children: React.ReactNode
}

type AuthContextType = {
    state: StateType;
    dispatch: React.Dispatch<ActionType>;
};


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

const handlers = {
    [HANDLERS.INITIALIZE]: (state: any, action: ActionType) => {
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
    [HANDLERS.SIGN_IN]: (state: any, action: ActionType) => {
        const user = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    [HANDLERS.SIGN_OUT]: (state: any) => {
        return {
            ...state,
            isAuthenticated: false,
            user: null
        };
    }
};

const reducer = (state: any, action: ActionType) => (
    handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext =
    createContext<StateType | undefined>(undefined);

export const AuthProvider = (props: AuthProviderProps) => {
    const {children} = props;
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
            const id_user = window.sessionStorage.getItem('id')
            let user = state.user;

            console.log(user, id_user)

            if(!user && id_user) {
                user = (await getUserById(0, 0, id_user));
            }

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

    const signIn = async (name: string, password: string) => {
        let user;
        try {
            const authData = await loginReq(name, password);
            window.sessionStorage.setItem('token', authData.token);
            window.sessionStorage.setItem('id', authData.user.id);
            user = authData.user;

        } catch (err: any) {
            const error = err.response.data.errors
            throw new Error(error[0].msg)
        }
        dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
        });


    };

    const signUp = async (email: string, name: string, password: string) => {
        throw new Error('Sign up is not implemented');
    };

    const signOut = () => {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('id');
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

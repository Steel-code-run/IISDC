import React, {FC} from 'react';
import styles from './AuthForm.module.scss';

export interface AuthFormProps {
}

const AuthForm: FC<AuthFormProps> = () => {
    return (
        <div className={styles.authForm} data-testid="AuthForm">
            AuthForm Component
        </div>

    )
};

export default AuthForm;

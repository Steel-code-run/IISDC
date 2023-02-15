import React, {FC} from 'react';
import styles from './PageAuth.module.scss';
import AuthForm from "../../components/AuthForm/AuthForm";

export interface PageAuthProps {
}

const PageAuth: FC<PageAuthProps> = () => {
    return (
        <div className={styles.pageAuth} data-testid="PageAuth">
            <div className={styles.pageAuth__fon}></div>
            <div className={styles.pageAuth__blockForm}>
                <AuthForm/>
            </div>
        </div>

    )
};

export default PageAuth;

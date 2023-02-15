import React, {FC} from 'react';
import styles from './PageAuth.module.scss';

export interface PageAuthProps {
}

const PageAuth: FC<PageAuthProps> = () => {
    return (
        <div className={styles.pageAuth} data-testid="PageAuth">
            <div className={styles.pageAuth__fon}></div>
            <div className={styles.pageAuth__blockForm}>
                <form action="">

                </form>
            </div>
        </div>

    )
};

export default PageAuth;

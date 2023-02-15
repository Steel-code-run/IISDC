import React, {FC} from 'react';
import styles from './PageHome.module.scss';

export interface PageHomeProps {
}

const PageHome: FC<PageHomeProps> = () => {
    return (
        <div className={styles.pageHome} data-testid="PageHome">
            PageHome Component
        </div>

    )
};

export default PageHome;

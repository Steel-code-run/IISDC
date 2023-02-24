import React, {FC} from 'react';
import styles from './Footer.module.scss';

export interface FooterProps {
}

const Footer: FC<FooterProps> = () => {
    return (
        <div className={styles.footer} data-testid="Footer">
            Footer Component
        </div>

    )
};

export default Footer;

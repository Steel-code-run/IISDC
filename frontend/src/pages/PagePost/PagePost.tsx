import React from 'react';
import styles from './PagePost.module.scss';

const PagePost = <T extends object>(props: T) => {
    console.log(props)

    return (
        <div className={styles.pagePost} data-testid="PagePost">

        </div>

    )
};

export default PagePost;

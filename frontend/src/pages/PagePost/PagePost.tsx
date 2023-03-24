import React from 'react';
import styles from './PagePost.module.scss';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useLocation} from "react-router-dom";

const PagePost = <T extends object>(props: T) => {
    const location = useLocation()
    const { data } = location.state

    return (
        <>
            <Header/>
            <div className={styles.pagePost} data-testid="PagePost">
                {JSON.stringify(data, null, 20)}
            </div>
            <Footer/>
        </>

    )
};

export default PagePost;

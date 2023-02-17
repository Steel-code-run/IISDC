import React, {FC} from 'react';
import styles from './PageHome.module.scss';
import axios from "axios";

export interface PageHomeProps {
}

const PageHome: FC<PageHomeProps> = () => {
    const [posts, setPosts] = React.useState({})
    React.useEffect(() => {
        const config = {
            limit: 20
        }
        axios.post('http://localhost:3003/getGrants', {
            limit: config.limit
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQllQQVNTIiwicm9sZSI6OTk5LCJpZCI6MiwiaWF0IjoxNjc2NDk4MDkyLCJleHAiOjE3MDQ0OTE2OTJ9.clJBjbtR4f0WbBiMYOmkAorVCj5XLvQF0-04lHnghvk'
            }
        },).then((postsServer) => {
            setPosts(postsServer)
        }).catch((err) => {
            console.log(err)
        })
        console.log(posts)
    }, [])

    return (
        <div className={styles.pageHome} data-testid="PageHome">
            {JSON.stringify(posts, null, 10)}
        </div>

    )
};

export default PageHome;

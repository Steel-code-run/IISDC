import React, {FC} from 'react';
import styles from './PageHome.module.scss';
import axios from "axios";

export interface PageHomeProps {
}

const PageHome: FC<PageHomeProps> = () => {
    const [posts, setPosts] = React.useState({})
    React.useEffect(() => {
        const config = {
            limit: 5
        }
        axios.post('http://localhost:3003/grants/get', {
            limit: config.limit
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQllQQVNTIiwicm9sZSI6OTk5LCJpZCI6MiwiaWF0IjoxNjc2NDk3NTQ0LCJleHAiOjE3MDQ0OTExNDR9.7_WhMbLUfk-WP3lm0JAzsIBoZB8UtZ0tJBFMSPD6_gM'
            }
        },).then((postsServer) => {
            setPosts(postsServer)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className={styles.pageHome} data-testid="PageHome">
        </div>
    )
};

export default PageHome;

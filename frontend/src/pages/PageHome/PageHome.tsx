import React, {FC} from 'react';
import styles from './PageHome.module.scss';
import Header from "../../components/Header/Header";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Pie,} from 'react-chartjs-2';
import {useGetBeautifulStatsQuery} from "../../api/auxiliaryRequests.api";


export interface PageHomeProps {
}
ChartJS.register(ArcElement, Tooltip, Legend);


const PageHome: FC<PageHomeProps> = () => {
    const {data: stats} = useGetBeautifulStatsQuery({token: window.localStorage.getItem('token')});
    const arrayStats = []

    for (let stat in stats?.data) {
        arrayStats.push(stats.data[stat])
    }
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

     const data = {
        labels: [`Конкурсы - ${arrayStats[0]}`, `Гранты - ${arrayStats[1]}`],
        datasets: [
            {
                label: 'Количество запарсенных постов',
                data: arrayStats,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Header/>
            <div className={styles.pageHome} data-testid="PageHome">
                <div className="container">
                    <div className={styles.pageHome__graphic}>
                        {'Получено за день парсерами: '}
                        <Pie
                            data={data}
                        />
                    </div>
                </div>

            </div>
        </>
    )
};

export default PageHome;

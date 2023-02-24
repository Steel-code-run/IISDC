import React, {FC} from 'react';
import styles from './PageHome.module.scss';
import Header from "../../components/Header/Header";
import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip,} from 'chart.js';
import {Radar} from 'react-chartjs-2';
import {useGetBeautifulStatsQuery} from "../../api/posts.api";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export interface PageHomeProps {
}

const PageHome: FC<PageHomeProps> = () => {
    const {data: stats} = useGetBeautifulStatsQuery();

    const arrayStats = []

    for (let stat in stats?.data) {
        arrayStats.push(stats.data[stat])
    }
    const data = {
        labels: ['Конкурсы', 'Гранты',  'Вакансии', 'Стажировки'],
        datasets: [
            {
                label: 'Количество полученных данных по категориям: ',
                data: arrayStats,
                backgroundColor: 'rgba(118, 113, 221, 0.4)',
                borderColor: 'rgba(118, 113, 221, 0.8)',
                borderWidth: 1,

            },
        ],
        scales: {
            yAxes: [{
                ticks: {
                    fontSize: 40
                }
            }]
        }

    };
    return (
        <>
            <Header/>
            <div className={styles.pageHome} data-testid="PageHome">
                <div className="container">
                    <div className={styles.pageHome__graphic}>
                        <Radar data={data}/>
                    </div>
                </div>

            </div>
        </>
    )
};

export default PageHome;

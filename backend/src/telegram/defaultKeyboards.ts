import homeBtn from "./btns/homeBtn";
import authBtn from "./btns/authBtn";
import getGrantsBtn from "./btns/getGrantsBtn";
import toSettings from "./btns/toSettings";
import getCompetitionsBtn from "./btns/getCompetitionsBtn";
import getInternshipsBtn from "./btns/getInternshipsBtn";
import getVacanciesBtn from "./btns/getVacanciesBtn";
import setAllowedTimeBtn from "./btns/setAllowedTimeBtn";

const defaultKeyboards = {
    home: [
        [
            homeBtn,
            authBtn,
        ],
        [
            getGrantsBtn
        ],
        [
            getCompetitionsBtn
        ],
        [
            getInternshipsBtn
        ],
        [
            getVacanciesBtn
        ],
        [
            toSettings
        ]
    ],
    settings: [
        [
            homeBtn,
        ],
        [
            setAllowedTimeBtn
        ]
    ]
}

export default defaultKeyboards
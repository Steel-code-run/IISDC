import homeBtn from "./btns/homeBtn";
import authBtn from "./btns/authBtn";
import getGrantsBtn from "./btns/getGrantsBtn";
import toSettings from "./btns/toSettings";
import getCompetitionsBtn from "./btns/getCompetitionsBtn";
import getInternshipsBtn from "./btns/getInternshipsBtn";
import getVacanciesBtn from "./btns/getVacanciesBtn";

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
        ]
    ]
}

export default defaultKeyboards
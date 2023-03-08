import homeBtn from "./btns/homeBtn";
import authBtn from "./btns/authBtn";
import getGrantsBtn from "./btns/getGrantsBtn";
import toSettings from "./btns/toSettings";
import getCompetitionsBtn from "./btns/getCompetitionsBtn";
import getInternshipsBtn from "./btns/getInternshipsBtn";
import getVacanciesBtn from "./btns/getVacanciesBtn";
import setAllowedTimeBtn from "./btns/setAllowedTimeBtn";
import TelegramBot from "node-telegram-bot-api";
import getGrantsBtn5 from "./btns/getGrants5";
import getGrantsBtn10 from "./btns/getGrants10";
import showMeBtn from "./btns/showMeBtn";
import getCompetitions5Btn from "./btns/getCompetitions5Btn";
import getCompetitions10Btn from "./btns/getCompetitions10Btn";



const keyboards = {
    home: [
        [
            getGrantsBtn,
        ],
        [
            getCompetitionsBtn
        ],
        [
            authBtn,
            toSettings,
        ]
    ],
    getGrants:[
        [
            homeBtn,
        ],
        [
            getGrantsBtn5
        ],
        [
            getGrantsBtn10
        ],
    ],
    getCompetitions:[
        [
            homeBtn
        ],
        [
            getCompetitions5Btn
        ],
        [
            getCompetitions10Btn
        ]
    ],
    settings:[
        [
            homeBtn,
        ],
        [
            setAllowedTimeBtn,
        ],
        [
            showMeBtn
        ]
    ]
}

export default keyboards
import homeBtn from "./btns/homeBtn";
import authBtn from "./btns/authBtn";
import getGrantsBtn from "./btns/getGrantsBtn";
import toSettings from "./btns/toSettings";
import getCompetitionsBtn from "./btns/getCompetitionsBtn";
import setAllowedTimeBtn from "./btns/setAllowedTimeBtn";
import getGrantsBtn5 from "./btns/getGrants5";
import showMeBtn from "./btns/showMeBtn";
import getGrantsBtn1 from "./btns/getGrants1";
import getGrantsBtn3 from "./btns/getGrants3";
import getGrantsBtn2 from "./btns/getGrants2";
import getGrantsBtn4 from "./btns/getGrants4";
import setDirectionsBtn from "./btns/setDirectionsBtn";
import getCompetitions1Btn from "./btns/getCompetitions1Btn";
import getCompetitions2Btn from "./btns/getCompetitions2Btn";
import getCompetitions3Btn from "./btns/getCompetitions3Btn";
import getCompetitions4Btn from "./btns/getCompetitions4Btn";
import getCompetitions5Btn from "./btns/getCompetitions5Btn";



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
            getGrantsBtn1
        ],
        [
            getGrantsBtn2
        ],
        [
            getGrantsBtn3
        ],
        [
            getGrantsBtn4
        ],
        [
            getGrantsBtn5
        ],
    ],
    getCompetitions:[
        [
            homeBtn
        ],
        [
            getCompetitions1Btn
        ],
        [
            getCompetitions2Btn
        ],
        [
            getCompetitions3Btn
        ],
        [
            getCompetitions4Btn
        ],
        [
            getCompetitions5Btn
        ],

    ],
    settings:[
        [
            homeBtn,
        ],
        [
            setAllowedTimeBtn,
        ],
        [
            setDirectionsBtn
        ],
        [
            showMeBtn
        ]
    ]
}

export default keyboards
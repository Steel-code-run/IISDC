import moment from "moment";
import {FORMAT_DATE} from "../constants/timeConstants";

export const rangeDeadlineData = (days: number) => {

    const currentDate = moment();
    const newDate = currentDate.add(days, 'days');

    return newDate.format(FORMAT_DATE);
}
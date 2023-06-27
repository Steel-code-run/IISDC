import moment from "moment";
import {FORMAT_DATE} from "../constants/timeConstants";

export const formatDateInISOUTC0 = (date) => moment(Date.parse(date))
    .utcOffset(0)
    .format(FORMAT_DATE);
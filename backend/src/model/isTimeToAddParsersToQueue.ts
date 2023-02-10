const allowTimeStart = "10:00:00"
const allowTimeEnd = "18:00:00"

export const isTimeToAddParsersToQueue = ():boolean => {
    const curTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()

    return (diffDate(allowTimeStart, curTime) > 0) &&
        diffDate(curTime, allowTimeEnd) > 0;
}

function diffDate(date1:string,date2:string):number{
    const date1Arr = date1.split(":")
    const date2Arr = date2.split(":")
    const date1Sec = parseInt(date1Arr[0])*3600 + parseInt(date1Arr[1])*60 + parseInt(date1Arr[2])
    const date2Sec = parseInt(date2Arr[0])*3600 + parseInt(date2Arr[1])*60 + parseInt(date2Arr[2])
    return date2Sec - date1Sec
}
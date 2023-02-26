export function diffDate(date1:string,date2:string):number{
    const date1Arr = date1.split(":")
    const date2Arr = date2.split(":")
    const date1Sec = parseInt(date1Arr[0])*3600 + parseInt(date1Arr[1])*60 + parseInt(date1Arr[2])
    const date2Sec = parseInt(date2Arr[0])*3600 + parseInt(date2Arr[1])*60 + parseInt(date2Arr[2])
    return date2Sec - date1Sec
}
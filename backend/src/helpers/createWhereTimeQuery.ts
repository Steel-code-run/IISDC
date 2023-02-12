export default function createWhereTimeQuery(param:string, timeSince?:string|number, timeTo?:string|number): string {
    let str = ``
    if (timeSince !== undefined) {
        str += ` ${param} >= '${timeSince}'`
    }
    if (timeTo !== undefined) {
        if (str.length > 0)
            str += ` AND ${param} <= '${timeTo}'`
        else
            str += ` ${param} <= '${timeTo}'`
    }

    return str
}
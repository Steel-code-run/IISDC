import {shieldIt} from "@iisdc/utils";

export default function createInsertQuery(obj: Object): string {
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    let query = ' (';

    for (let i = 0; i < keys.length; i++) {
        if (values[i] === undefined) continue
        query += ` ${keys[i]} ,`;
    }
    query = query.slice(0,-1)
    query += ') VALUES ('
    for (let i = 0; i < keys.length; i++) {
        if (values[i] === undefined) continue
        query += ` '${shieldIt(values[i])}' ,`;
    }
    query = query.slice(0,-1)
    query += ')'
    return query
}
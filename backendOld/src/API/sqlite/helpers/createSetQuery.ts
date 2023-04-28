import {shieldIt} from "@iisdc/utils";

export default function createSetQuery(obj: Object, excludeKeys:Array<String> = []): string {
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    let query = " SET "

    for (let i = 0; i < keys.length; i++) {
        if (excludeKeys.includes(keys[i])) continue
        if (values[i] === undefined) continue
        query += ` ${keys[i]} = '${shieldIt(values[i])}',`;
    }

    if (query === ' SET ') {
        query = '';
    }

    return query.slice(0,-1)
}
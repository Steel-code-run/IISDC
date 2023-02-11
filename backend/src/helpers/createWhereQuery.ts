import {shieldIt} from "@iisdc/utils";

export default function createWhereQuery(obj: Object, objLike: Object = {}, exclude:object = {}): string {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const keysLike = Object.keys(objLike);
    const excludeKeys = Object.keys(exclude);

    let query = ' WHERE ';
    let firstAnd = false;
    for (let i = 0; i < keys.length; i++) {
        if (values[i] === undefined) continue
        if (excludeKeys.includes(keys[i])) continue
        if (firstAnd) {
            query += ' AND ';
        }
        if (keysLike.includes(keys[i])) {
            query += ` ${keys[i]} LIKE '%${shieldIt(values[i])}%' `;
        }  else {
            query += ` ${keys[i]} ='${shieldIt(values[i])}' `;
        }
        firstAnd = true;
    }
    if (query === ' WHERE ') {
        query = '';
    }
    return query
}
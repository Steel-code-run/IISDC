import needle from 'needle';
import { JSDOM } from 'jsdom';

export function getHTML(url: string){
    return needle('get', url).then((res) => {
        return new JSDOM(res.body);
    });
}
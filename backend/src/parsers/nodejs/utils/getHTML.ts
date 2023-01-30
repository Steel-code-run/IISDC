import needle from 'needle';
import jsdom from 'jsdom';

export function getHTML(url: string) {
	return needle('get', url).then((res) => {
		return new jsdom.JSDOM(res.body);
	});
}

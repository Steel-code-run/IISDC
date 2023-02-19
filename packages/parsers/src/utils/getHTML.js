const needle = require('needle');
const JSDOM = require("jsdom").JSDOM;

function getHTML(url,headers = {}) {
    return needle('get', url, {
        headers
    }).then((res) => {
        return new JSDOM(res.body);
    });
}

function getHTMLByFadmGov(url) {
    return needle('get', url, {
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'ru,en;q=0.9',
            'Connection': 'keep-alive',
            'Cookie': '_ym_uid=1675392311294956341; _ym_d=1675392311; BX_USER_ID=6fcce300cda6b88b31d635cc9edee149; PHPSESSID=JfJExKv4B2MSRUv15hezLnWqiAXWqmNX; session-cookie=17426c17a463adfa694466b080267f932a82c74f72aa9df96b30b1d5a5633a692351a6d05556125d5fd0ed9849a6f8e2; _ym_isad=2; _ym_visorc=w',
            'Host': 'fadm.gov.ru',
            'Referer': 'https://fadm.gov.ru/news/',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Yandex";v="23"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',

        },

    }).then((res) => {
        return new JSDOM(res.body, {contentType: "text/html"});
    });
}

module.exports = {getHTML, getHTMLByFadmGov}
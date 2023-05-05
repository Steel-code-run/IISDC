const needle = require('needle');
const JSDOM = require("jsdom").JSDOM;

function getHTML(url, headers = {}) {
    return needle('get', url, {
        rejectUnauthorized: false,
        headers
    }).then((res) => {
        return new JSDOM(res.body);
    });
}


module.exports = {getHTML}
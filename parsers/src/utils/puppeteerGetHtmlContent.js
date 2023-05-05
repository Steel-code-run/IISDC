const puppeteer = require('puppeteer')

const options = {
    headless: true,
    defaultViewport: null,
}


async function getHtmlContent(url) {
    try {
        const browser = await puppeteer.launch(options)
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});

        const result = await page.content()
        await browser.close()
        return result
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getHtmlContent
}
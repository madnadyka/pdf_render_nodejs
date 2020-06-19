
const puppeteer = require("puppeteer");

const express = require('express')
const app = express()
const port = 3000
const host = '0.0.0.0';
app.get("/", async (req, res)  => {
    res.send('Hello from Express!')
});

app.get("/pdf_render", async (req, res)  => {
     let uri='';
     if ('uri' in req.query) {
            uri = req.query.uri;
     }
     console.log('uri',uri)

    let headers = {}
    // headers['access-token'] = ''

    let browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage','--disable-extensions'],
        ignoreHTTPSErrors: true
    });

    let page = await browser.newPage();


    try {
        await page.setExtraHTTPHeaders(headers);
        await page.goto(uri);
        await page.emulateMedia('screen')
        await page.waitFor(3000)
        const buffer = await page.pdf({'landscape': true, 'format': 'A2', 'printBackground': true});
        await page.close();
        await browser.close();
        res.writeHead(200, {"Content-Type": "application/pdf"});
        res.end(buffer);
    } catch (e) {
                    try {
                        await page.close();
                        await browser.close();
                    } catch (e) {

                    }
                    console.log("error ",e)
                    const puppeteer = require("puppeteer");
                    res.status(500).send('Something broke!')
                }
});
app.listen(port, host, (err) => {
    console.log(`server is listening on ${port}`)
});


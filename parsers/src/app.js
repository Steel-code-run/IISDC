import express from 'express';
import {parsersParams} from "./defaultParsers.ts";

const { callParser } = require("./index.js");
const app = express();
app.use(express.json());
const port = 3333;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/parsers/:name/:page', async function (req, res) {
    const { name, page } = req.params;
    const parsers = parsersParams;
    const matchParser = parsers.filter(parser => parser.name === name)?.[0];
    if (matchParser && page > 0) {
        const posts = await callParser({
            parser: matchParser,
            page: page
        });
        res.status(200).send(posts);
    }
    else {
        res.status(403).send('false params');
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server parsers is running at http://localhost:${port}⚡️`);
});

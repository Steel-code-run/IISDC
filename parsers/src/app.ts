import express from 'express'
import {parsersParams} from "./defaultParsers";
import {callParser} from "./index";


const app = express();
app.use(express.json())
const port = 3333;


app.get('/', (req, res) => {
    res.send('Server start');
});
app.get('/parsers/:name/:page', async function (req , res){

    if (!req.params.name || !req.params.page) {
        return res.status(403).send('false params' );
    }
    console.log(req.params)

    const {name, page} = req.params;
    const parsers = parsersParams ;
    const matchParser = parsers.filter((parser: any) => parser.name === name)?.[0];

    if (!matchParser) {
        return res.status(403).send('Undefined parser');
    }

    if(matchParser && +page > 0) {
        const posts = await callParser({
            parser: matchParser,
            page: +page
        })
        return res.status(200).send( posts);
    }
    else {
        return res.status(403).send('false params' );
    }

});

app.listen(port, () => {
    console.log(`⚡️[server]: Server parsers is running at http://localhost:${port}⚡️`);
});
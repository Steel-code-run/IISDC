import express from 'express'
import {getNamesParsers} from "./helpers/getNamesParsers.js";


const app = express();
app.use(express.json())
const port = 3333;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/parsers/:name/:page', async function (req , res){
    const parserNames = await getNamesParsers();
    const {name, page} = req.params;
    if(parserNames.includes(name) && page > 0) {
        res
            .status(200)
            .send(req.params.name + ' ' + req.params.page );
    }
    else {
        res
            .status(403)
            .send('false params' );
    }

});

app.listen(port, () => {
    console.log(`⚡️[server]: Server parsers is running at http://localhost:${port}⚡️`);
});
import {Router} from 'express';
import {callParser} from '@iisdc/parser';
import {TParserTypes} from '@iisdc/types';
import * as path from "path"

const router = Router();
router.get('/', (reg, res) => {
	try {
		const result = callParser({
			parser: {
				fileUrl: path.join("fadm.gov"),
				// fileUrl: __projectPath + '\\parsers\\nodejs\\cptgrantov\\parser.ts',
				parserType: TParserTypes['ts-node'],
				url: 'https://rsci.ru/grants/',
				name: 'RSCI_grants',
			},
		});

		res.json(result);
	} catch (e){
		res.status(500).json(e);
	}

});
export default router;
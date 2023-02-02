import { Router } from 'express';
import { callParser } from '~/src/parsers/parserInterface';
import { TParserTypes } from '~/src/types/serializables/parser';
import { __projectPath } from '~/src/utils/projectPath';
import * as path from 'path';

const router = Router();
router.get('/', (reg, res) => {
	const result = callParser({
		parser: {
			fileUrl: path.join(
				__projectPath,
				'parsers',
				'nodejs',
				'fasie',
				'parser.js'
			),
			// fileUrl: __projectPath + '\\parsers\\nodejs\\cptgrantov\\parser.ts',
			parserType: TParserTypes['ts-node'],
			url: 'https://rsci.ru/grants/',
			name: 'RSCI_grants',
		},
	});

	res.json(result);
});

export default router;

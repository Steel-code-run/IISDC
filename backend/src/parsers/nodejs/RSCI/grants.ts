const page = process.argv[2];

console.log(
	JSON.stringify({
		type: 'grant',
		parseErrors: ['Ошибка 20000000000000'],
		posts: [
			{
				direction: 'direction',
				organization: 'organization',
				timeOfStart: 'timeOfStart',
				summary: 'summary',
				timeOfEnd: 'timeOfEnd',
				directionForSpent: 'directionForSpent',
				fullText: 'fullText',
				link: 'link',
			},
			{
				direction: 'direction',
				organization: 'organization',
				timeOfStart: 'timeOfStart',
				summary: 'summary',
				timeOfEnd: 'timeOfEnd',
				directionForSpent: 'directionForSpent',
				fullText: 'fullText',
				link: 'link',
			},
		],
	})
);

import axios from 'axios';

export const getPostsChannel = async ({ nameUrl, limit = 10, offset = 0 }) => {
	const options = {
		method: 'GET',
		url: 'https://telegram92.p.rapidapi.com/api/history/chat',
		params: { chat: nameUrl, limit: limit, offset: offset },
		headers: {
			'X-RapidAPI-Key':
				'0c1b753068msh0c677463d1cc7f3p1dbf36jsn40aedb93fc71',
			'X-RapidAPI-Host': 'telegram92.p.rapidapi.com',
		},
	};
	const response = await axios.request(options);
	return response.data.messages.map((post) => {
		return {
			text: post.text,
			html: post.html,
			date: post.date,
			id: post.id,
		};
	});
};

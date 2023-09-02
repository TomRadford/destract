import { promptAsync } from '$lib/ai.server';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const motivation = await promptAsync(
		'give me a motivational but cheeky sentences like: now get back to work you cheeky rascal'
	);
	return json(motivation);
};

import { handleAuth } from '$lib/auth.server.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();

		if (!username) {
			return fail(422, {
				error: {
					message: 'no-username',
					reminder: ''
				}
			});
		}

		return await handleAuth({ username, cookies });
	}
};

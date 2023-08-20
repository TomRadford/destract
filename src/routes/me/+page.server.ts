import { usernameReminders } from '$lib/constants/motivations.server.js';
import { getUser } from '$lib/services/user.server.js';
import { getRandom } from '$lib/utils/random.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();

		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		if (!username) {
			return fail(422, {
				error: {
					message: 'no-username',
					reminder: ''
				}
			});
		}

		const user = await getUser(username);

		if (!user) {
			return fail(422, {
				error: { message: 'no-user', reminder: getRandom(usernameReminders) }
			});
		}

		cookies.set('username', user.username);
		return { success: true, username };
	}
};

import { usernameReminders } from '$lib/constants/motivations.server.js';
import { deleteUser, getUser } from '$lib/services/user.server.js';
import { getRandom } from '$lib/utils/random.js';
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

		const user = await getUser(username);

		if (!user) {
			return fail(422, {
				error: { message: 'no-user', reminder: getRandom(usernameReminders) }
			});
		}

		const currentUsername = cookies.get('username');
		if (currentUsername) {
			await deleteUser(currentUsername);
		}

		cookies.set('username', user.username);
		return { success: true, username };
	}
};

import { fail, type Cookies } from '@sveltejs/kit';
import { generateNewUser, getUser } from './services/user.server';
import { getRandom } from './utils/random';
import { usernameReminders } from './constants/motivations.server';
import type { User } from '@prisma/client';

/**
 * Auth logic 🔒
 */
export const handleAuth = async ({
	cookies,
	username
}: {
	cookies: Cookies;
	username?: string;
}) => {
	let user: User | null;
	if (!username) {
		//in case of /login server action - we gen new user 🥳
		user = await generateNewUser();
	} else {
		user = await getUser(username);
	}

	console.log({ user });

	if (!user) {
		return fail(422, {
			error: { message: 'no-user', reminder: getRandom(usernameReminders) }
		});
	}

	cookies.set('username', user.username, { path: '/' });

	return { success: true, username };
};

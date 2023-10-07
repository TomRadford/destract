import { generateNewUser, getUser } from '$lib/services/user.server.js';
import type { User } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

export async function load({ url, cookies }) {
	const username = cookies.get('username');
	console.log({ username });

	// Probably a more aesthetically pleasing way to do this redir, but does the trick for now
	if (['/login', '/login/return'].includes(url.pathname)) {
		if (username) {
			//don't let the user try login again haha
			throw redirect(302, '/');
		}
		return {
			url: url.pathname,
			user: undefined
		};
	}

	// User setting/getting

	let user: User | null;

	if (username) {
		user = await getUser(username);
		if (!user) {
			//wipe cookie and go to login if username does not exist
			cookies.delete('username');
			throw redirect(302, '/login');
		}
	} else {
		//go to login if no cookie --> so the user can request a username
		// Note: this provides a nice `join` button so that the user can
		// see some yummmy loading state while gpt is cooking up a funny username
		// this solves the nasty issue of slow initial loads while we rip through db
		// and gpt api to get a fresh username
		throw redirect(302, '/login');
	}

	//finally, if we have a user, return the path url and user for ui
	return {
		url: url.pathname,
		user: user
	};
}

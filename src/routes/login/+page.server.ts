import { handleAuth } from '$lib/auth.server.js';

export const actions = {
	default: async ({ cookies }) => {
		return await handleAuth({ cookies });
	}
};

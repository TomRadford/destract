import prisma from '$lib/prisma.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { user } = await parent();
	const thoughts = await prisma.thought.findMany({ where: { userId: user.id } });

	if (!thoughts.length) {
		throw redirect(300, '/');
	}

	return {
		thoughts
	};
};

import prisma from '$lib/prisma.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { user } = await parent();
	const thoughtCount = await prisma.thought.count({ where: { userId: user.id } });
	if (!thoughtCount) {
		throw redirect(307, '/');
	}

	if (!user.canRemember) {
		throw error(401, {
			message: 'Naughty! You need to answer the questions first! 🫢'
		});
	}

	await prisma.user.update({ where: { id: user.id }, data: { canRemember: false } });

	return {
		thoughts
	};
};

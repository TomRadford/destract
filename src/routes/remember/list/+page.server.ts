import prisma from '$lib/prisma.js';
import { Prisma } from '@prisma/client';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { user } = await parent();
	const thoughtQuery = { where: { userId: user.id } };

	const thoughtCount = await prisma.thought.count(thoughtQuery);
	if (!thoughtCount) {
		throw redirect(307, '/');
	}

	if (!user.canRemember) {
		throw error(401, {
			message: 'Naughty! You need to answer the questions first! 🫢'
		});
	}

	await prisma.user.update({ where: { id: user.id }, data: { canRemember: false } });

	const thoughts = await prisma.thought.findMany(thoughtQuery);
	return {
		thoughts
	};
};

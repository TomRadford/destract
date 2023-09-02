import prisma from '$lib/prisma.js';

export const load = async ({ parent }) => {
	const { user } = await parent();
	const thoughts = await prisma.thought.findMany({ where: { userId: user.id } });

	return {
		thoughts
	};
};

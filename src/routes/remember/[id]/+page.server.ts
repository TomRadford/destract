import prisma from '$lib/prisma.js';

export const load = async ({ params }) => {
	const { id } = params;
	const thought = await prisma.thought.findUnique({ where: { id } });
	await prisma.thought.delete({ where: { id } });
	return { thoughtContent: thought?.content };
};

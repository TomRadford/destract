import prisma from '$lib/prisma.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { id } = params;
	const thought = await prisma.thought.findUnique({ where: { id } });
	try {
		await prisma.thought.delete({ where: { id } });
	} catch {
		throw error(500, { message: 'This thought has vanished 💨' });
	}
	return { thoughtContent: thought?.content };
};

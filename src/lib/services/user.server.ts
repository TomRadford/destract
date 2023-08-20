import { promptAsync } from '$lib/ai.server';
import prisma from '$lib/prisma';
import type { User } from '@prisma/client';
import { getUniqueName } from './uniqueName';

export const createUser = async (username: string) => {
	return await prisma.user.create({ data: { username } });
};

export const getUser = async (username: string) => {
	return await prisma.user.findUnique({ where: { username } });
};

export const generateNewUser = async () => {
	let username: string;

	try {
		username = (await promptAsync('give me a silly name')) ?? getUniqueName();
	} catch {
		username = getUniqueName();
	}

	console.log(username);

	return await createUser(username);
};

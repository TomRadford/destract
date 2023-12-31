import { promptAsync } from '$lib/ai.server';
import prisma from '$lib/prisma';
import { getUniqueName } from './uniqueName';

export const createUser = async (username: string) => {
	return await prisma.user.create({ data: { username } });
};

export const getUser = async (username: string) => {
	return await prisma.user.findUnique({ where: { username } });
};

export const deleteUser = async (username: string) => {
	return await prisma.user.delete({ where: { username } });
};

const recursivleyGenerateName = async (): Promise<string> => {
	let username = '';
	console.log(`running new name gen @ ${new Date().toString()}`);
	try {
		username = (await promptAsync('give me a very random funny silly name')) ?? getUniqueName();
	} catch {
		username = getUniqueName();
	}
	if (await prisma.user.findUnique({ where: { username } })) {
		return recursivleyGenerateName();
	}
	return username;
};

export const generateNewUser = async () => {
	const username = await recursivleyGenerateName();

	return await createUser(username);
};

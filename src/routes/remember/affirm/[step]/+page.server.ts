import { promptAsync } from '$lib/ai.server.js';
import { distractionChecks } from '$lib/constants/checks.server.js';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma.js';

export const load = async ({ params, parent }) => {
	const { user } = await parent();

	const count = await prisma.thought.count({ where: { userId: user.id } });
	if (!count) {
		throw redirect(300, '/remember/nothing');
	}

	const affirm = params.step === '2';
	const index = Math.round(Math.random() * (distractionChecks.length - 1));
	return {
		check: {
			message: `${affirm ? 'Great! ' : ''}${distractionChecks[index].question}`,
			index
		}
	};
};

export const actions = {
	default: async ({ cookies, request, url, params }) => {
		const data = await request.formData();
		const username = cookies.get('username');
		const userResponse = data.get('response');
		const index = data.get('index');
		const affirm = params.step === '2';

		if (!username || !userResponse || !index) {
			throw redirect(300, '/');
		}

		const exitResponse = distractionChecks[parseInt(index as string)].response;

		const yesNo = await promptAsync(
			`Convert this into either 'yes' or 'no': '${userResponse}'`,
			0.8
		);

		console.log('_____NEW______');
		console.log({ userResponse, index: parseInt(index as string) });
		console.log({ exitResponse, yesNo });

		if (exitResponse === yesNo) {
			console.log(`${exitResponse} === ${yesNo}`);
			throw redirect(300, '/remember/forget');
		}

		if (!affirm) {
			throw redirect(300, '/remember/affirm/2');
		} else {
			throw redirect(300, '/remember/list');
		}
	}
};

import {
	OpenAIApi,
	Configuration,
	type ResponseTypes,
	type CreateChatCompletionRequest,
	type ChatCompletionRequestMessage
} from 'openai-edge';
import { OPENAI_API_KEY } from '$env/static/private';

const openAIConfig = new Configuration({
	apiKey: OPENAI_API_KEY
});

export const openai = new OpenAIApi(openAIConfig);

export const aiPrompt = async (
	messages: ChatCompletionRequestMessage[],
	stream = false,
	temperature = 0.6
) =>
	await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		stream,
		temperature,
		messages
	});

export const promptAsync = async (prompt: string, temperature = 0.6) => {
	const res = await aiPrompt([{ role: 'system', content: prompt }], false, temperature);

	const data = (await res.json()) as ResponseTypes['createChatCompletion'];

	return data.choices[0].message?.content;
};

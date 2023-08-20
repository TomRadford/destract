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

export const aiPrompt = async (messages: ChatCompletionRequestMessage[], stream = false) =>
	await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		stream,
		temperature: 0.6,
		messages
	});

export const promptAsync = async (prompt: string) => {
	const res = await aiPrompt([{ role: 'system', content: prompt }]);

	const data = (await res.json()) as ResponseTypes['createChatCompletion'];

	return data.choices[0].message?.content;
};

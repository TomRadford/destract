import { uniqueNamesGenerator, type Config, names } from 'unique-names-generator';

const config: Config = {
	dictionaries: [names]
};

export const getUniqueName = () => uniqueNamesGenerator(config);

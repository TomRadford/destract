import { z } from 'zod';

export const thoughtSchema = z.object({
	id: z.string(),
	content: z.string()
});

export const userSchema = z.object({
	id: z.string(),
	thoughts: thoughtSchema.optional()
});

import { z } from 'zod';

export const noteUpdateDTO = z.object({
	title: z.string().min(2).max(70),
	description: z.string().length(8),
});

export type NoteUpdateDTO = z.infer<typeof noteUpdateDTO>;

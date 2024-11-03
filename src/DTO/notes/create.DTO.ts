import { z } from 'zod';

export const createNoteDTO = z.object({
	title: z.string().min(2).max(70),
	description: z.string().max(1000).optional(),
});

export type createNoteDTO = z.infer<typeof createNoteDTO>;

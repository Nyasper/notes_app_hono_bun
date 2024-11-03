import { z } from 'zod';

export const updateNoteDTO = z.object({
	username: z.string().length(4),
	password: z.string().length(8),
});

export type UpdateNoteDTO = z.infer<typeof updateNoteDTO>;

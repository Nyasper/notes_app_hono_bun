import { z } from 'zod';
import { NoteDTOConsts } from './validationConstants';

const { title, description } = NoteDTOConsts;

export const noteCreateDTO = z.object({
	title: z.string().min(title.min).max(title.max),
	description: z.string().max(description.max).default(description.default),
});

export type NoteCreateDTO = z.infer<typeof noteCreateDTO>;

export const NoteDTOConsts: NoteValidationConstants = {
	title: {
		min: 2,
		max: 70,
	},
	description: {
		max: 1000,
		default: '',
	},
};

interface NoteValidationConstants {
	title: {
		min: number;
		max: number;
	};
	description: {
		max: number;
		default: string;
	};
}

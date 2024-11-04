export const userDTOConsts: UserValidationConstants = {
	username: {
		min: 3,
		max: 16,
	},
	password: {
		min: 5,
		max: 26,
	},
};

interface UserValidationConstants {
	username: {
		min: number;
		max: number;
	};
	password: {
		min: number;
		max: number;
	};
}

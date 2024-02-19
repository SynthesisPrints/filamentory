export {};

// Create a type for the roles
export type Roles = 'admin';

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			role?: Roles;
		};
	}

	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			NODE_ENV: 'development' | 'production';
		}
	}
}

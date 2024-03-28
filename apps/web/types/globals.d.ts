export {};

// Create a type for the roles
export type Role = 'admin' | 'test';

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			roles?: Role[];
		};
	}

	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			NODE_ENV: 'development' | 'production';
		}
	}
}

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}

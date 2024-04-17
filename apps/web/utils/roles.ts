'use server';

import { Role } from '@/types/globals';
import { auth } from '@clerk/nextjs/server';

export const hasRole = async (role: Role) => {
	const { sessionClaims } = auth();
	return sessionClaims?.metadata.roles?.includes(role) ?? false;
};

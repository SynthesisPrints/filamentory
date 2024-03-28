import NotFound from '@/app/not-found';
import { hasRole } from '@/utils/roles';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	auth().protect();
	if (!(await hasRole('admin'))) return <NotFound />;

	return <>{children}</>;
}

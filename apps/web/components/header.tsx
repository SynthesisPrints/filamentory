'use client';

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { Drawer, Logo, ThemeToggle } from '@repo/ui';
import { useState } from 'react';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';

export const Header = () => {
	const [open, setOpen] = useState(false);
	const { user } = useUser();

	return (
		<header className="grid grid-flow-col justify-between items-center p-2 bg-base-200">
			<div className="grid gap-2 grid-flow-col items-center">
				<SignedIn>
					<button className="btn btn-ghost min-h-0 size-auto p-1" onClick={() => setOpen(true)}>
						<HiMiniBars3CenterLeft className="size-6" />
					</button>
				</SignedIn>
				<Logo trim className="size-9" />
				<h1 className="font-black text-xl">
					<span>spool</span>
					<span className="text-accent">hub</span>
				</h1>
			</div>
			<div className="grid grid-flow-col items-center gap-2">
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
				<SignedOut>
					<SignInButton>
						<button className="btn btn-ghost">Sign In</button>
					</SignInButton>
				</SignedOut>
			</div>

			<Drawer show={open} onClose={setOpen} header={user?.fullName}>
				<ThemeToggle />
			</Drawer>
		</header>
	);
};

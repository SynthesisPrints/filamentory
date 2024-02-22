import { Logo } from '@repo/ui';
import Image from 'next/image';
import circles from '../public/circles.svg';

export default function Page(): JSX.Element {
	return (
		<main className="grid h-screen w-screen place-items-center relative">
			<div>
				<div className="grid place-items-center">
					<Image className="absolute z-[-1] size-full" alt="glowing gradient" src={circles} />
					<Logo className="size-40" />
				</div>
				<h1 className="text-5xl font-black">
					<span>spool</span>
					<span className="text-accent">hub</span>
				</h1>
			</div>
		</main>
	);
}

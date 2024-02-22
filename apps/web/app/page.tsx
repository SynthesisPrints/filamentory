import Image from 'next/image';
import circles from '../public/circles.svg';
import favicon from './icon.svg';

export default function Page(): JSX.Element {
	return (
		<main className="grid h-screen w-screen place-items-center">
			<div>
				<div className="grid place-items-center">
					<Image className="absolute" alt="glowing gradient" src={circles} />
					<Image src={favicon} alt="favicon" className="size-40" />
				</div>
				<h1 className="text-5xl font-black">
					<span>spool</span>
					<span className="text-accent">hub</span>
				</h1>
			</div>
		</main>
	);
}

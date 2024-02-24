import { Logo } from '@repo/ui';

export default function Page(): JSX.Element {
	return (
		<main className="grid h-[100dvh] w-[100dvw] place-items-center">
			<div>
				<div className="grid place-items-center stacked">
					<div className="size-60 ring ring-base-content/25 rounded-full animate-[ping_2s_infinite]" />
					<div className="size-40 bg-base-content/25 rounded-full animate-[ping_2s_infinite]" />
					<Logo className="z-10 size-40" />
				</div>
				<h1 className="text-5xl -mt-10 font-black">
					<span>spool</span>
					<span className="text-accent">hub</span>
				</h1>
			</div>
		</main>
	);
}

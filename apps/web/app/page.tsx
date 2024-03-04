import { Logo } from '@repo/ui';

export default function Page(): JSX.Element {
	return (
		<div className="grid h-full w-full place-items-center">
			<div>
				<div className="grid place-items-center stacked">
					<div className="z-[-2] mt-3 size-40 ring ring-base-content/25 rounded-full animate-[ping_2s_infinite]" />
					<div className="z-[-2] mt-3 size-20 bg-base-content/25 rounded-full animate-[ping_2s_infinite]" />
					<Logo className="z-[-1]" trim />
				</div>
				<h1 className="text-5xl font-black text-center">
					<span>spool</span>
					<span className="text-accent">hub</span>
				</h1>
			</div>
		</div>
	);
}

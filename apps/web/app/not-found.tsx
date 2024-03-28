import { Logo } from '@repo/ui';

export default function NotFound(): JSX.Element {
	return (
		<div className="grid place-items-center">
			<div>
				<div className="flex justify-center items-center">
					<span className="text-5xl">4</span>
					<Logo className="size-12" />
					<span className="text-5xl">4</span>
				</div>
				<p className="text-xl">page not found</p>
			</div>
		</div>
	);
}

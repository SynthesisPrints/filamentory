import { SignUp } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className={'grid h-screen w-screen place-items-center'}>
			<SignUp />
		</div>
	);
}

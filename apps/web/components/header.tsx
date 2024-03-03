export type HeaderProps = {};

export const Header = (props: HeaderProps) => {
	return (
		<header className="grid grid-flow-col justify-between items-center p-4">
			<div>logo</div>
			<div>cta buttons</div>
			<div>hamburger</div>
		</header>
	);
};

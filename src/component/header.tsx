export default function Main(): JSX.Element {
	return (
		<header className="!bg-white z-50 fixed w-screen top-0 flex items-center border py-2 px-8 justify-between">
			<h1 className="text-xl font-semibold tracking-wider">InstaDog</h1>
			<a
				className="hover:rotate-12 transition-transform"
				href="https://github.com/NikSchaefer/InstaDog"
			>
				<img
					className="w-12 h-12"
					src="https://dev-discords.nikschaefer.com/github.svg"
				/>
			</a>
		</header>
	);
}

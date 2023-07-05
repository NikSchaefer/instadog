import { FaGithub } from "react-icons/fa";

export default function Main(): JSX.Element {
	return (
		<header className="">
			<a href="#">InstaDog</a>
			<a href="https://github.com/NikSchaefer/InstaDog">
				<FaGithub size={30} />
			</a>
		</header>
	);
}

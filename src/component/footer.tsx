import {
	Home,
	Compass,
	Clapperboard,
	PlusSquare,
	MessageCircle,
	UserCircle,
} from "lucide-react";

export default function Main(): JSX.Element {
	return (
		<footer className="fixed bottom-0 left-0 w-full">
			<div className="bg-white flex justify-center w-full px-8 gap-4 py-3 border">
				<Home size={30} />
				<Compass size={30} />
				<Clapperboard size={30} />
				<PlusSquare size={30} />
				<MessageCircle size={30} />
				<UserCircle size={30} />
			</div>
		</footer>
	);
}

import clsx from "clsx";
import { useState } from "react";
import { PostType } from "types";
import RenderFile from "./image";
import { Github, Heart, MoreHorizontal, Send } from "lucide-react";

export function Card({
	post,
	setShareURL,
}: {
	post: PostType;
	setShareURL: Function;
}) {
	const [isLiked, setLiked] = useState(false);

	function onShare() {
		setShareURL(
			String(
				`https://instadog.vercel.app/?share=${encodeURIComponent(
					post.img.replace("https://random.dog/", "")
				)}`
			)
		);
	}

	return (
		<div className="flex flex-col w-full border rounded-lg mx-auto my-4 max-w-[500px] bg-white">
			<div className="flex p-4 justify-between items-center">
				<div className="flex items-center">
					<img
						className="w-10 h-10 rounded-full"
						src={`/profile/${post.profile}.jpg`}
					/>
					<div>
						<p className="ml-2 font-semibold text-sm">
							{post.name}
						</p>
						<span className="ml-2 text-xs">{post.location}</span>
					</div>
				</div>
				<MoreHorizontal size={20} />
			</div>
			<RenderFile doubleClick={() => setLiked(true)} source={post.img} />
			<div className="w-[95%] mx-auto px-2 py-4">
				<div className="flex items-center">
					<Heart
						onClick={() => setLiked(!isLiked)}
						className={clsx(
							"cursor-pointer hover:text-gray-500 transition-colors",
							isLiked
								? "text-pink-500 hover:text-pink-500"
								: "text-black"
						)}
					/>
					<a
						className="ml-2 hover:text-gray-500 transition-colors"
						href="https://github.com/NikSchaefer/InstaDog"
					>
						<Github />
					</a>
					<button
						className="ml-auto hover:text-gray-500 transition-colors"
						onClick={onShare}
					>
						<Send />
					</button>
				</div>
				<div className="flex items-center mt-2">
					{post.attention.map((profile, i) => (
						<img
							style={{
								transform: `translateX(-${7 * i}px)`,
							}}
							className="!w-8 h-8 rounded-full border-2 border-white "
							src={`/profile/${profile}.jpg`}
						/>
					))}
					<p className="text-base my-2 -translate-x-1">
						Liked by{" "}
						<span className="font-semibold">
							{String(isLiked ? post.likes + 1 : post.likes)}{" "}
							others
						</span>
					</p>
				</div>

				<p>
					<span className="font-semibold">{post.name}</span>{" "}
					{post.description}
				</p>
				<p className="text-gray-500 text-sm pt-1">
					{post.days} day{post.days > 1 ? "s" : ""} ago
				</p>
			</div>
		</div>
	);
}

import clsx from "clsx";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { useRef, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { PostType } from "types";

function Img({
	source,
	doubleClick,
}: {
	source: string;
	doubleClick: Function;
}) {
	const fileType = source.slice(-3);
	if (fileType === "mp4") {
		return (
			<video
				preload="none"
				onDoubleClick={() => doubleClick()}
				className="dog-image"
				autoPlay
				loop
				muted
			>
				<source src={source} type="video/mp4" />
			</video>
		);
	}
	return (
		<img
			loading="lazy"
			onDoubleClick={() => doubleClick()}
			src={source}
			className="dog-image"
			alt="loading... maybe"
		/>
	);
}

function Heart({ liked, onClick }: { liked: boolean; onClick: Function }) {
	const ref = useRef<SVGSVGElement>(null);

	useDidUpdateEffect(() => {
		if (!ref) return;
		if (!liked) {
			// @ts-ignore
			ref.current.style.animation = "UndoLike 0.4s forwards";
		} else {
			// @ts-ignore
			ref.current.style.animation = "Like 0.4s forwards";
		}
	}, [liked]);

	return (
		<svg
			ref={ref}
			fill={clsx(liked ? "#ed4956" : "#fff")}
			stroke={clsx(liked ? "#ed4956" : "#000")}
			className="like"
			onClick={() => onClick()}
			xmlns="http://www.w3.org/2000/svg"
			width="44"
			height="44"
			viewBox="0 0 24 24"
			strokeWidth="1"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
		</svg>
	);
}

export function Card({
	post,
	setShareURL,
}: {
	post: PostType;
	setShareURL: Function;
}) {
	const [isLiked, setLiked] = useState<boolean>(false);

	return (
		<div className="card">
			<Img doubleClick={() => setLiked(true)} source={post.img} />
			<div className="border">
				<div className="card-bottom">
					<div className="card-bottom-imgs">
						<Heart
							onClick={() => setLiked(!isLiked)}
							liked={isLiked}
						/>
						<a href="https://github.com/NikSchaefer/InstaDog">
							<FaGithub size={30} />
						</a>
						<FaShare
							size={30}
							onClick={() => {
								setShareURL(
									String(
										`https://instadog.vercel.app/?share=${encodeURIComponent(
											post.img.replace(
												"https://random.dog/",
												""
											)
										)}`
									)
								);
							}}
							className="right"
						/>
					</div>
					<p className="likes">
						{String(isLiked ? post.likes + 1 : post.likes)} Likes
					</p>
					<p>{post.description}</p>
				</div>
			</div>
		</div>
	);
}

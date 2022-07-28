import clsx from "clsx";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { useRef, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";
import { PostType } from "types";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { SiGithubsponsors } from "react-icons/si";

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
				className="w-full min-h-[100px]"
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
			onDoubleClick={() => {
				console.log("here");
				doubleClick();
			}}
			src={source}
			className="w-full min-h-[100px]"
			alt="loading... maybe"
		/>
	);
}

function Heart({
	liked,
	onClick,
	size,
}: {
	liked: boolean;
	onClick: Function;
	size: number;
}) {
	const ref = useRef<HTMLDivElement>(null);

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
		<div ref={ref}>
			<SiGithubsponsors
				color={clsx(liked ? "#ed4956" : "#000")}
				fill={clsx(liked ? "#ed4956" : "#000")}
				stroke={clsx(liked ? "#ed4956" : "#000")}
				strokeWidth={"0px"}
				onClick={() => onClick()}
				size={size}
			/>
		</div>
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
		<div className="flex flex-col w-[90%] mx-auto my-4 max-w-[500px] bg-white">
			<div className="flex bg-white p-4 rounded-t-lg border justify-between items-center">
				<div className="flex items-center">
					<img
						className="w-10 h-10 rounded-full"
						src={`/profile/${post.profile}.jpg`}
					/>
					<p className="ml-2 font-semibold text-sm">{post.name}</p>
				</div>
				<BiDotsHorizontalRounded size={20} />
			</div>
			<Img doubleClick={() => setLiked(true)} source={post.img} />
			<div className="border rounded-b-lg py-2">
				<div className="w-[90%] mx-auto p-1">
					<div className="flex items-center">
						<Heart
							onClick={() => setLiked(!isLiked)}
							liked={isLiked}
							size={25}
						/>
						<a
							className="ml-2"
							href="https://github.com/NikSchaefer/InstaDog"
						>
							<GoMarkGithub size={25} />
						</a>
						<AiOutlineShareAlt
							size={25}
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
							className="ml-auto"
						/>
					</div>
					<div className="flex items-center">
						{post.attention.map((profile, i) => (
							<img
								style={{
									transform: `translateX(-${7 * i}px)`,
								}}
								className="!w-8 h-8 rounded-full border-2 border-white "
								src={`/profile/${profile}.jpg`}
							/>
						))}
						<p className="text-base my-2">
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
						{post.days > 1
							? `${post.days} days ago`
							: `${post.days} day ago`}
					</p>
				</div>
			</div>
		</div>
	);
}

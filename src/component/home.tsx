/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-default-export */
import axios from "axios";
import { useState, useEffect } from "react";
import { FaGithub, FaShare } from "react-icons/fa";

const possibleTitles: string[] = [
	"Doggo!",
	"Look at this Doggo",
	"They're sooo cute!",
];

type data = {
	title: string;
	img: string;
	isLiked: boolean;
	description: string;
	likes: number;
};

let lastRender = Date.now();

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Main(): JSX.Element {
	const [FeedData, setFeed] = useState<data[]>([]);
	const [shareURL, setShareURL] = useState<string>("");
	const [isActive, setActive] = useState<boolean>(false);

	function ShareUI(props: { url: string }) {
		return (
			<div
				className="share-div"
				onClick={() => {
					setActive(false);
				}}
			>
				<div>
					<p>{props.url}</p>
					<p
						onClick={() => {
							window.prompt(
								"Copy to clipboard: Ctrl+C, Enter",
								props.url
							);
						}}
						className="copy-button"
					>
						Copy
					</p>
				</div>
			</div>
		);
	}
	function Card(props: { src: data; iter: number }) {
		const [isLiked, setLiked] = useState<boolean>(props.src.isLiked);

		function Like() {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const heartsvg: any =
				document.querySelectorAll(".like")[props.iter];
			if (isLiked) {
				heartsvg.style.animation = "UndoLike 0.4s forwards";
			} else {
				heartsvg.style.animation = "Like 0.4s forwards";
			}
			setTimeout(() => {
				setLiked(!isLiked);
			}, 400);
		}
		function Img(props: { source: string }) {
			const fileType = props.source.slice(-3);
			if (fileType === "mp4") {
				return (
					<video
						preload="none"
						onDoubleClick={Like}
						className="dog-image"
						autoPlay
						loop
						muted
					>
						<source src={props.source} type="video/mp4" />
					</video>
				);
			}
			return (
				<img
					loading="lazy"
					onDoubleClick={Like}
					src={props.source}
					className="dog-image"
					alt="loading... maybe"
				/>
			);
		}
		function Heart(props: { value: boolean }) {
			if (props.value) {
				return (
					<svg
						fill="#ed4956"
						stroke="#ed4956"
						className="like"
						onClick={Like}
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
			return (
				<svg
					fill="#ffffff"
					stroke="black"
					className="like"
					onClick={Like}
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
		function Likes(props: { value: boolean; likes: number }) {
			if (props.value) {
				return <p className="likes">{String(props.likes + 1)} Likes</p>;
			}
			return <p className="likes">{String(props.likes)} Likes</p>;
		}
		return (
			<div className="card">
				<Img source={props.src.img} />
				<div className="border">
					<div className="card-bottom">
						<div className="card-bottom-imgs">
							<Heart value={isLiked} />
							<a href="https://github.com/NikSchaefer/InstaDog">
								<FaGithub size={30} />
							</a>
							<FaShare
								size={30}
								onClick={() => {
									setActive(true);
									setShareURL(
										String(
											`https://instadog.vercel.app/?share=${encodeURIComponent(
												props.src.img.replace(
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
						<Likes value={isLiked} likes={props.src.likes} />
						<p>{props.src.description}</p>
					</div>
				</div>
			</div>
		);
	}
	function Render(props: { arr: data[] }): JSX.Element {
		const out: JSX.Element[] = [];
		for (let i = 0; i < props.arr.length; i++) {
			out.push(<Card key={i} src={props.arr[i]} iter={i} />);
		}
		return <>{out}</>;
	}
	// eslint-disable-next-line unicorn/consistent-function-scoping
	function getLikeNum() {
		return Math.floor(Math.random() * 210);
	}
	async function fetchNewPost() {
		const num: number = Math.floor(Math.random() * possibleTitles.length);
		const res = await axios.get("https://random.dog/woof.json");
		const toAppend: data = {
			title: possibleTitles[num],
			img: res.data.url,
			isLiked: false,
			likes: getLikeNum(),
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto",
		};
		setFeed((old) => [...old, toAppend]);
	}
	function ShowSharedPost(): JSX.Element {
		if (typeof window === undefined) {
			return <></>;
		}
		const Params = new URLSearchParams(window.location.search);
		const share = Params.get("share");
		if (share !== null) {
			const data: data = {
				title: "Shared Post",
				likes: 97,
				img: String(`https://random.dog/${decodeURIComponent(share)}`),
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto",
				isLiked: true,
			};
			return (
				<>
					<Card iter={0} src={data} />
					<div style={{ margin: "200px 0" }} />
				</>
			);
		}
		return <></>;
	}
	useEffect(() => {
		for (let i = 0; i < 30; i++) {
			// eslint-disable-next-line no-void
			void fetchNewPost();
		}
		window.addEventListener("scroll", () => {
			if (
				window.innerHeight + window.scrollY + 2000 >=
					document.body.offsetHeight &&
				Date.now() >= lastRender + 10_000
			) {
				for (let i = 0; i < 20; i++) {
					if (FeedData.length > 100) {
						// Delte old posts
					}
					// eslint-disable-next-line no-void
					void fetchNewPost();
				}
				lastRender = Date.now();
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="home">
			<ShowSharedPost />
			<Render arr={FeedData} />
			{isActive ? <ShareUI url={shareURL} /> : <></>}
		</div>
	);
}

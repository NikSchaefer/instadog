import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Card } from "./card";
import InfiniteScroll from "react-infinite-scroller";
import { PostType } from "types";
import { ShareUI, ShowSharedPost } from "./share";

const possibleDescriptions: string[] = [
	"Look at this doggo!",
	"Had a great time with this doggo!",
	"This doggo is so cute!",
	"Love this doggo!",
];

const possibleNames = [
	"Doggo.4000",
	"doge.master",
	"nik.schaefer",
	"dogs.are.awesome",
	"doggo.is.awesome",
	"doggo.is.cute",
];

function getLikeNum() {
	return Math.floor(Math.random() * 100);
}
function getDays() {
	return Math.floor(Math.random() * 10 + 1);
}
function getProfile() {
	return Math.floor(Math.random() * 9 + 1);
}

function getAttention() {
	return [
		Math.floor(Math.random() * 9 + 1),
		Math.floor(Math.random() * 9 + 1),
		Math.floor(Math.random() * 9 + 1),
	];
}

export default function Main(): JSX.Element {
	const [items, setItems] = useState<PostType[]>([]);
	const [shareURL, setShareURL] = useState<string>("");
	const [sharePost, setSharePost] = useState<null | PostType>(null);
	const [fetching, setFetching] = useState(false);

	async function fetchNewPost(): Promise<PostType> {
		const res = await axios.get("https://random.dog/woof.json");

		const name = Math.floor(Math.random() * possibleNames.length);
		const description = Math.floor(
			Math.random() * possibleDescriptions.length
		);
		return {
			name: possibleNames[name],
			img: res.data.url,
			isLiked: false,
			likes: getLikeNum(),
			days: getDays(),
			description: possibleDescriptions[description],
			profile: getProfile(),
			attention: getAttention(),
		};
	}

	const fetchItems = useCallback(async () => {
		if (fetching) return;
		setFetching(true);

		const out = [];
		for (let i = 0; i < 10; i++) {
			out.push(fetchNewPost());
		}

		Promise.all(out).then((data) => {
			setItems((prev) => [...prev, ...data]);
			setFetching(false);
		});
	}, [items, fetching]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const share = params.get("share");
		if (share !== null) {
			setSharePost({
				name: "Shared Post",
				likes: 97,
				img: String(`https://random.dog/${decodeURIComponent(share)}`),
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto",
				isLiked: true,
				days: getDays(),
				profile: getProfile(),
				attention: getAttention(),
			});
		}
	}, []);

	return (
		<div className="home">
			{sharePost && (
				<ShowSharedPost setShareURL={setShareURL} post={sharePost} />
			)}
			<InfiniteScroll
				loadMore={fetchItems}
				hasMore
				loader={<p>loading...</p>}
			>
				{items.map((post, i) => (
					<Card setShareURL={setShareURL} key={i} post={post} />
				))}
			</InfiniteScroll>
			{shareURL && <ShareUI setShareURL={setShareURL} url={shareURL} />}
		</div>
	);
}

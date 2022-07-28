import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Card } from "./card";
import InfiniteScroll from "react-infinite-scroller";
import { PostType } from "types";
import { ShareUI, ShowSharedPost } from "./share";

const possibleTitles: string[] = [
	"Doggo!",
	"Look at this Doggo",
	"They're sooo cute!",
];

export default function Main(): JSX.Element {
	const [items, setItems] = useState<PostType[]>([]);
	const [shareURL, setShareURL] = useState<string>("");
	const [sharePost, setSharePost] = useState<null | PostType>(null);
	const [fetching, setFetching] = useState(false);

	async function fetchNewPost(): Promise<PostType> {
		const res = await axios.get("https://random.dog/woof.json");

		const num = Math.floor(Math.random() * possibleTitles.length);
		return {
			title: possibleTitles[num],
			img: res.data.url,
			isLiked: false,
			likes: getLikeNum(),
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto",
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

	function getLikeNum() {
		return Math.floor(Math.random() * 100);
	}

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const share = params.get("share");
		if (share !== null) {
			setSharePost({
				title: "Shared Post",
				likes: 97,
				img: String(`https://random.dog/${decodeURIComponent(share)}`),
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto",
				isLiked: true,
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

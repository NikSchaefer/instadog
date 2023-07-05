import { useState, useEffect, useCallback } from "react";
import { Card } from "../component/card";
import InfiniteScroll from "react-infinite-scroller";
import { PostType } from "types";
import { ShareUI, ShowSharedPost } from "../component/share";
import { fetchNewPost, getSharePost } from "component/data-gen";
import { Loader2 } from "lucide-react";

export default function Main(): JSX.Element {
	const [items, setItems] = useState<PostType[]>([]);
	const [shareURL, setShareURL] = useState<string>("");
	const [sharePost, setSharePost] = useState<null | PostType>(null);

	const [loading, setLoading] = useState(false);

	const fetchMoreItems = useCallback(async () => {
		if (loading) return;
		setLoading(true);

		const out = [];
		for (let i = 0; i < 10; i++) {
			out.push(fetchNewPost());
		}

		await Promise.all(out).then((data) => {
			setItems((prev) => [...prev, ...data]);
		});

		setLoading(false);
	}, [items, loading]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const share = params.get("share");
		if (!share) return;
		setSharePost(getSharePost(share));
	}, []);

	return (
		<div className="my-2 pt-[4em] flex flex-col justify-center items-center">
			{sharePost && (
				<ShowSharedPost setShareURL={setShareURL} post={sharePost} />
			)}
			{shareURL && <ShareUI setShareURL={setShareURL} url={shareURL} />}
			<InfiniteScroll
				loadMore={fetchMoreItems}
				hasMore
				loader={<Loader2 className="animate-spin py-[5em] text-gray-400" />}
			>
				{items.map((post, i) => (
					<Card setShareURL={setShareURL} key={i} post={post} />
				))}
			</InfiniteScroll>
		</div>
	);
}

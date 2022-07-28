import { PostType } from "types";
import { Card } from "./card";

export function ShareUI(props: { url: string; setShareURL: Function }) {
	return (
		<div className="share-div" onClick={() => props.setShareURL("")}>
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

export function ShowSharedPost({
	post,
	setShareURL,
}: {
	post: PostType;
	setShareURL: Function;
}): JSX.Element {
	return (
		<>
			<Card setShareURL={setShareURL} post={post} />
			<div style={{ margin: "200px 0" }} />
		</>
	);
}

import { PostType } from "types";
import { Card } from "./card";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export function ShareUI({
	url,
	setShareURL,
}: {
	url: string;
	setShareURL: Function;
}) {
	const [copied, setCopied] = useState(false);
	return (
		<>
			<button
				className="fixed bg-black/50 z-40 inset-0 flex items-center justify-center"
				onClick={() => setShareURL("")}
			>
				<div className="bg-white z-50 w-fit p-4 rounded-lg flex">
					<p>{url}</p>
					{copied ? (
						<CheckCircle />
					) : (
						<p
							onClick={() => {
								navigator.clipboard.writeText(url);
								setCopied(true);
							}}
							className="copy-button"
						>
							Copy
						</p>
					)}
				</div>
			</button>
		</>
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

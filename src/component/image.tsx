export default function RenderFile({
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
			onDoubleClick={() => doubleClick()}
			src={source}
			className="w-full min-h-[100px]"
			alt="loading... maybe"
		/>
	);
}

import Foot from "@components/foot";
import Head from "@components/head";
import Main from "@components/Main";

// eslint-disable-next-line import/no-default-export
export default function Home(): JSX.Element {
	return (
		<>
			<Head />
			<Main />
			<Foot />
		</>
	);
}

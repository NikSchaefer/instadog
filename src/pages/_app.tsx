import "@styles/global.css";
import Footer from "component/footer";
import Header from "component/header";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<DefaultSeo
				title="InstaDog"
				description="A dog-themed Instagram clone powered by an API, showcasing adorable images and utilizing mock data"
				titleTemplate="%s • Nik Schaefer"
				openGraph={{
					type: "website",
					locale: "en",
					url: "insta.nikschaefer.com",
					site_name: "InstaDog",
				}}
				twitter={{
					handle: "@Nik_Schaefer",
					site: "insta.nikschaefer.com",
					cardType: "summary_large_image",
				}}
			/>

			<Header />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

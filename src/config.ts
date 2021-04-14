// google analytics measurement id
const GA_TRACKING_ID = "U-XXXXXX";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_TEST = process.env.NODE_ENV === "test";
const IS_BROWSER = typeof window !== "undefined";
export { GA_TRACKING_ID, IS_PRODUCTION, IS_TEST, IS_BROWSER };
type MetaType = {
    title: string,
    lang: string,
    description: string,
    image: string,
    url:string
}
const META: MetaType = {
	title: "Dogegram | Instagram for dogs",
	lang: "en-us",
	description: "Dogegram | Instagram for dogs",
	image: "/logo.png",
	url: "https://dogegram.vercel.app",
};
export { META }
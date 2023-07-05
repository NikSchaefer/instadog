import axios from "axios";
import { PostType } from "types";

const possibleDescriptions: string[] = [
	"Unleashing joy, one wag at a time. 🐾",
	"Pawsitively adorable! ❤️🐶",
	"Life is better with a furry companion by your side. 🌟🐕",
	"Can't resist those puppy eyes! 😍👀",
	"Love is a four-legged word. 💕🐾",
	"Chasing dreams and tennis balls. 🎾✨🐶",
	"Just a dog and their human, conquering the world together. 🌍❤️🐾",
	"Embrace the dog days of summer! ☀️🐶",
	"Living life in full-fetch mode! 🐾😄",
	"Happiness is a wet nose and a wagging tail. 🐶💦",
	"Adventure awaits, sniff it out! 🗺️🐕",
	"Home is where the dog is. 🏡❤️🐾",
	"Cuteness overload alert! 🚨🐶💖",
	"Barking up all the right trees. 🌳🐾",
	"Dogs make the best cuddle buddies. 🥰🐶💤",
	"Unconditional love in its purest form. ❤️🐾",
	"Exploring the world one paw step at a time. 🌍🐕",
	"Playtime is the best time! 🐾🎾",
	"The best therapist has fur and four paws. 🐶💕",
	"Capturing memories with my paw-some companion. 📸🐾",
];

const possibleNames = [
	"@NikSchaefer",
	"@PawsomeTails",
	"@DoggoAdventures",
	"@FurBabiesUnleashed",
	"@PuppyLoveParade",
	"@AdorablePawprints",
	"@CanineCompanionship",
	"@WaggingTailsGallery",
	"@PlayfulPoochPosse",
	"@DoggyDelights",
	"@BarkingBuddiesClub",
	"@PawsitiveVibesOnly",
	"@WoofWonderland",
	"@FurryFriendsFiesta",
	"@TailWaggersUnited",
	"@PamperedPupsPalace",
	"@DogLifeChronicles",
	"@PupCoutureStyle",
	"@SnugglePawsSquad",
	"@FetchFrenzyFun",
	"@DapperDogSociety",
];

const possibleLocations = [
	"Santorini, Greece",
	"Kyoto, Japan",
	"Bora Bora, French Polynesia",
	"Marrakech, Morocco",
	"Banff National Park, Canada",
	"Bali, Indonesia",
	"Cape Town, South Africa",
	"Iceland",
	"Machu Picchu, Peru",
	"Santorini, Greece",
	"Yosemite National Park, USA",
	"Amalfi Coast, Italy",
	"Petra, Jordan",
	"Great Barrier Reef, Australia",
	"Dubrovnik, Croatia",
	"The Maldives",
	"Serengeti National Park, Tanzania",
	"The Azores, Portugal",
	"The Great Wall of China",
	"The Swiss Alps, Switzerland",
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

function getRandomLocation(): string {
	return possibleLocations[
		Math.floor(Math.random() * possibleLocations.length)
	];
}

async function fetchNewPost(): Promise<PostType> {
	const res = await axios.get("https://random.dog/woof.json");

	const name = Math.floor(Math.random() * possibleNames.length);
	const description = Math.floor(Math.random() * possibleDescriptions.length);
	return {
		name: possibleNames[name],
		img: res.data.url,
		isLiked: false,
		likes: getLikeNum(),
		days: getDays(),
		description: possibleDescriptions[description],
		profile: getProfile(),
		attention: getAttention(),
		location: getRandomLocation(),
	};
}

function getSharePost(uri: string): PostType {
	return {
		name: "Shared Post",
		likes: 97,
		img: String(`https://random.dog/${decodeURIComponent(uri)}`),
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto",
		isLiked: true,
		days: getDays(),
		profile: getProfile(),
		attention: getAttention(),
		location: getRandomLocation(),
	};
}

export { fetchNewPost, getSharePost };

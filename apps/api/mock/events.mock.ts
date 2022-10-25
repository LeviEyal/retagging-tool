import type { Event } from "../../../packages/types";

const sample: <T>(arr: T[]) => T = (arr) =>
	arr[Math.floor(Math.random() * arr.length)];

const feedbacks = [
	"firearms",
	"explosives",
	"drugs",
	"sharps",
	"other",
	"clear",
];

const numberOfMockImages = 9;
const numberOfMockSideImages = 4;
const randomNumber = (max: number) => Math.floor(Math.random() * max) + 1;

export const events: Event[] = [...Array(30)].map((_, i) => ({
	id: i.toString(),
	site: "gatwick",
	lane: "Lane 1",
	date: new Date().toISOString(),
	topViewImageUrl: 	`/src/assets/bags/${randomNumber(numberOfMockImages)}.png`,
	sideViewImageUrl: `/src/assets/bags/side${randomNumber(numberOfMockSideImages)}.jpg`,
	detections: [
		{
			id: Math.random().toString(),
			imageUrl: `/src/assets/bags/side${randomNumber(numberOfMockSideImages)}.jpg`,
			inspectFeedback: sample(feedbacks),
			reviewerFeedback: sample(feedbacks),
			seetrueFeedback: "",
		},
		{
			id: Math.random().toString(),
			imageUrl: `/src/assets/bags/side${randomNumber(numberOfMockSideImages)}.jpg`,
			inspectFeedback: sample(feedbacks),
			reviewerFeedback: sample(feedbacks),
			seetrueFeedback: "",
		},
	],
}));

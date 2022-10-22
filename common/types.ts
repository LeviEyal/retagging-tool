export interface TaggingSession {
	site: string;
	lanes: string[];
	fromDate: Date | string;
	toDate: Date | string;
	detectionOnly: boolean;
	filterRewiewedImages: boolean;
}

export interface Detection {
	imageUrl: string;
	inspectFeedback: string;
	reviewerFeedback: string;
	seetrueFeedback: string;
}

export interface Event {
	id: string;
	site: string;
	lane: string;
	date: Date | string;
	topViewImageUrl: string;
	sideViewImageUrl: string;
	detections: Detection[];
}

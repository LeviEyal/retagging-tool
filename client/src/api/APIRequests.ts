import type { Event } from "../../../shared/types";

const SERVER_URL = "http://localhost:7005/api";

export const getEvents = async (): Promise<Event[]> => {
	const response = await fetch(`${SERVER_URL}/events?site=gatwick&fromDate=2022-04-24 00:00:00&toDate=2022-05-09 20:20:18`);
	return response.json() as Promise<Event[]>;
};

export const getEvent = async (id: string): Promise<Event> => {
	const response = await fetch(`${SERVER_URL}/events/${id}`);
	console.log(response);
	
	return response.json() as Promise<Event>;
}
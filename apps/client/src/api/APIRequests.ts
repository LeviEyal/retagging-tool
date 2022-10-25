import type { Event } from "../../../../packages/types";

const SERVER_URL = "http://localhost:7001/api";

export const getEvents = async (): Promise<Event[]> => {
	const response = await fetch(`${SERVER_URL}/events`);
	return response.json() as Promise<Event[]>;
};

export const getEvent = async (id: string): Promise<Event> => {
	const response = await fetch(`${SERVER_URL}/events/${id}`);
	console.log(response);
	
	return response.json() as Promise<Event>;
}
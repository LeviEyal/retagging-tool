import type { Event } from "types";

export const getEvents = async (): Promise<Event[]> => {
	const response = await fetch("api/events");
	return response.json() as Promise<Event[]>;
};

export const getEvent = async (id: string): Promise<Event> => {
	const response = await fetch(`api/events/${id}`);
	return response.json() as Promise<Event>;
}
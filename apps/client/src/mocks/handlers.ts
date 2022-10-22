import { rest } from "msw";
import { events } from "./data/events.mock";

export const handlers = [
	rest.get("api/events", (req, res, ctx) => res(ctx.json(events))),
	rest.get("api/events/:id", (req, res, ctx) => {
		const event = events.find((e) => e.id === req.params.id);
		return res(ctx.json(event));
	})
];

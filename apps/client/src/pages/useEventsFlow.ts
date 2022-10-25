import { useEffect, useState } from "react";
import { getEvent, getEvents } from "api/APIRequests";
import { useQuery } from "@tanstack/react-query";
import {
	Link,
	useNavigate,
	useParams,
	useSearchParams
} from "react-router-dom";
import { useKeyPress } from "hooks/useKeyPressed";

export const useEventsFlow = () => {
	const navigate = useNavigate();
	const [isViewsToggled, setIsViewsToggled] = useState(false);
	const [eventIdx, setEventIdx] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const rightKeyPress = useKeyPress("ArrowRight");
	const leftKeyPress = useKeyPress("ArrowLeft");

	const {
		data: events,
		isLoading,
		isError,
		error
	} = useQuery(["events"], getEvents);

	const eventsCount = events?.length || 0;

	const nextEvent = () => setEventIdx(prev => (prev + 1) % eventsCount);
	const prevEvent = () =>
		setEventIdx(
			prev => (((prev - 1) % eventsCount) + eventsCount) % eventsCount
		);

	useEffect(() => {
		if (rightKeyPress) nextEvent();
		if (leftKeyPress) prevEvent();
	}, [rightKeyPress, leftKeyPress]);

	const data = events?.[eventIdx];

	const topView = isViewsToggled
		? data?.sideViewImageUrl
		: data?.topViewImageUrl;
	const sideView = isViewsToggled
		? data?.topViewImageUrl
		: data?.sideViewImageUrl;

	const handleViewsToggle = () => setIsViewsToggled(!isViewsToggled);
	const handleExit = () => navigate("/");

	return {
		eventsCount,
		eventIdx,
		isLoading,
		isError,
		error,
		data,
		topView,
		sideView,
		handleViewsToggle,
		handleExit,
		nextEvent,
		prevEvent,
		isViewsToggled
	};
};

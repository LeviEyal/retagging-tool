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


export const useEventFlow = () => {
	const [isViewsToggled, setIsViewsToggled] = useState(false);
	const [eventIdx, setEventIdx] = useState(0);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const rightKeyPress = useKeyPress("ArrowRight");
	const leftKeyPress = useKeyPress("ArrowLeft");

	const nextEvent = () =>
		eventIdx < events.length - 1 && setEventIdx(prev => prev + 1);
	const prevEvent = () => eventIdx > 0 && setEventIdx(prev => prev - 1);

	useEffect(() => {
		if (rightKeyPress) {
			nextEvent();
		}
		if (leftKeyPress) {
			prevEvent();
		}
	}, [rightKeyPress, leftKeyPress]);

	const {
		data: events,
		isLoading,
		isError,
		error
	} = useQuery(["events"], getEvents);

	const data = events?.[eventIdx];

	const topView = isViewsToggled ? data.sideViewImageUrl : data.topViewImageUrl;
	const sideView = isViewsToggled
		? data.topViewImageUrl
		: data.sideViewImageUrl;

	const handleViewsToggle = () => setIsViewsToggled(!isViewsToggled);

	const handleExit = () => {
		navigate("/");
  };
  
  const hasNext = eventIdx >= events.length - 1;
  const hasPrev = eventIdx < 1

  return {
    events,
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
    hasNext,
    hasPrev,
    isViewsToggled,
	};
};

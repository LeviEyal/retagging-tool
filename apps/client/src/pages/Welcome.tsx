import type { ReactElement } from "react";
import Head from "components/Head";
import LoadingOrError from "components/LoadingOrError";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "api/APIRequests";

export default function WelcomePage(): ReactElement {
	const { isLoading, isError, error, data } = useQuery(["fruits"], getEvents);
	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />;
	}

	return (
		<>
			<Head title='Retagging Tool'/>
			<div className='m-2 grid min-h-screen grid-cols-[minmax(0,384px)] place-content-center gap-2 md:m-0 md:grid-cols-[repeat(2,minmax(0,384px))] xl:grid-cols-[repeat(3,384px)]'>
				{data.map((event) => (
					<div key={event.id} className='flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md'>
						<img src={event.topViewImageUrl} alt={event.id} className='w-32 h-32 rounded-full' />
						<img src={event.sideViewImageUrl} alt={event.id} className='w-32 h-32 rounded-full' />
						<p>{event.id}</p>
						<p>{event.lane}</p>
						<p>{event.site}</p>
						<p>{new Date(event.date).toISOString()}</p>

					</div>
				))}
			</div>
		</>
	);
}

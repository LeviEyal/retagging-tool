import type { ReactElement } from "react";
import { getEvent } from "api/APIRequests";
import { useQuery } from "@tanstack/react-query";
import LoadingOrError from "components/LoadingOrError";
import { Link, useParams } from "react-router-dom";

export default function EventView(): ReactElement {
	const { id } = useParams();
	const { isLoading, isError, error, data } = useQuery(
		["event", id],
		getEvent.bind(null, id as string)
	);
	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />;
	}

	return (
		<div className='grid h-screen grid-cols-[3fr_2fr] grid-rows-[70px_1fr_1fr] text-xl'>
			<div className='col-span-1 row-span-1 flex justify-between  p-5'>
				<p>
					<strong>Image ID</strong> {data.id}
				</p>
				<p>25 out of 473</p>
			</div>
			<div className='col-span-1 row-span-1 flex justify-between bg-red-300 p-5'>
				<p>
					<strong>Site:</strong> {data.site}
				</p>
				<p>
					<strong>Lane:</strong> {data.lane}
				</p>
				<p>
					<strong>Date:</strong> {data.date as string}
				</p>
			</div>
			<div className='col-span-1 row-span-2 bg-purple-300 p-5'>
				<div className='flex justify-between'>
					<p className='text-2xl font-bold'>Top View</p>
					<div>
						<button className='mx-2 rounded border p-2 px-3' type='button'>
							Toggle Views
						</button>
						<button className='mx-2 rounded border p-2 px-3' type='button'>
							Show / Hide Marks
						</button>
						<button className='mx-2 rounded border p-2 px-3' type='button'>
							Download Event
						</button>
					</div>
				</div>
				<div>
					<img src={data.topViewImageUrl} alt='' className='' />
				</div>
			</div>
			<div className='col-span-1 row-span-1 bg-green-300 p-5'>detections</div>
			<div className='col-span-1 row-span-1 overflow-y-auto bg-yellow-300 p-5'>
				<p className='text-2xl font-bold'>Side View</p>
				<img src={data.sideViewImageUrl} alt='' />
			</div>
		</div>
	);
}

import LoadingOrError from "components/LoadingOrError";
import rightArrow from "assets/right-arrow.svg";
import seeTrueLabel from "assets/seeTrueLogo.svg";
import { RiCameraSwitchLine } from "react-icons/ri";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsToggleOff } from "react-icons/bs";
import PrismaZoom from "react-prismazoom";
import { useEventsFlow } from "./useEventsFlow";
import { ReactElement } from "react";
import { downloadJsonFile } from "utils/downloadFile";

export default function EventView(): ReactElement {
	const {
		events,
		eventIdx,
		isLoading,
		isError,
		error,
		data,
		handleExit,
		handleViewsToggle,
		nextEvent,
		prevEvent,
		sideView,
		topView,
		hasNext,
		hasPrev,
		isViewsToggled
	} = useEventsFlow();

	if (isLoading || isError || !data) {
		return <LoadingOrError error={error as Error} />;
	}

	return (
		<div className='grid h-screen grid-cols-[3fr_2fr] grid-rows-[70px_500px_1fr] gap-2 bg-gradient-to-b from-slate-300 to-slate-300 p-5 text-xl'>
			{/* TOP LEFT BAR */}
			<section className='relative col-span-1 row-span-1 flex justify-between overflow-hidden rounded bg-gradient-to-r from-[#0e3341] via-gray-800 to-gray-800 p-5 text-2xl text-white shadow'>
				<div className='absolute -top-20 left-20 flex h-56 w-24 rotate-45 justify-center bg-white ring-2 ring-offset-8' />
				<img
					className='absolute left-24 top-2 z-50 h-14 '
					src={seeTrueLabel}
					alt=''
				/>
				<p className='ml-56'>
					<strong>Image ID</strong> {data.id}
				</p>
				<p>
					{eventIdx + 1} out of {events?.length}
				</p>
			</section>

			{/* TOP RIGHT BAR */}
			<section className='col-span-1 row-span-1 flex justify-between rounded-xl bg-cyan-900 p-5 text-white shadow'>
				<p>
					<strong>Site:</strong> {data.site}
				</p>
				<p>
					<strong>Lane:</strong> {data.lane}
				</p>
				<p>
					<strong>Date:</strong> {new Date(data.date).toLocaleDateString()}
				</p>
				<img
					className='hover:cursor-pointer'
					onClick={handleExit}
					src={rightArrow}
					alt=''
				/>
			</section>

			{/* TOP VIEW */}
			<section className='relative col-span-1  row-span-2 h-full overflow-hidden rounded border border-gray-300 bg-white pb-16 shadow'>
				<div className='m-2 flex items-center justify-between border-b border-gray-200 pb-4'>
					<p className='mx-2 text-2xl font-bold'>
						{!isViewsToggled ? "Top View" : "Side View"}
					</p>
					<div>
						<button
							className='mx-2 inline-flex items-center justify-center gap-5 rounded border border-cyan-600 p-2 px-3 text-cyan-800 hover:bg-cyan-600 hover:text-white'
							type='button'
							onClick={handleViewsToggle}
						>
							<RiCameraSwitchLine />
							Toggle Views
						</button>
						<button
							className='mx-2 inline-flex items-center justify-center gap-5 rounded border border-cyan-600 p-2 px-3 text-cyan-800 hover:bg-cyan-600 hover:text-white'
							type='button'
						>
							<BsToggleOff />
							Show / Hide Marks
						</button>
						<button
							className='mx-2 inline-flex items-center justify-center gap-5 rounded border border-cyan-600 p-2 px-3 text-cyan-800 hover:bg-cyan-600 hover:text-white'
							type='button'
							onClick={() => downloadJsonFile(data, `event-${data.id}`)}
						>
							<AiOutlineCloudDownload />
							Download Event
						</button>
					</div>
				</div>
				<div className='flex h-full items-center justify-center'>
					<PrismaZoom>
						<img src={topView} />
					</PrismaZoom>
				</div>
				<button disabled={hasNext}>
					<img
						className='absolute right-5 top-1/2 scale-150'
						src={rightArrow}
						onClick={nextEvent}
					/>
				</button>
				<button disabled={hasPrev}>
					<img
						className='absolute left-5 top-1/2 rotate-180 scale-150'
						src={rightArrow}
						onClick={prevEvent}
					/>
				</button>
			</section>

			{/* MASKS TABLE */}
			<section className='col-span-1 row-span-1 h-full rounded rounded-t-3xl border border-gray-300 bg-white text-sm shadow'>
				<table className='h-full w-full rounded-t-3xl text-left'>
					<thead className='flex rounded-t-3xl bg-stone-900 text-white'>
						<tr className='flex w-full items-center'>
							<th className='w-1/4 p-4'>Detection Section</th>
							<th className='w-1/4 p-4'>Engine Outcome</th>
							<th className='w-1/4 p-4'>Reviewer Feedback</th>
							<th className='w-1/4 p-4'>SeeTrue Feedback</th>
							<th>
								<button
									className='my-1 mx-2 inline-flex h-10 items-center justify-center gap-5 rounded-xl border border-cyan-400 px-3 text-cyan-500 hover:bg-cyan-600 hover:text-white'
									type='button'
								>
									Apply
								</button>
							</th>
						</tr>
					</thead>
					<tbody className='bg-grey-light flex h-[430px] w-full flex-col overflow-y-scroll text-lg'>
						{data.detections.map(detection => (
							<tr
								className='flex w-full items-center border bg-slate-100'
								key={detection.id}
							>
								<td className='w-1/4 p-4'>
									<img className='h-20' src={detection.imageUrl} alt='' />
								</td>
								<td className='w-1/4 p-4'>{detection.inspectFeedback}</td>
								<td className='w-1/4 p-4'>{detection.reviewerFeedback}</td>
								<td className='w-1/4 p-4'>{detection.seetrueFeedback}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>

			{/* SIDE VIEW */}
			<section className='col-span-1 row-span-1 overflow-hidden rounded border border-gray-300 bg-white pb-40 shadow'>
				<p className='mx-2 border-b border-gray-200 p-2  text-2xl font-bold'>
					{!isViewsToggled ? "Side View" : "Top View"}
				</p>
				<PrismaZoom>
					<img src={sideView} />
				</PrismaZoom>
			</section>
		</div>
	);
}

import { ReactElement, useState } from "react";
import { useRef } from "react";
import LoadingOrError from "components/LoadingOrError";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "api/APIRequests";
import { useNavigate } from "react-router-dom";
import seeTrueLabel from "assets/seeTrueLogo.svg";

const SITES = ["Camry", "Hermes", "Ashdod", "MX"];
const LINES = [
	"Line 1",
	"Line 2",
	"Line 3",
	"Line 4",
	"Line 5",
	"Line 6",
	"Line 7",
	"Line 8",
	"Line 9"
];

export default function WelcomePage(): ReactElement {
	const fromDateRef = useRef<HTMLInputElement>(null);
	const toDateRef = useRef<HTMLInputElement>(null);
	const siteRef = useRef<HTMLFieldSetElement>(null);
	const lineRef = useRef<HTMLInputElement>(null);
	const filterReviewedRef = useRef<HTMLInputElement>(null);
	const detectionOnlyRef = useRef<HTMLInputElement>(null);
	const [site, setSite] = useState("Hermes");
	const [lines, setLines] = useState<string>("");

	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const { nodeName, value } = e.target;
		if (nodeName === "INPUT") {
			setSite(value);
		}
	}

	const navigate = useNavigate();

	const handleReview = () => {
		const fromDate = fromDateRef.current?.value;
		const toDate = toDateRef.current?.value;
		const line = lineRef.current?.value;
		const filterReviewed = filterReviewedRef.current?.checked;
		const detectionOnly = detectionOnlyRef.current?.checked;
		console.log({
			fromDate,
			toDate,
			line,
			filterReviewed,
			detectionOnly
		});

		navigate(
			`/events?fromDate=${fromDate}&toDate=${toDate}&site=${site}&line=${lines}&filterReviewed=${filterReviewed}&detectionOnly=${detectionOnly}`
		);
	};

	return (
		<div className='flex h-screen flex-col items-center justify-center bg-opacity-75 bg-[url(https://www.seetrue.ai/wp-content/uploads/2019/03/NewsImage.jpg)] bg-cover text-xl'>
			<div className='mb-10 rounded-xl bg-white/30 px-20 text-4xl'>
				<img className='mr-5 inline scale-50' src={seeTrueLabel} alt='' />
				Welcome to the SeeTrue DB Review Tool
			</div>
			<div className='grid grid-cols-[1fr_2fr_2fr] grid-rows-[1fr_5fr_3fr] gap-10 rounded-xl bg-white/90 p-10 shadow-xl'>
				<div className='text-2xl font-bold'>Date Range</div>
				<div>
					<input
						className='rounded-xl border-cyan-600 hover:bg-cyan-50 hover:cursor-pointer'
						type='date'
						name='fromDate'
						id='fromDate'
						ref={fromDateRef}
					/>
					<h1 className='mx-4 inline'>to</h1>
					<input
						className='rounded-xl border-cyan-600 hover:bg-cyan-50 hover:cursor-pointer'
						type='date'
						name='toDate'
						id='toDate'
						ref={toDateRef}
					/>
				</div>
				<div>
					<button
						className='rounded border bg-cyan-600 p-2 px-3 text-white hover:bg-cyan-700 hover:shadow-xl'
						onClick={handleReview}
					>
						Review Images
					</button>
					<button className='ml-3 rounded border bg-cyan-600 p-2 px-3 text-white hover:bg-cyan-700 hover:shadow-xl'>
						Download Images
					</button>
				</div>
				<div className='text-2xl font-bold'>Site</div>
				<div
					className='h-56 overflow-y-scroll rounded border-cyan-600 bg-slate-50 p-2 ring-1 ring-cyan-600 ring-offset-4'
					onChange={handleChange}
				>
					{SITES.map((siteName, idx) => (
						<div key={siteName} className='hover:bg-gray-200'>
							<input
								type='radio'
								id={siteName}
								name='sites'
								value={siteName}
								checked={site === siteName}
							/>
							<label className='ml-3' htmlFor={siteName}>
								{siteName}
							</label>
						</div>
					))}
				</div>
				<div>
					<div className='hover:bg-gray-200'>
						<input
							type='checkbox'
							id='filterReviewed'
							ref={filterReviewedRef}
						/>
						<label className='ml-3' htmlFor='filterReviewed'>
							Filter Reviewed Images
						</label>
					</div>
					<div className='hover:bg-gray-200'>
						<input type='checkbox' id='detectionOnly' ref={detectionOnlyRef} />
						<label className='ml-3' htmlFor='detectionOnly'>
							Detection Only
						</label>
					</div>
				</div>
				<div className='text-2xl font-bold'>Lanes</div>
				<div className='h-32 overflow-y-scroll rounded border-cyan-600 bg-zinc-50 p-2 ring-1 ring-cyan-600 ring-offset-4'>
					{LINES.map(line => (
						<div key={line} className='hover:bg-gray-200'>
							<input
								type='checkbox'
								id={line}
								name='drone'
								value={line}
								ref={lineRef}
								onChange={(e) => {
									setLines(prev => prev.concat(e.target.value, ','));
								}}
							/>
							<label className='ml-3' htmlFor={line}>
								{line}
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

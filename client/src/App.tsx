import LoadingOrError from "components/LoadingOrError";
import type { ReactElement } from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Welcome = lazy(async () => import("pages/Welcome"));
const EventView = lazy(async () => import("pages/EventView"));

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/' element={<Welcome />} />
					<Route path='/events' element={<EventView />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

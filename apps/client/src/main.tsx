import App from "App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import { worker } from "mocks/browser";

registerSW();

const prepare = async (): Promise<void> => {
  if (import.meta.env.DEV) {
    worker.start();
  }
};


const MAX_RETRIES = 1;
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Number.POSITIVE_INFINITY,
			retry: MAX_RETRIES
		}
	}
});


prepare().then(() => {
	const container = document.querySelector("#root");
	if (container) {
		const root = createRoot(container);
		root.render(
			<StrictMode>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</StrictMode>
		);
	}

}).catch((error) => {
	console.error(error);
});
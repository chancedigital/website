import * as React from "react";

export function useInterval(callback: () => any, delay: number) {
	const callbackRef = React.useRef<any>();
	React.useEffect(function saveCallback() {
		callbackRef.current = callback;
	});

	React.useEffect(
		function setupInterval() {
			function tick() {
				callbackRef.current();
			}
			if (delay != null) {
				let id = setInterval(tick, delay);
				return () => void clearInterval(id);
			}
		},
		[delay]
	);
}

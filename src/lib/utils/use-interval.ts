import * as React from "react";

export function useInterval(callback: () => any, delay: number) {
	const callbackRef = React.useRef<any>();
	React.useEffect(() => {
		callbackRef.current = callback;
	});

	React.useEffect((): void | (() => void) => {
		function tick() {
			callbackRef.current();
		}
		if (delay != null) {
			let id = setInterval(tick, delay);
			return () => void clearInterval(id);
		}
	}, [delay]);
}

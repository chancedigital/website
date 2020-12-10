import * as React from "react";

export function useAnimationEndListener(
	elementRef: React.RefObject<HTMLElement>,
	callback: (ev: AnimationEvent, el: HTMLElement) => any
) {
	const callbackRef = React.useRef(callback);
	React.useEffect(() => {
		callbackRef.current = callback;
	});

	React.useEffect(() => {
		const elem = elementRef.current;
		function handleAnimationEnd(event: AnimationEvent) {
			callbackRef.current(event, elem);
		}
		elem?.addEventListener("animationend", handleAnimationEnd);
		return function removeAnimationEndListener() {
			elem?.removeEventListener("animationend", handleAnimationEnd);
		};
	}, [elementRef]);
}

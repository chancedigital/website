import * as React from "react";

export function useAnimationEndListener(
	elementRef: React.RefObject<HTMLElement>,
	callback: (ev: AnimationEvent, el: HTMLElement) => any
) {
	const callbackRef = React.useRef(callback);
	React.useEffect(function saveCallback() {
		callbackRef.current = callback;
	});

	React.useEffect(
		function setupAnimationListener() {
			const elem = elementRef.current;
			function handleAnimationEnd(event: AnimationEvent) {
				callbackRef.current(event, elem);
			}
			elem?.addEventListener("animationend", handleAnimationEnd);
			return function removeAnimationEndListener() {
				elem?.removeEventListener("animationend", handleAnimationEnd);
			};
		},
		[elementRef]
	);
}

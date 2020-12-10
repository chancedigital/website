import ResizeObserver from "resize-observer-polyfill";
import * as React from "react";
import { useIsomorphicLayoutEffect as useLayoutEffect } from "@chance/hooks";
import { DOMRectReadOnly } from "$lib/types";

export function useMeasure(ref: React.RefObject<HTMLElement | null>) {
	const [bounds, setContentRect] = React.useState<DOMRectReadOnly>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});

	useLayoutEffect((): any => {
		let animationFrameId: any = null;
		const measure: ResizeObserverCallback = ([entry]) => {
			animationFrameId = window.requestAnimationFrame(() => {
				setContentRect(entry.contentRect);
			});
		};

		if (ref.current) {
			const ro = new ResizeObserver(measure);
			ro.observe(ref.current);

			return () => {
				window.cancelAnimationFrame(animationFrameId);
				ro.disconnect();
			};
		}
	}, [ref]);

	return bounds;
}

import * as React from "react";
import { useIsomorphicLayoutEffect, createUseMatchMedia } from "@chance/hooks";
import { breakpoints, breakpointKeys } from "$styles/breakpoints";

export function createUseBreakpoint(effect: typeof React.useEffect) {
	return function useBreakpointHook(
		bpQuery: keyof typeof breakpoints | number,
		opts: { dir?: "up" | "down"; defaultState?: boolean } = {}
	) {
		const { dir = "up", defaultState = false } = opts;
		let bpVal: number;
		if (typeof bpQuery === "string") {
			if (!Object.hasOwnProperty.call(breakpoints, bpQuery)) {
				throw Error("Breakpoint not found");
			}
			if (dir === "down") {
				let bpIndex = Math.min(
					breakpointKeys.indexOf(bpQuery) + 1,
					breakpointKeys.length - 1
				);
				bpQuery = breakpointKeys[bpIndex];
			}
			bpVal = breakpoints[bpQuery];
		} else {
			bpVal = bpQuery;
		}

		if (dir === "down") {
			--bpVal;
		}

		return createUseMatchMedia(effect)(
			{ [dir === "down" ? "maxWidth" : "minWidth"]: bpVal },
			defaultState
		);
	};
}

export const useBreakpoint = createUseBreakpoint(React.useEffect);
export const useBreakpointLayoutEffect = createUseBreakpoint(
	useIsomorphicLayoutEffect
);

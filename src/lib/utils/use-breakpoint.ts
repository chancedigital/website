import * as React from "react";
import { getBreakpointQueryObject } from "$lib/utils/get-breakpoint-query-object";
import { useIsomorphicLayoutEffect, createUseMatchMedia } from "@chance/hooks";

export function createUseBreakpoint(effect: typeof React.useEffect) {
	return function useBreakpointHook(
		bpQuery: string | number,
		defaultState: boolean = false,
		toRem: boolean = true
	) {
		const queryObject = getBreakpointQueryObject(bpQuery, toRem);
		return createUseMatchMedia(effect)(queryObject, defaultState);
	};
}

export const useBreakpoint = createUseBreakpoint(React.useEffect);
export const useBreakpointLayoutEffect = createUseBreakpoint(
	useIsomorphicLayoutEffect
);

import { ScrollPosition } from "$lib/types";
import { canUseDOM } from "$lib/can-use-dom";

export function getScrollPosition(): ScrollPosition {
	return canUseDOM()
		? { x: window.pageXOffset, y: window.pageYOffset }
		: { x: 0, y: 0 };
}

import { ScrollPosition } from "$lib/types";
import { canUseDOM } from "$lib/utils";

export function getScrollPosition(): ScrollPosition {
	return canUseDOM()
		? { x: window.pageXOffset, y: window.pageYOffset }
		: { x: 0, y: 0 };
}

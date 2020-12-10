export interface PageComponent<P> extends React.FC<P> {
	getLayout?(page: React.ReactElement, pageProps: P): React.ReactElement;
}

export interface ScrollPosition {
	x: number;
	y: number;
}

export interface DOMRectReadOnly {
	readonly x: number;
	readonly y: number;
	readonly width: number;
	readonly height: number;
	readonly top: number;
	readonly right: number;
	readonly bottom: number;
	readonly left: number;
}

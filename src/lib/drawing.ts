import { inViewport } from "$lib/in-viewport";

const hide = (el: HTMLElement | SVGSVGElement) => void (el.style.opacity = "0");
const show = (el: HTMLElement | SVGSVGElement) => void (el.style.opacity = "1");

export class Drawing {
	el: SVGSVGElement;
	image: HTMLElement | null;
	currentFrame: number;
	totalFrames: number;
	path: SVGPathElement[];
	length: number[];
	handle: number;
	rendered?: boolean;

	constructor(el: SVGSVGElement) {
		this.el = el;
		this.image = this.el.previousSibling as HTMLElement;
		this.currentFrame = 0;
		this.totalFrames = 160;
		this.path = [];
		this.length = [];
		this.handle = 0;
		this.init();
	}

	init() {
		this.el.querySelectorAll("path").forEach((path, i) => {
			this.path[i] = path;
			const length = this.path[i].getTotalLength();
			this.length[i] = length;
			this.path[i].style.strokeDasharray = `${length} ${length}`;
			this.path[i].style.strokeDashoffset = length as any;
		});
	}

	render() {
		if (this.rendered) return;
		this.rendered = true;
		this.draw();
	}

	draw() {
		const progress = this.currentFrame / this.totalFrames;
		if (1 < progress) {
			window.cancelAnimationFrame(this.handle);
			this.showImage();
		} else {
			this.currentFrame++;
			for (let j = 0, len = this.path.length; j < len; j++) {
				this.path[j].style.strokeDashoffset = Math.floor(
					this.length[j] * (1 - progress)
				) as any;
			}
			this.handle = window.requestAnimationFrame(() => {
				this.draw();
			});
		}
	}

	showImage() {
		if (this.image) {
			show(this.image);
			hide(this.el);
		}
	}
}

export function draw(svg: SVGElement | NodeListOf<SVGElement>) {
	let didScroll = false;
	let resizeTimeout: any;
	const svgs = svg instanceof NodeList ? Array.from(svg) : [svg];
	const drawings = svgs.map((el) => new Drawing(el as any));

	const scrollPage = () => {
		svgs.forEach((el, i) => {
			if (inViewport(el.parentNode as HTMLElement, 0.5)) {
				drawings[i].render();
			}
		});
		didScroll = false;
	};
	const handleScroll = () => {
		if (!didScroll) {
			didScroll = true;
			setTimeout(() => {
				scrollPage();
			}, 60);
		}
	};
	const handleResize = () => {
		function delayed() {
			scrollPage();
			resizeTimeout = null;
		}
		if (resizeTimeout) {
			clearTimeout(resizeTimeout);
		}
		resizeTimeout = setTimeout(delayed, 200);
	};

	// Handle the svgs already shown.
	svgs.forEach((el, i) => {
		setTimeout(
			((elem) => () => {
				if (inViewport(elem.parentNode as HTMLElement)) {
					drawings[i].render();
				}
			})(el),
			250
		);
	});

	window.addEventListener("scroll", handleScroll, false);
	window.addEventListener("resize", handleResize, false);

	// Return a cleanup function to remove listeners
	return function cleanup() {
		window.removeEventListener("scroll", handleScroll);
		window.removeEventListener("resize", handleResize);
	};
}

import * as React from "react";
import cx from "clsx";
import { useId } from "@reach/auto-id";
import ResizeObserver from "resize-observer-polyfill";
import { useInterval } from "$lib/utils/use-interval";
import Button from "$components/button";
const styles = require("./cta-block.module.scss");

const REVIEWS = [
	{
		source: `Bart Mackey, LightArt`,
		content: `Chance offers top-shelf organizational skills, technical know-how, and candor. I highly endorse Chance and encourage you to consider him as well.`,
	},
	{
		source: `JuLee Brand, DesignChik`,
		content: `Chance suggests time-efficient and cost-effective ways for us to create sites that are user-friendly and intuitive. He never makes me feel like what I am asking for is menial. Chance is my go-to guy.`,
	},
	{
		source: `Kurt Reinheimer, Shared Health Alliance`,
		content: `Chance is amazing to work with. He covers all of the details and has a knack for helping to elevate our relationships.`,
	},
];

export interface CTABlockProps
	extends React.PropsWithoutRef<JSX.IntrinsicElements["section"]> {}

const CTABlock: React.FC<CTABlockProps> = ({ className, ...props }) => {
	const titleId = `cta-${useId()}`;
	const [activeReviewIndex, setActiveIndex] = React.useState(0);

	// Create refs for each review component
	const quoteElements = React.useRef<any[]>(REVIEWS.map(React.createRef));

	// Create array of height measurements for each component, then find the tallest
	// to set a fixed height and prevent jank
	const [sizes, setSizes] = React.useState<Map<Element, DOMRect>>(new Map());
	const sizesRef = React.useRef(sizes);
	React.useEffect(() => {
		sizesRef.current = sizes;
	});

	React.useEffect(() => {
		let animationFrameId: number | null = null;
		let measure: ResizeObserverCallback = function measure(entries) {
			animationFrameId = window.requestAnimationFrame(() => {
				const map = new Map(sizesRef.current);
				for (const entry of entries) {
					map.set(entry.target, entry.contentRect as DOMRect);
				}
				setSizes(map);
			});
		};

		const ro = new ResizeObserver(measure);
		for (const ref of quoteElements.current) {
			ref.current && ro.observe(ref.current);
		}

		return () => {
			window.cancelAnimationFrame(animationFrameId!);
			ro.disconnect();
		};
	}, []);

	const boxHeight = React.useMemo(() => {
		let largest: number | null = null;
		for (const [, size] of sizes) {
			if (largest == null || size.height > largest) largest = size.height;
		}
		return largest;
	}, [sizes]);

	// const boxHeight = Math.max(...sizes);

	useInterval(() => {
		setActiveIndex(
			activeReviewIndex < REVIEWS.length - 1 ? activeReviewIndex + 1 : 0
		);
	}, 5500);

	return (
		<section
			aria-labelledby={titleId}
			className={cx(styles.block, className)}
			{...props}
		>
			<div className={styles.container}>
				<h2 id={titleId} className={styles.heading}>
					Let’s Talk
				</h2>
				<div className={styles.contentWrapper}>
					<div className={styles.content}>
						<p>
							If you’ve got a problem you want to solve on the web, let’s talk.
							If you are a stickler for the small details and doing things the
							right way, we’re on the same page. And if you are forward-thinking
							and unafraid to take on tomorrow’s technological challenges
							head-on … well, now you’re speaking my love language! Let’s grab
							coffee and see if we can tackle the future together.
						</p>
						<Button
							className={styles.button}
							onBackgroundColor="xlight-gray"
							href="/contact"
						>
							Get In Touch
						</Button>
					</div>
					<ul className={styles.reviews}>
						{REVIEWS.map((review, i) => {
							return (
								<li
									key={review.source}
									style={{ height: boxHeight || undefined }}
									className={cx(styles.reviewWrapper, {
										[styles["reviewWrapper--active"]]: i === activeReviewIndex,
									})}
								>
									<blockquote
										ref={quoteElements.current[i]}
										className={styles.review}
									>
										{review.content}
										<footer className={styles.reviewFooter}>
											<cite className={styles.reviewSource}>
												{review.source}
											</cite>
										</footer>
									</blockquote>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default CTABlock;

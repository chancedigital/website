import * as React from "react";
import cx from "clsx";
import { useId } from "@reach/auto-id";
import TextCard from "$components/text-card";
import {
	BasicSection,
	BasicSectionHeading,
	BasicSectionInner,
} from "$components/basic-section";
const styles = require("./capabilities.module.scss");

const CARDS = [
	{
		heading: `Web Consulting`,
		content: `Have a hairy challenge that you just aren't sure how to handle on the web? We can probably help, and if we can't, we can definitely point you in the right direction.`,
	},
	{
		heading: `Digital Strategy`,
		content: `You have a business to run, and you need real results from your digital properties. We've got the goods to deliver and leave an impression along the way.`,
	},
	{
		heading: `Product Design`,
		content: `We've got an eye for detail and we're not afraid to use it. Whatever you aim to build, we can build it beautiful and build it right from the ground up.`,
	},
	{
		heading: `Web Development`,
		content: `Our bread and butter. Let us turn your digital dreams into reality using modern tools and best practices for today's blazing-fast, ever-changing internet.`,
	},
];

export interface CapabilitiesProps
	extends React.ComponentPropsWithoutRef<"section"> {}

const Capabilities: React.FC<CapabilitiesProps> = ({ className, ...props }) => {
	const titleId = `capes-${useId()}`;
	return (
		<BasicSection
			aria-labelledby={titleId}
			className={cx(styles.section, className)}
			{...props}
		>
			<BasicSectionInner>
				<BasicSectionHeading id={titleId}>Things We Do</BasicSectionHeading>
				<ul className={styles.list}>
					{CARDS.map((card) => (
						<li key={card.heading} className={styles.item}>
							<TextCard {...card} />
						</li>
					))}
				</ul>
			</BasicSectionInner>
		</BasicSection>
	);
};

export default Capabilities;

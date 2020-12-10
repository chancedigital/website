import * as React from "react";
import cx from "clsx";
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import { Header } from "$components/header";
import { Footer } from "$components/footer";
import { Section } from "$components/heading";
import { useRouter } from "next/router";
import { config } from "$src/site-config";

const SiteLayout: React.FC<{ className?: string }> = ({
	children,
	className,
}) => {
	const { pathname } = useRouter();

	// On the homepage, the heading count context should start from the site
	// layout because the site title serves as the page's h1 tag.
	const ContentWrapper = pathname === "/" ? Section : React.Fragment;
	return (
		<div className={cx(className)} id="site-layout-wrapper">
			<SkipNavLink className="skipnav" />
			<Header siteTitle={config.siteTitle} />
			<ContentWrapper>
				<main>
					<SkipNavContent />
					<div>{children}</div>
				</main>
			</ContentWrapper>
			<Footer />
		</div>
	);
};

export default SiteLayout;

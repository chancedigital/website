import * as React from "react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import SiteLayout from "$src/layouts/site-layout";
import { config } from "$src/site-config";
import "$lib/styles/app.scss";

function MyApp({ Component, pageProps }: AppProps) {
	// For persistent layouts. Stole this idea from Adam Wathan.
	// https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
	const getLayout: PageComponent<any>["getLayout"] =
		(Component as any).getLayout || ((page) => <SiteLayout>{page}</SiteLayout>);

	return (
		<React.Fragment>
			<DefaultSeo {...config.seo} />
			{getLayout(<Component {...pageProps} />, pageProps)}
		</React.Fragment>
	);
}

export default MyApp;

interface PageComponent<P> extends React.FC<P> {
	getLayout?(page: React.ReactElement, pageProps: P): React.ReactElement;
}

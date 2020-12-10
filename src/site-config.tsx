import { NextSeoProps } from "next-seo";

export const authors: Author[] = [
	{
		id: "chance",
		name: "Chance Strickland",
		email: "hi@chancedigital.io",
		bio: `A programmer who occasionally podcasts.`,
		image: "images/chance.jpg",
	},
];

const config: Config = (function ({
	twitterUserName,
	siteTitle,
	siteUrl,
}: {
	twitterUserName: string;
	siteTitle: string;
	siteUrl: string;
}) {
	const twitterHandle = `@${twitterUserName}`;
	return {
		pathPrefix: "/",
		siteTitle,
		siteTitleAlt: "Modern Development for the Modern Web.",
		siteTitleShort: siteTitle,
		siteUrl,
		siteLanguage: "en",
		siteDescription: "Modern Development for the Modern Web.",
		author: authors.find((author) => author.id === "chance") || authors[0],
		organization: "Chance Digital",
		keywords: [
			"web development",
			"JavaScript",
			"React.js",
			"WordPress",
			"web developer",
			"agency",
			"Vue.js",
			"Next.js",
			"php development",
			"React development",
			"Laravel",
		],
		twitterUserName,
		typekitId: "isw6kyj",

		// Manifest and Progress color
		themeColor: "#66c62e",
		backgroundColor: "#202120",

		// Social component
		github: "https://github.com/chaance/",
		stackOverflow: "https://stackoverflow.com/users/1792019/chance-strickland",
		linkedin: "https://www.linkedin.com/in/chaance/",
		userTwitter: `@${twitterUserName}`,
		twitter: `https://twitter.com/${twitterUserName}/`,
		twitterHandle,

		// SEO
		seo: {
			title: siteTitle,
			titleTemplate: `%s | ${siteTitle}`,
			description: "Modern Development for the Modern Web.",
			openGraph: {
				type: "website",
				locale: "en_US",
				url: siteUrl,
				site_name: siteTitle,
				images: [
					// {
					// 	url: 'https://www.example.ie/og-image.jpg',
					// 	width: 800,
					// 	height: 600,
					// 	alt: 'Og Image Alt',
					// },
					// {
					// 	url: 'https://www.example.ie/og-image-2.jpg',
					// 	width: 800,
					// 	height: 600,
					// 	alt: 'Og Image Alt 2',
					// },
				],
			},
			twitter: {
				handle: twitterHandle,
				site: twitterHandle,
				cardType: "summary_large_image",
			},
		},
	};
})({
	twitterUserName: "chancethedev",
	siteTitle: "Chance Digital",
	siteUrl:
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://chancedigital.io",
});

type Config = {
	pathPrefix: string;
	siteTitle: string;
	siteTitleAlt: string;
	siteTitleShort: string;
	siteUrl: string;
	siteLanguage: string;
	siteDescription: string;
	author: Author;
	organization: string;
	keywords: string[];
	twitterUserName: string;
	typekitId: string;

	// Manifest and Progress color
	themeColor: string;
	backgroundColor: string;

	// Social component
	github: string;
	stackOverflow: string;
	linkedin: string;
	userTwitter: string;
	twitter: string;
	twitterHandle: string;

	// SEO
	seo: NextSeoProps;
};

export { config };
export default config;

type Author = {
	name: string;
	image: string;
	id: string;
	email: string;
	bio?: string;
};

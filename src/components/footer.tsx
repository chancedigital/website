import React from "react";
import SocialNav from "$components/social-nav";
import CDLogo from "$components/cd-logo";
const styles = require("./footer.module.scss");

export interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {}

const Footer: React.FC<FooterProps> = (props) => {
	return (
		<footer className={styles.base} {...props}>
			<div className={styles.container}>
				<div className={styles.main}>
					<div className={styles.content}>
						<p className={styles.credit}>
							<a
								className={styles.creditLink}
								href="http://chancedigital.io"
								rel="nofollow"
							>
								Crafted with Care by{" "}
								<CDLogo alt noMargin size="small" className={styles.cdLogo} />
							</a>{" "}
							© {new Date().getFullYear()}
						</p>
					</div>
				</div>
				<div className={styles.nav}>
					<SocialNav className={styles.socialNav} />
				</div>
			</div>
		</footer>
	);
};

export { Footer };
export default Footer;

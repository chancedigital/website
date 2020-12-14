import React from "react";

export interface SVGProps extends React.ComponentPropsWithRef<"svg"> {}

const SVG = React.forwardRef<SVGSVGElement, SVGProps>(
	({ children, viewBox = "0 0 32 32", ...props }, ref) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={viewBox}
				{...props}
				ref={ref}
			>
				{children}
			</svg>
		);
	}
);

export default SVG;

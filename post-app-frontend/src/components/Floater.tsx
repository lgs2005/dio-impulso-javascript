import { PropsWithChildren } from "react";

type Props = {
	left?: string,
	right?: string,
	top?: string,
	bottom?: string,
}

export default function Floater({ top, left, bottom, right, children }: PropsWithChildren<Props>) {
	return (
		<div style={{position: 'relative'}}>
			<div style={{position: 'absolute', top, left, bottom, right}}>
				{children}
			</div>
		</div>
	)
}
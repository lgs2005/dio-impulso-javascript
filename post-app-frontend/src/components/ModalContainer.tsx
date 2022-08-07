import { PropsWithChildren, useEffect, useRef } from "react";

type Props = {
	open: boolean,
	onCancel: () => void,
}

export default function ModalContainer(props: PropsWithChildren<Props>) {
	const dialog = useRef<HTMLDialogElement>(null);

	useEffect(
		() => {
			if (props.open) {
				if (dialog.current?.open === false) {
					dialog.current.showModal();
				}
			} else {
				if (dialog.current?.open === true) {
					dialog.current.close();
				}
			}
		},
		[props.open]
	);

	return (
		<dialog ref={dialog} onCancel={props.onCancel}>
			{props.children}
		</dialog>
	)
}
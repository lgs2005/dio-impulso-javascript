import { useState, useEffect } from "react";

export type AsyncStatus<T> = 
| {
	loading: true,
	error: false,
	value: undefined,
}
| {
	loading: false,
	error: true,
	value: any,
}
| {
	loading: false,
	error: false,
	value: T,
}

// Referência para implementação: https://polvara.me/posts/fetching-asynchronous-data-with-react-hooks

// 1 da manha ingles n ta bom agora nao
/** Hook for dealing with the state of an asynchronous operation.
 * Receives a callback and arguments that will be passed to it.
 * Those arguments will be registered as dependencies.
 */
export function useAsync<T, P extends any[]>(
	promise: (...args: P) => Promise<T>,
	...params: P
): AsyncStatus<T> {
	const [status, setStatus] = useState<AsyncStatus<T>>({
		loading: true,
		error: false,
		value: undefined,
	});

	useEffect(() => {
		setStatus({
			loading: true,
			error: false,
			value: undefined,
		});

		promise(...params).then(
			(value) => setStatus({
				loading: false,
				error: false,
				value: value,
			}),
			(error) => setStatus({
				loading: false,
				error: true,
				value: error,
			})
		);
	// eslint-disable-next-line
	}, [promise, ...params]);

	return status;
}
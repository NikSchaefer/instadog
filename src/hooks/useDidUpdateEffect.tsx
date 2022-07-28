import { useRef, useEffect } from "react";

function useDidUpdateEffect(fn: Function, inputs: any[]) {
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) {
			return fn();
		}
		didMountRef.current = true;
	}, inputs);
}

export default useDidUpdateEffect;

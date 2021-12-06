import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useAppState = () => {
	const { currentState } = AppState.currentState;
	const [appState, setAppState] = useState(currentState);

	function onChange(newState) {
		setAppState(newState);
	}

	useEffect(() => {
		AppState.addEventListener('change', onChange);

		return () => {
			AppState.removeEventListener('change', onChange);
		};
	}, []);

	return appState;
}



export { AppStateStatus };

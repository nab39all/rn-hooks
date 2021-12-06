import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboardHeight = (platforms = ['ios', 'android']) => {
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	const isEventRequired = (platforms) => {
		try {
			return (
				platforms?.map((p) => p?.toLowerCase()).indexOf(Platform.OS) !==
					-1 || !platforms
			);
		} catch (ex) {
			console.log(ex);
		}

		return false;
	};

	const keyboardDidShow = (frames) => {
		setKeyboardHeight(frames.endCoordinates.height);
	};

	const keyboardDidHide = () => {
		setKeyboardHeight(0);
	};

	useEffect(() => {
		if (isEventRequired(platforms)) {
			Keyboard.addListener('keyboardDidShow', keyboardDidShow);
			Keyboard.addListener('keyboardDidHide', keyboardDidHide);

			// cleanup function
			return () => {
				Keyboard.removeAllListeners(
					'keyboardDidShow',
					'keyboardDidHide'
				);
			};
		}

		return () => {};
	}, []);

	return keyboardHeight;
};

export { useKeyboardHeight };

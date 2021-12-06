import { Clipboard } from 'react-native';

const listeners = new Set();

const setString = (content) => {
	Clipboard.setString(content);
	listeners.forEach((listener) => listener(content));
}

const useClipboard = () => {
	const [data, updateClipboardData] = useState('');

	// Get initial data
	useEffect(() => {
		Clipboard.getString().then(updateClipboardData);
	}, []);

	// Listen for updates
	useEffect(() => {
		listeners.add(updateClipboardData);

		return () => {
			listeners.delete(updateClipboardData);
		};
	}, []);

	return [data, setString];
}

export const { useClipboard };

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { AlertContextProvider } from './context/AlertContext';
import { useFonts } from 'expo-font';

import Home from './screens/Home';
import Schedule from './screens/Schedule';
import Upcoming from './screens/Upcoming';

function App() {
	const [index, setIndex] = useState(0);

	const [routes] = React.useState([
		{ key: 'home', title: 'Home', focusedIcon: 'home-variant', unfocusedIcon: 'home-variant-outline' },
		{ key: 'schedule', title: 'Schedule', focusedIcon: 'timer-sand', unfocusedIcon: 'timer-sand-complete' },
		{ key: 'upcoming', title: 'Upcoming', focusedIcon: 'clipboard-text-clock', unfocusedIcon: 'clipboard-text-clock-outline' },
	]);

	const [fontsLoaded] = useFonts({
		'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
		'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
	  });

	const renderScene = BottomNavigation.SceneMap({
		home: Home,
		schedule: Schedule,
		upcoming: Upcoming,
	});

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
}

export default () => (
	<AlertContextProvider>
		<App />
	</AlertContextProvider>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

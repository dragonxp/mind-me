import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { useAlertContext } from '../hooks/useAlertContext';
import SavedAlerts from '../components/SavedAlerts';
import AlertForm from '../components/AlertForm';

export default function Home() {
	const { alertsActive, alertsSaved } = useAlertContext()

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView>
				<View style={styles.container}>
					<AlertForm alertsActive={alertsActive} alertsSaved={alertsSaved} />
					<SavedAlerts alertsSaved={alertsSaved} />
				</View>
			</ScrollView>
		</TouchableWithoutFeedback >
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 80,
		paddingLeft: 32,
		paddingRight: 32,
	},
})
import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { useAlertContext } from '../hooks/useAlertContext';
import SavedAlerts from '../components/SavedAlerts';
import AlertForm from '../components/AlertForm';


export default function Home() {
	const { alertActive, alertSaved, dispatch } = useAlertContext()

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView>
				<View style={styles.container}>
					<AlertForm alertActive={alertActive} alertSaved={alertSaved} dispatch={dispatch} />
					<SavedAlerts alertSaved={alertSaved} />
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
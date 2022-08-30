import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Schedule() {
	return (
		<View style={styles.container}>
			<Text>Schedule</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 100,
		paddingLeft: 32,
		paddingRight: 32,
	}
})
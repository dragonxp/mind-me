import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Upcoming() {
	return (
		<View style={styles.container}>
			<Text>Upcoming</Text>
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
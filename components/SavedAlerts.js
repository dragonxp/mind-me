import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollViewComponent, ScrollView } from "react-native";
import SavedAlertCard from "./SavedAlertCard";

export default function SavedAlerts({ alertSaved }) {

    if (alertSaved.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Saved Alerts</Text>
                <Text style={styles.noAlert}>No saved alerts to show</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Saved Alerts</Text>
                <ScrollView>
                    {alertSaved.map((alert) => (
                        <SavedAlertCard key={alert.key} alert={alert} />
                    ))}
                </ScrollView>
                {/* <FlatList
                    data={alertsSaved}
                    renderItem={({ item }) => (
                        <SavedAlertCard alert={item} />
                    )}
                /> */}
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10,
    },
    noAlert: {
        fontStyle: 'italic',
        opacity: 0.7,
    },
})
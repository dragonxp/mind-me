import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function SavedAlertCard({ alert }) {

    return (
        <TouchableOpacity>
            <View style={styles.card}>
                <View style={styles.reorderIcon}>
                    <FontAwesome name="reorder" size={24} color="black" />
                </View>
                <>
                    <Text style={styles.title}>{alert.title}</Text>
                    {alert.body && <Text style={styles.body}>{alert.body}</Text>}
                </>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e8def8',
        paddingLeft: 18,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 5,
        marginBottom: 12,
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
        color: '#131217',
    },
    body: {
        color: '#59595c',
    },
    reorderIcon: {
        opacity: 0.55,
        justifyContent: 'center',
        marginRight: 10,
    }
})
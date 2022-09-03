import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// alert_active - for active alerts
// alert_saved - for quick saved alerts
// alert_history - for expired alerts


export const fetchAlerts = async () => {
    try {
        return await AsyncStorage.multiGet(['alert_active', 'alert_saved', 'alert_history'])
    } catch (err) {
        console.log(err.message)
    }
}

export const modifyAlertActive = async (value) => {
    value = JSON.stringify(value)

    try {
        await AsyncStorage.setItem('alert_active', value)
    } catch (err) {
        // save error
        console.log(err.message)
    }
}

export const modifyAlertSaved = async (value) => {
    value = JSON.stringify(value)

    try {
        await AsyncStorage.setItem('alert_saved', value)
    } catch (err) {
        // save error
        console.log(err.message)
    }
}

export const modifyAlertHistory = async (value) => {
    value = JSON.stringify(value)

    try {
        await AsyncStorage.setItem('alert_history', value)
    } catch (err) {
        // save error
        console.log(err.message)
    }
}
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// alerts_active - for active alerts
// alerts_saved - for quick saved alerts
// alerts_history - for expired alerts


export const fetchAlerts = async () => {
    try {
        return await AsyncStorage.multiGet(['alerts_active', 'alerts_saved', 'alerts_history'])
    } catch (err) {
        console.log(err.message)
    }
}


// alerts active

export const addActiveAlert = async (value) => {
    value = JSON.stringify(value)

    try {
        await AsyncStorage.setItem('alerts_active', value)
    } catch (err) {
        // save error
        console.log(err.message)
    }

}

export const modifyActiveAlert = (value) => {

}

export const deleteActiveAlert = (value) => {

}


// alerts history

export const addAlertHistory = (value) => {

}

export const clearAlertHistory = () => {

}


// alerts saved

export const addSavedAlert = async (value) => {
    value = JSON.stringify(value)

    try {
        await AsyncStorage.setItem('alerts_saved', value)
    } catch (err) {
        // save error
        console.log(err.message)
    }
}

export const modifySavedAlert = (value) => {

}

export const deleteSavedAlert = (value) => {

}
import React, { useState } from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { triggerNotification } from '../components/Notification';
import { addActiveAlert, addSavedAlert } from '../components/AsyncStorage';

export default function AlertForm({ alertsActive, alertsSaved }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const _date = new Date(Date.now())
    _date.setSeconds(0)

    const [date, setDate] = useState(_date);
    const [reminderDate, setReminderDate] = useState(date.toLocaleDateString())
    const [reminderTime, setReminderTime] = useState(date.toLocaleTimeString())

    const getAlertFormat = () => {
        let content = {}

        if (title.length === 0) content.title = "Here's your Reminder"
        else content.title = title

        if (description.length !== 0) content.body = description

        setTitle('')
        setDescription('')

        return content
    }

    const scheduleNotification = () => {
        Keyboard.dismiss()

        const content = getAlertFormat()

        triggerNotification(content, date)
        addActiveAlert([{ date, ...content }, ...alertsActive])
    }

    const saveAlert = () => {
        Keyboard.dismiss()

        const content = getAlertFormat()

        addSavedAlert([{ ...content, key: Date.now() }, ...alertsSaved])
    }

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
        setReminderDate(selectedDate.toLocaleDateString())
        setReminderTime(selectedDate.toLocaleTimeString())
    }

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: false,
        });
    }

    const showDatepicker = () => {
        showMode('date');
    }

    const showTimepicker = () => {
        showMode('time');
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                label="Reminder Title"
                mode='outlined'
                placeholder='Give cat some treats'
                value={title}
                onChangeText={text => setTitle(text)}
                placeholderTextColor='#D0D0D0'
            />
            <TextInput
                style={styles.textInput}
                label="Optional Description"
                mode='outlined'
                multiline={true}
                value={description}
                onChangeText={text => setDescription(text)}
            />
            <TextInput
                style={styles.textInput}
                left={<TextInput.Icon name="calendar-range" />}
                label="Date"
                mode='outlined'
                value={reminderDate}
                onPressIn={showDatepicker}
                showSoftInputOnFocus={false}
            />
            <TextInput
                style={styles.textInput}
                left={<TextInput.Icon name="clock-outline" />}
                label="Time"
                mode='outlined'
                value={reminderTime}
                onPressIn={showTimepicker}
                showSoftInputOnFocus={false}
            />

            <Button
                mode="Outlined button"
                style={styles.button}
                icon='chevron-right'
                contentStyle={{ flexDirection: 'row-reverse' }}
            >
                MORE OPTIONS
            </Button>

            <View style={styles.saveScheduleContainer}>
                <Button
                    mode="Outlined button"
                    onPress={saveAlert}
                    icon='content-save'
                    style={styles.button}
                >
                    SAVE
                </Button>

                <Button
                    mode="contained-tonal"
                    onPress={scheduleNotification}
                    style={styles.scheduleButton}
                >
                    SCHEDULE
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderColor: '#87bdd8',
        borderWidth: 1,
        marginBottom: 10,
    },
    scheduleButton: {
        borderRadius: 5,
        flex: 1,
        marginBottom: 10,
        marginLeft: 10,
    },
    saveScheduleContainer: {
        flexDirection: 'row',
    },
    textInput: {
        marginBottom: 10,
    },
})
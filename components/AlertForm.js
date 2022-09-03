import React, { useState } from 'react'
import { StyleSheet, View, Text, Keyboard, TouchableOpacity } from 'react-native'
import { TextInput, Button, IconButton } from 'react-native-paper'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { triggerNotification } from '../components/Notification';

export default function AlertForm({ alertActive, alertSaved, dispatch }) {
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
        dispatch({ type: 'MODIFY_ALERT_ACTIVE', payload: [{ date, ...content }, ...alertActive] })

    }

    const saveAlert = () => {
        Keyboard.dismiss()

        const content = getAlertFormat()

        dispatch({ type: 'MODIFY_ALERT_SAVED', payload: [{ ...content, key: Date.now() }, ...alertSaved] })
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
                label="Remind me to (optional)"
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

            <View style={styles.clock}>
                <TextInput
                    style={styles.textInput}
                    left={<TextInput.Icon name="clock-outline" />}
                    label="Time"
                    mode='outlined'
                    value={reminderTime}
                    onPressIn={showTimepicker}
                    showSoftInputOnFocus={false}
                />

                <IconButton
                    icon="swap-horizontal"
                    size={34}
                    style={styles.clockIcon}
                    onPress={() => console.log('Pressed')}
                />
            </View>

            <TextInput
                style={styles.textInput}
                left={<TextInput.Icon name="calendar-range" />}
                label="Date"
                mode='outlined'
                value={reminderDate}
                onPressIn={showDatepicker}
                showSoftInputOnFocus={false}
                onPress={() =>console.log('check')}
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
        flexGrow: 1,
    },
    clock: {
        flexDirection: 'row',
    },
    clockIcon: {
        alignSelf: 'auto',
        backgroundColor: '#e8def8',
        borderRadius: 5,
        marginLeft: 12,
    },
})
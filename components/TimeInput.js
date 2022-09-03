import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function TimeInput() {
    const [hour, setHour] = useState('00')
    const [minutes, setMinutes] = useState('00')

    const [isFirstInput, setIsFirstInput] = useState(true)

    const hourRef = useRef(null)
    const minutesRef = useRef(null)

    const evaluateSetHour = (val) => {
        if (isFirstInput && hour.length < 3) {
            setHour('0' + val)
            setIsFirstInput(false)
        } else {
            val = [...val]
            setHour(val[1] + val[2])
            setIsFirstInput(true)

            if (minutes === '00') minutesRef.current.focus()
        }
    }

    const evaluateSetMinutes = (val) => {
        if (isFirstInput && minutes.length < 3) {
            setMinutes('0' + val)
            setIsFirstInput(false)
        } else {
            val = [...val]
            setMinutes(val[1] + val[2])
            setIsFirstInput(true)

            if (hour === '00') hourRef.current.focus()
        }
    }

    return (
        <View style={styles.timerContainer}>

            <TouchableOpacity onPress={() => hourRef.current.focus()} style={styles.timerOpacityHour}>
                <TextInput
                    ref={hourRef}
                    style={styles.timerTextHour}
                    onChangeText={(val) => evaluateSetHour(val)}
                    value={hour}
                    keyboardType="numeric"
                    selectTextOnFocus={true}
                    caretHidden={true}
                />
            </TouchableOpacity>

            <Text style={styles.timerTextSeparator}>:</Text>

            <TouchableOpacity onPress={() => minutesRef.current.focus()} style={styles.timerOpacityMinutes}>
                <TextInput
                    ref={minutesRef}
                    style={styles.timerTextMinutes}
                    onChangeText={(val) => evaluateSetMinutes(val)}
                    value={minutes}
                    keyboardType="numeric"
                    selectTextOnFocus={true}
                    caretHidden={true}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',

    },
    timerOpacityHour: {
        flexGrow: 1,
        flexDirection: 'row-reverse',
        borderBottomWidth: 0.65,
    },
    timerTextHour: {
        fontSize: 34,
        paddingRight: 15,
        opacity: 0.7,
    },
    timerTextSeparator: {
        fontSize: 34,
        fontWeight: 'bold',
        opacity: 0.7,
    },
    timerOpacityMinutes: {
        flexGrow: 1,
        borderBottomWidth: 0.65,
    },
    timerTextMinutes: {
        fontSize: 34,
        paddingLeft: 15,
        opacity: 0.7,
    },
})
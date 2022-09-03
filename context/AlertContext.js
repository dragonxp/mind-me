import React, { createContext, useReducer, useEffect } from "react";
import { fetchAlerts, modifyAlertActive, modifyAlertSaved, modifyAlertHistory } from "../components/AsyncStorage";


export const AlertContext = createContext()

export const alertReducer = (state, action) => {
    switch (action.type) {
        case 'ALERT_IS_READY':
            let _state = {}

            action.payload.forEach(data => {
                switch(data[0]) {
                    case 'alert_active':
                        _state.alertActive = data[1] != null ? JSON.parse(data[1]) : []
                    case 'alert_saved':
                        _state.alertSaved = data[1] != null ? JSON.parse(data[1]) : []
                    case 'alert_history':
                        _state.alertHistory = data[1] != null ? JSON.parse(data[1]) : []
                }
            })

            _state.isAlertReady = true
            return _state
        case 'MODIFY_ALERT_ACTIVE':
            modifyAlertActive(action.payload)
            return {...state, alertActive: action.payload}
        case 'MODIFY_ALERT_SAVED':
            modifyAlertSaved(action.payload)
            return {...state, alertSaved: action.payload}
        case 'MODIFY_ALERT_HISTORY':
            modifyAlertHistory(action.payload)
            return {...state, alertHistory: action.payload}
        default:
            return state
    }
}

export const AlertContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(alertReducer, {
        alertActive: [],
        alertSaved: [],
        alertHistory: [],
        isAlertReady: false
    })

    console.log(state)

    useEffect(() => {
        const getAlerts = async () => {
            console.log(Date.now())
            const alerts = await fetchAlerts()
            console.log(Date.now())
            dispatch({ type: 'ALERT_IS_READY', payload: alerts })
        }

        getAlerts()
    },[])

    return (
        <AlertContext.Provider value={{...state, dispatch}}>
            {children}
        </AlertContext.Provider>
    )
}
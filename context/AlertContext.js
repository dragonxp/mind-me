import React, { createContext, useReducer, useEffect } from "react";
import { fetchAlerts } from "../components/AsyncStorage";

export const AlertContext = createContext()

export const alertReducer = (state, action) => {
    switch (action.type) {
        case 'ALERT_IS_READY':
            let _state = {}

            action.payload.forEach(data => {
                switch(data[0]) {
                    case 'alerts_active':
                        _state.alertsActive = data[1] != null ? JSON.parse(data[1]) : []
                    case 'alerts_saved':
                        _state.alertsSaved = data[1] != null ? JSON.parse(data[1]) : []
                    case 'alerts_history':
                        _state.alertsHisory = data[1] != null ? JSON.parse(data[1]) : []
                }
            })

            _state.isAlertReady = true
            return _state
        default:
            return state
    }
}

export const AlertContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(alertReducer, {
        alertsActive: [],
        alertsSaved: [],
        alertsHisory: [],
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
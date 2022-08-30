import React, { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export const useAlertContext = () => {
    const context = useContext(AlertContext)
    if (!context) throw Error('useAlertContext can only be used inside AlertContextProvider')
    return context
}
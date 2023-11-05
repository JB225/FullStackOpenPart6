import {createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case  "UPDATE":
            return action.message
        case "CLEAR":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={ [message, messageDispatch] }>
            {// eslint-disable-next-line react/prop-types
            props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
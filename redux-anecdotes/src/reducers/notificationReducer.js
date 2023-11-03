import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        removeMessage() {
            return null
        }
    }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (messsage, time) => {
    return (dispatch) => {
        setTimeout(() => {dispatch(removeMessage())}, time)
        dispatch(setMessage(messsage))
    }
}

export default notificationSlice.reducer
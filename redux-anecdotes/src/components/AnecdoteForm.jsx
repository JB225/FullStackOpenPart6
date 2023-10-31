import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch({type: 'anecdotes/createAnecdote', payload: event.target.anecdote.value})
        dispatch({
            type: 'notification/setNotification', 
            payload: 'You created ' + "'" + event.target.anecdote.value + "'"})
        setTimeout(() => {dispatch({type: 'notification/removeNotification'})}, 2000)
        event.target.anecdote.value = ''
      }

    return <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    </div>
}

export default AnecdoteForm
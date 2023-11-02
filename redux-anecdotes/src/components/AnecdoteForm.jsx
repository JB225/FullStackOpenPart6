import { useDispatch } from 'react-redux'
import ancedoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()

        const newAnecdote = await ancedoteService.createNew(event.target.anecdote.value)
        dispatch({type: 'anecdotes/appendAnecdote', payload: newAnecdote})

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
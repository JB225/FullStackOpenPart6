import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if (state.filter) {
        return state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase()))
        // return state.anecdotes
      }
      return state.anecdotes
    })
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(updateVotes(id))
    }

    return <div>
        {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
}

export default AnecdoteList
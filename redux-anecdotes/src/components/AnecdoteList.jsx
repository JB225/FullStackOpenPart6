import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
      if (filter === '') {
        return [...anecdotes]
      }
      return [...anecdotes].filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      dispatch(increaseVote(anecdote))
      dispatch(setNotification('You voted for ' + "'" + anecdote.content + "'", 2000))
    }

    return <div>
        {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
}

export default AnecdoteList
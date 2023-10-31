import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
      if (filter === '') {
        return [...anecdotes]
      }
      return [...anecdotes].filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch({type: 'anecdotes/updateVotes', payload: id})
      dispatch({
        type: 'notification/setNotification', 
        payload: 'You voted for ' + "'" + anecdotes.find(anec => anec.id === id).content + "'"})
      setTimeout(() => {dispatch({type: 'notification/removeNotification'})}, 2000)
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
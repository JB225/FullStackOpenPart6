import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const [message, dispatch] = useContext(NotificationContext)

  const result = useQuery({
    queryKey:['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  
  if (result.isError) {
    return <div>anecdote service note available due to problems in the server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({type: "UPDATE", message: "Voted for: " + anecdote.content})
    setTimeout(() => dispatch({type: "CLEAR"}), 2000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

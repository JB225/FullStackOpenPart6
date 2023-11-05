import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import NotificationContext from "./NotificationContext"
import { useContext } from "react"


const AnecdoteForm = () => {
  const [message, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
      { content: content, votes: 0 },
      { onError(err) { 
          dispatch({type: "UPDATE", message: "Anecdotes must have a length of at least 5 characters." })
          setTimeout(() => dispatch({type: "CLEAR"}), 2000)
       }
    })
    dispatch({type: "UPDATE", message: "Created: " + content})
    setTimeout(() => dispatch({type: "CLEAR"}), 2000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
        <p></p>
      </form>
    </div>
  )
}

export default AnecdoteForm

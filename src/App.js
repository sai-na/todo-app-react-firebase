import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Todo from './Todo'
import { db } from './firebase'
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-rose-400 to-orange-300`,
  container: `bg-white max-w-[800px] w-full mx-auto rounded-md shadow-lg p-4`,
  heading: `text-4xl font-bold text-center text-${'#4285F4'} p-2`,
  form: `flex justify-between items-center mb-4`,
  input: `border-2 border-gray-300 p-2 w-full text-xl focus:outline-none focus:border-${'#4285F4'} rounded`,
  button: `border-2 border-transparent px-4 py-2 bg-gradient-to-r from-orange-400 to-rose-400 text-white transition-colors duration-200`,
  count: `text-center p-2 text-gray-600`,
}



function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e)
    if (input === '') {
      alert('Please enter a valid todo')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('')
  }

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      })
      console.log(todosArr)
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])








  // Update todo in firebase
  const toggleComplete = async (todo) => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed,
      })
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }




  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }


  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Task list</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Todo'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  )
}

export default App

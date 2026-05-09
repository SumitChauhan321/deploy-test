import { useState } from 'react'

import './App.css'
import MessageComponent from './MessageComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<MessageComponent />

      </>
  )
}

export default App

import { useState } from 'react'
import DisplayPost from './components/DisplayPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DisplayPost />
    </>
  )
}

export default App

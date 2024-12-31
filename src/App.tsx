import React, { useState } from 'react'
import ShortStoryCards from './views/components/ShortStoryCards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ShortStoryCards />
    </>
  )
}

export default App

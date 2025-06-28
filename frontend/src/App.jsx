import { useState } from 'react'

import Approuter from './approuter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Approuter />
    </>
  )
}

export default App

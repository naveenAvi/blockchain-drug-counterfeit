import { useState } from 'react'

import Approuter from './approuter'
import { UserProvider } from './Shared/contexts/userContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserProvider>
        <Approuter />
      </UserProvider>
    </>
  )
}

export default App

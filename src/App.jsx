import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authService } from './appwrite/authService'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.error("Failed to get current user:", error);
        dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [])

  return loading ? (
    <>
      <Header />
      <div>Loading...</div>
      <Footer />
    </>
  ) : (
    <>
      <Header />
      <h1>App Loaded</h1>
      <Footer />
    </>
  )
}

export default App

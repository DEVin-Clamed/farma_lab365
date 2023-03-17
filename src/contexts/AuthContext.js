// inicializar o contexto
import { createContext, useEffect, useState } from "react";
import api from '../services/api'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

// Montar o provedor

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')

  const handleLogin = (email, password) => {
    /* COM api real ->
     api.post('/session', {email, password})
     .then((response) => {
        setUser(response.data.name)
         setToken(response.data.token)

          api.defaults.headers.Authorization = `Bearer response.data.token`

         localStorage.setItem('@name-user-farmalab', response.data[0].name)
        navigate('/')
     })
     .catch(() => {
      toast.error('Credenciais incorreta')
     })
    */

    api.get(`/users?email=${email}&password=${password}`)
      .then((response) => {
        if (response.data.length === 1) {
          setUser(response.data[0].name)
          setToken(fakeToken)

          api.defaults.headers.Authorization = `Bearer ${fakeToken}`

          localStorage.setItem('@name-user-farmalab', response.data[0].name)
          localStorage.setItem('@token-user-farmalab', fakeToken)

          navigate('/')
        } else {
          toast.error('Credenciais incorreta')
        }
      })
      .catch(() => toast.error('Credenciais incorreta'))
  }

  const logout = () => {
    localStorage.removeItem('@name-user-farmalab')
    localStorage.removeItem('@token-user-farmalab')
    setUser('')
    setToken('')
  }


  useEffect(() => {
    const nameInLocalStorage = localStorage.getItem('@name-user-farmalab')
    if (nameInLocalStorage) setUser(nameInLocalStorage)

    const tokenInLocalStorage = localStorage.getItem('@token-user-farmalab')
    if (tokenInLocalStorage) {
      setToken(tokenInLocalStorage)
      api.defaults.headers.Authorization = `Bearer ${tokenInLocalStorage}`
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user: user,
      token: token,
      handleLogin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

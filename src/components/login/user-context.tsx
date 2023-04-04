import { UserCredential } from '@firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

interface UserContextProps {
  user: UserCredential | null
  setUser: (user: UserCredential) => void
  isLoggedIn: boolean
}

export const UserContext = createContext<UserContextProps | null>(null)

interface UserContextProviderProps {
  children: React.ReactNode
}

export function UserProvider(props: UserContextProviderProps) {
  const [user, setUser] = useState<UserCredential | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function onLoginSideEffect() {
    if (user) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }

  useEffect(onLoginSideEffect, [user])
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default function useAuth() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useAuth must be used within a UserContextProvider')
  }
  return context
}

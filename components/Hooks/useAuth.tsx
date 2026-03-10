import React, { createContext, useContext } from 'react'
import { AuthContext } from '../Firebase/AuthProvider'

export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth
}


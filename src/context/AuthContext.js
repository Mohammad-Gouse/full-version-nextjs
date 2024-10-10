// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import awsConfig from 'src/configs/awsConfig'
import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import moment from 'moment'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  failureMessage: null,
  setFailureMessage: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [failureMessage, setFailureMessage] = useState(null)

  // ** Hooks
  const router = useRouter()

  const autoLogout = time => {
    const targetTime = moment(time).subtract(1, 'minute')
    const currentTime = moment()
    const timeDifference = targetTime.diff(currentTime)

    setTimeout(() => {
      handleLogout()
    }, timeDifference)
  }

  useEffect(() => {
    const useData = window.localStorage.getItem('userdetails')
    const userDetail = JSON.parse(useData)
    setUser(userDetail)
  }, [])

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const userParseData = window.localStorage.getItem('userdetails')
      const userData = JSON.parse(userParseData)
      setLoading(true)

      console.log(storedToken)
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken)
        const expirationTime = new Date(decodedToken.exp * 1000) // Convert to milliseconds
        autoLogout(expirationTime)
        setLoading(false)
        if (router.route == '/login') {
          router.replace('/home')
        } else {
          const newUrl = router.pathname
          router.replace(newUrl, undefined, { shallow: true })
        }
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isTokenValid = (token, publicKey) => {
    if (!token) return false

    try {
      jwt.verify(token, publicKey)
      return true
    } catch (error) {
      return false
    }
  }

  const handleLogin = (params, errorCallback) => {
    const body = {
      Type: 1,
      Token: params?.password,
      ClientCode: params?.userId,
      BranchCode: params?.loginType?.branchCode,
      Code: params?.loginType?.code
    }
    axios
      .post(`${awsConfig.BASE_URL}/auth/login`, body)
      .then(async response => {
        const decodedToken = jwtDecode(response?.data?.token)

        window.localStorage.setItem(authConfig.storageTokenKeyName, response?.data?.token)
        window.localStorage.setItem('idToken', response?.data?.token)

        setUser({ ...response?.data?.data[0], role: 'admin' })
        const userDetailsString = JSON.stringify({ ...response?.data?.data[0], role: 'admin' })
        window.localStorage.setItem('userdetails', userDetailsString)

        const expirationTime = new Date(decodedToken.exp * 1000) // Convert to milliseconds
        autoLogout(expirationTime)

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        setFailureMessage(err?.response?.data?.message)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ userId: params.userId, password: params.password })
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    failureMessage,
    setFailureMessage
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

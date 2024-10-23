import axios from 'axios'
let errorCallback = null
const createAxiosInstance = onError => {
  // const accessToken = window.localStorage.getItem('accessToken')
  let axiosInstance
  if (typeof window !== 'undefined') {
    const accessToken = window.localStorage.getItem('accessToken')

    axiosInstance = axios.create({
      timeout: 15000, // Timeout after 15 seconds
      headers: {
        Authorization: `${accessToken}`
      },
      withCredentials: true
    })

    axiosInstance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (errorCallback) {
          if (!error.response) {
            if (error.message === 'Network Error') {
              errorCallback('Network Error: Please check your internet connection.')
            } else if (error.code === 'ECONNABORTED') {
              errorCallback('Request timed out: Please try again later.')
            } else {
              return Promise.reject(error)
              // errorCallback(`Unexpected Error: ${error.message}`)
            }
          } else {
            // errorCallback(`Error: ${error.response.status} - ${error.response.statusText}`)
            return Promise.reject(error)
          }
        }
        return Promise.reject(error)
      }
    )
  } else {
    axiosInstance = axios.create()
  }
  return axiosInstance
}

export const setGlobalErrorCallback = callback => {
  errorCallback = callback
}

export default createAxiosInstance

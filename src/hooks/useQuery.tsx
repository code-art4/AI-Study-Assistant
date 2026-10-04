import { HttpMethod } from '@/types'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

// Interface to define the options object for useQuery hook
interface QueryOptions {
  url: string
  method?: HttpMethod // Defaults to GET if not specified
  successFn?: (res: AxiosResponse) => void
  errorFn?: (err: Error) => void
}

// Interface to define the return object of useQuery hook
interface QueryResult {
  error?: string
  success?: any
  loading: boolean
  loadFn: (values?: any) => Promise<any>
}

const useQuery = ({
  url,
  method = HttpMethod.POST,
  successFn,
  errorFn,
}: QueryOptions): QueryResult => {


  const axiosUrl =
    import.meta.env.VITE_MODE === 'development'
      ? import.meta.env.VITE_API_URL
      : '';
  
  axios.defaults.baseURL = axiosUrl;

  // State variables for loading, success and error
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<any>(null)
  const [error, setError] = useState<string>()

  // Function to load the data using axios and update the state variables
  const loadFn = async (values?: any): Promise<any> => {
    setLoading(true)
    setError(undefined)
    try {
      // Make an axios request with the provided options
      const response = await axios.request({
        url,
        method,
        data: values, // Use the provided values or the default data
      })
      setLoading(false)
      setSuccess(response.data)
      successFn?.(response)
      return response.data
    } catch (err: any) {
      setLoading(false)
      errorFn?.(err)
      // Set error state with response error message, or generic error message if not available
      if (err?.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError(err.message)
      }
      return undefined
    }
  }

  // Return the state variables and the load function
  return {
    error,
    success,
    loading,
    loadFn,
  }
}

export default useQuery
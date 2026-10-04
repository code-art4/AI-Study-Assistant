// apiCall.ts
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface ApiCallProps {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values?: any;
  body?: any;
  result?: {
    loading: boolean;
    status: 'success' | 'failed' | 'not loaded';
    error: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  };
}

const apiCall = async ({
  url,
  method,
  values,
  body,
  result
}: ApiCallProps): Promise<AxiosResponse | void> => {

   const [apiResult, setApiResult] = useState(result);


  const axiosUrl =
    import.meta.env.VITE_MODE === 'development'
      ? import.meta.env.VITE_API_URL
      : '';

  axios.defaults.baseURL = axiosUrl;

  if (setApiResult) {
    setApiResult((prev) => ({
      ...prev,
      loading: true,
      status: 'not loaded',
      error: '',
    }));
  }

  try {
    const response = await axios.request({
      url,
      method,
      data: values,
    });

    setApiResult((prev) => ({
      ...prev,
      loading: false,
      status: 'success',
      data: response.data,
    }));

    return response.data;
  } catch (err: any) {
    setApiResult((prev) => ({
      ...prev,
      loading: false,
      status: 'failed',
      error:
        err?.message || err?.response?.data?.message || 'Something went wrong',
    }));
  }
};

export default apiCall;

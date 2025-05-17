// apiCall.ts
import axios, { AxiosResponse } from 'axios';

interface ApiCallProps {
  setApiResult?: React.Dispatch<React.SetStateAction<any>>;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values?: any;
}

const apiCall = async ({
  setApiResult,
  url,
  method,
  values,
}: ApiCallProps): Promise<AxiosResponse | void> => {
  const axiosUrl =
    import.meta.env.VITE_MODE === 'development'
      ? import.meta.env.VITE_API_URL
      : '';

  axios.defaults.baseURL = axiosUrl;

  if (setApiResult) {
    setApiResult((prev) => ({
      ...prev,
      loading: true,
      status: '',
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

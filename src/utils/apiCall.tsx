import axios, { isAxiosError } from 'axios';

interface ApiCallProps {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  values?: unknown;
  body?: unknown; // currently unused, kept so existing callers still compile
}

const apiCall = async <T = unknown>({
  url,
  method,
  values,
}: ApiCallProps): Promise<T> => {
  axios.defaults.baseURL =
    import.meta.env.VITE_MODE === 'development'
      ? import.meta.env.VITE_API_URL
      : '';

  try {
    const response = await axios.request<T>({
      url,
      method,
      data: values,
    });
    return response.data;
  } catch (err: unknown) {
    let message = 'Something went wrong';
    if (isAxiosError(err)) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }
    throw new Error(message);
  }
};

export default apiCall;
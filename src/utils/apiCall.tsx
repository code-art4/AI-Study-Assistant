import axios, { AxiosResponse } from 'axios';

const apiCall = async (props): Promise<AxiosResponse | void> => {
  const { setApiResult, url, method, values, successFunc } = props;

  const axiosUrl =
    import.meta.env.VITE_MODE === 'development'
      ? import.meta.env.VITE_API_URL
      : '';

  axios.defaults.baseURL = axiosUrl;

  // Set loading state
  setApiResult((prev) => ({
    ...prev,
    loading: true,
    status: '',
    error: '',
  }));

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

    successFunc?.(response.data);
    return response.data;
  } catch (err) {
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

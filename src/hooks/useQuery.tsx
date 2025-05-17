import { useState, useEffect } from 'react';
import apiCall from '../utils/apiCall';
import { HttpMethod, QueryResult, QueryOptions } from '../types/apis';

const useQuery = (queryProps) => {
  const { url, method = HttpMethod.POST }: QueryOptions = queryProps;

  // State variables for loading, success and error
  const [apiResult, setApiResult] = useState({
    loading: false,
    status: null,
    error: '',
    data: null,
  });

  // Function to load the data using axios and update the state variables
  useEffect(() => {
    apiCall({ setApiResult, apiResult, url, method });
  }, []);

  // Return the state variables and the load function
  return { ...apiResult, apiCall };
};

export default useQuery;

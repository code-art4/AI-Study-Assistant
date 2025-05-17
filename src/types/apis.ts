import { AxiosResponse } from 'axios';

// Enum to define allowed HTTP methods
export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'PUT'
}

// Interface to define the options object for useQuery hook
export interface QueryOptions {
    url?: string;
    method?: HttpMethod; // Defaults to GET if not specified
}

// Interface to define the return object of useQuery hook
export interface QueryResult {
    loading: boolean,
    status: 'success' | 'failed',
    error: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
}
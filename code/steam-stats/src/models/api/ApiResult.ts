import { ApiErrorCode } from './ApiErrorCode';

/** Result of an API when successful. */
export interface ApiResultSuccess<Data> {
  status: 200;
  errorCode: undefined;
  errorDescription: undefined;
  data: Data;
}

/** Result of an API when there was a failure. */
export interface ApiResultError {
  status: number;
  errorCode: ApiErrorCode;
  errorDescription: string;
  data: undefined;
}

/** Possible result from an API call. */
export type ApiResult<Data> = ApiResultSuccess<Data> | ApiResultError;

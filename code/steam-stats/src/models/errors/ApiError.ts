import { ApiErrorCode } from '@models/types';

/** An API error that encapsulates the description & status code for the error response. */
export class ApiError extends Error {
  public constructor(
    public readonly status: number,
    public readonly code: ApiErrorCode,
    message: string,
  ) {
    super(message);
  }
}

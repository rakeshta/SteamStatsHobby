import { ApiErrorCode } from '@models/api';

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

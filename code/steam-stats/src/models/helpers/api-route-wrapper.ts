import { NextRequest } from 'next/server';

import { ApiError, ApiErrorCode, ApiResultError, ApiResultSuccess } from '@models/api';

/** An API handler function that handles a request and returns some data. */
export type ApiHandler<Params = Record<string, string>> = (
  request: NextRequest,
  context: { params: Params },
) => Promise<unknown>;

/** NextJS API route function signature. */
export type ApiRoute<Params = Record<string, string>> = (
  request: NextRequest,
  context: { params: Params },
) => Promise<Response>;

/**
 * A wrapper for API routes that takes care of error handling.
 *
 * @param fn The route function to wrap.
 * @returns An enhanced API route function with error handling.
 */
export function apiRouteWrapper<Params = Record<string, string>>(fn: ApiHandler<Params>): ApiRoute<Params> {
  return async (request, context) => {
    try {
      // invoke API and wrap the result in an API result
      const data = await fn(request, context);
      const res = {
        status: 200,
        errorCode: undefined,
        errorDescription: undefined,
        data,
      } satisfies ApiResultSuccess<unknown>;

      return Response.json(res);
    } catch (e) {
      // parse status & error from the exception
      const [status, errorCode, errorDescription] = (() => {
        if (e instanceof ApiError) {
          return [e.status, e.code, e.message];
        } else if (e instanceof Error) {
          return [500, ApiErrorCode.Other, e.message];
        } else {
          return [500, ApiErrorCode.Other, 'Unknown error occurred'];
        }
      })();

      // return error response
      const res = { status, errorCode, errorDescription, data: undefined } satisfies ApiResultError;
      return Response.json(res, { status });
    }
  };
}

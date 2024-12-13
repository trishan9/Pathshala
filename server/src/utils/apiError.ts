export interface APIErrorType {
  statusCode: number;
  message: any;
}

class ApiError extends Error implements APIErrorType {
  statusCode: number;

  constructor(statusCode: number, message: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export { ApiError };

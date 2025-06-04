export interface ISuccessResponseType {
  message: string;
  success: boolean;
  data?: any;
  statusCode: number
}

export interface IErrorResponseType {
  message: string;
  success: boolean;
}

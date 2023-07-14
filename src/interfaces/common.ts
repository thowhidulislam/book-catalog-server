import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

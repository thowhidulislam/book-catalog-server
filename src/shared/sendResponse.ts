import { Response } from 'express';

type IApiResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    success: data.success || true,
    status: data.status || 200,
    message: data.message || 'Success',
    data: data.data || null,
  };
  res.status(data.status).json(responseData);
};

export default sendResponse;

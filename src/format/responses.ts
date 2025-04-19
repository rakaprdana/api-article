export const toAPIResponse = (
  code: number,
  success: boolean,
  message: string,
  data?: string
) => {
  return {
    code: code,
    success: success,
    message: message,
    data: data,
  };
};

import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof AxiosError) {
    message = error.response?.data.message;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Aconteceu algum error!";
  }
  return message;
};

import { ApplicationError } from "protocols";

export function userCreditialsError(): ApplicationError {
  return {
    name:"UserCreditialsError",
    message:"User credentials are wrong."
  };
}
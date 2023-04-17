import { SignInTypes } from "../types/auth.dto";

export default function SignInValidation({ email }: SignInTypes) {
  const errors: { email?: string; password?: string } = {};

  if (!email || email.trim() === "") {
    errors.email = "The Email field is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "The Email field is not a valid Email.";
  }

  return errors;
}

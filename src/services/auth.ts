import { API_URL } from "../configs/constants";
import APIRequest from "../cores/api";
import { SignInTypes } from "../cores/types/auth.dto";

export default async function signInService(data: SignInTypes) {
  return APIRequest({
    url: `${API_URL}/auths/signin`,
    method: "POST",
    data,
  });
}

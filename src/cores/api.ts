import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import qs from "qs";

interface APIRequestProps extends AxiosRequestConfig {
  isAuth?: boolean;
  token?: string;
  params?: object;
  isQueryParamsSerializer?: boolean;
}

export default async function APIRequest({
  isAuth,
  token,
  url,
  method,
  data,
  params,
  isQueryParamsSerializer,
}: APIRequestProps) {
  let headers = {};
  let paramsSerializer;

  // if request from ServerSideProps (token parsed)
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
  } else if (isAuth) {
    // token from cookie
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const jwtToken = atob(cookieToken);
      headers = {
        Authorization: `Bearer ${jwtToken}`,
        Accept: "application/json",
      };
    }
  }

  if (isQueryParamsSerializer) {
    paramsSerializer = (paramsQuery: any) => qs.stringify(paramsQuery);
  }

  const response = await axios({
    url,
    method,
    data,
    headers,
    params,
    paramsSerializer,
  }).catch((error) => error.response);

  if (response.status > 300) {
    const res = {
      ...response,
      error: true,
    };
    return res;
  }

  const res = {
    ...response,
    error: false,
  };

  return res;
}

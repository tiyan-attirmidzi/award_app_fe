import { API_URL } from "../configs/constants";
import APIRequest from "../cores/api";

export default async function getAwardsService(params: object) {
  return APIRequest({
    url: `${API_URL}/awards`,
    isAuth: true,
    params,
  });
}

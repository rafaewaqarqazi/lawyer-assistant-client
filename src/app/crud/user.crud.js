import axios from "axios";

export const GET_ALL_LAWYERS = "/api/users/lawyers/all";

export function getAllLawyers() {
  return axios.get(GET_ALL_LAWYERS);
}
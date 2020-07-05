import axios from "axios";

export const GET_ALL_LAWYERS = "/api/users/lawyers/all";
export const ALLOW_HIRING = '/api/users/lawyers/allow/hiring'
export const HIRE_LAWYER = '/api/users/lawyers/hire'
export function getAllLawyers() {
  return axios.get(GET_ALL_LAWYERS);
}

export const allowHiring = (data) => {
  return axios.put(ALLOW_HIRING, data);
}
export const hireLawyer = data => {
  return axios.put(HIRE_LAWYER, data);
}
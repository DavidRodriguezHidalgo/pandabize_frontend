import axios from "axios";
export const host = 'http://localhost:3001';

const instance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": host,
  },
  baseURL: host,
});

export default instance;

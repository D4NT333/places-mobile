import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim();

console.log("API URL REAL USADA:", API_URL);

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 30000,
});

export default client;
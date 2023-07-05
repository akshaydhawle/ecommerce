import axios from "axios";
import { url } from "../config.json";

interface User {
    name?: string;
    email: string;
    password: string;
}

async function login(data: User) {
  const response = await axios.post(`${url}/login`, data);
  return response.data;
}

async function register(data:User){
    const response = await axios.post(`${url}/register`, data);
    return response.data;
}

export default {
    login,
    register
}


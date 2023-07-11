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

async function getUsers(){
    const response = await axios.get(`${url}/users`);
    return response;
 }

async function deleteUser(id:number){
    const response = await axios.delete(`${url}/users/${id}`);
    return response;
 }

export default {
    login,
    register,
    getUsers,
    deleteUser
}


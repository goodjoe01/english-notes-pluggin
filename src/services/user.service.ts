import axios from 'axios'
import jwt from 'jsonwebtoken'
import { User, Credentials, LoginResponse } from './user.types';

const API = `https://english-vocabulary-api-production-5fb2.up.railway.app/api/users`


export const getUser = () => {
  const data = window.localStorage.getItem('EWToken') as string;
  if(data){
    const user = JSON.parse(data)
    return user;
  }
}

export const login = async (credentials: Credentials) : Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API}/signup`, credentials);
  console.log('login: ', res.data);
  return res.data;
}


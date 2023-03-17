import React , {useState, useEffect, Dispatch} from 'react'
import { login } from '../services/user.service'
import { User, Credentials, LoginResponse } from '../services/user.types'
import {CiLogin} from 'react-icons/ci'

const initialUser: User = {
  id: '',      
  email: '',
  firstName: '',   
  lastName: '',    
  active: false,     
}

const initCredentials: Credentials = {
  email: '',
  password: ''
}

interface SignInFormProps {
  setToken: React.Dispatch<string>
}

const SignInForm = ({setToken}: SignInFormProps) => {
  
  const [credentials, setCredentials] = useState<Credentials>(initCredentials)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginResponse: LoginResponse = await login(credentials); 

    await chrome.storage.sync.set({'EWToken': JSON.stringify(loginResponse)});

    setToken(loginResponse.token);

    setCredentials({email: '', password: ''})
  }
  return (
    <div className='p-4 text-sm'>
      <form onSubmit={handleSignIn} className='flex flex-col gap-2 justify-center'>
        <input 
        className='border rounded-sm p-1 text-gray-500 outline-none'
        id='email'
        name='email'
        type="text" 
        placeholder='email' 
        value={credentials.email}
        onChange={handleChange} 
        />
        <input 
        className='border rounded-sm p-1 text-gray-500 outline-none'
        id='password'
        name='password'
        type="text" 
        placeholder='password' 
        value={credentials.password}
        onChange={handleChange} 
        />
        <div className='flex bg-indigo-500 cursor-pointer px-1 py-2 mt-1 rounded-sm  justify-around text-xl w-[90px]'>
          <CiLogin/>
          <button type='submit' className='text-sm text-white'>Sign In</button>
        </div>
      </form>
  </div>
  )
}

export default SignInForm

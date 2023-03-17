export interface User {
  id: string          
  email: string  
  firstName:string   
  lastName: string    
  active: boolean     
}

export interface Credentials {
  email: string,
  password: string,
}

export interface LoginResponse {
  email: string
  firstName: string
  id: string,
  token: string
}
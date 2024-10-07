export interface SuccessRegister {
  msg: string;
  user: User;
}

interface User {
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

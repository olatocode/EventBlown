/** @format */

export interface IUser{
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  password: string;
  gender: string;
  role: string;
  isVerified: boolean;
}

 export interface Token {
  _id: string;
  role: string;
}

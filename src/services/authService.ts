/** @format */

import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { IUser } from '../interfaces/userInterface';

export class AuthService {
  static async createNewUser(user: IUser): Promise<IUser> {
    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      gender: user.gender,
      role: user.role,
      isVerified: user.isVerified,
    });
    return await newUser.save();
  }

  static async findByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }

  static async comparePassword(plainPassword: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }
}

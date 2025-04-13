import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { createUserModel } from '../Modules/User/user.model';
import AppError from '../ErrorHandlers/AppError';
import catchAsync from '../utils/catchAsync';

const verifyUserOrAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    console.log('Authorization Header:', bearerToken);  // Debugging line
    const token = bearerToken?.split(' ')[1];

    if (!token) {
      console.log('No token found!');  // Debugging line
      throw new AppError(401, 'Unauthorized!');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    } catch (err) {
      console.log('Invalid token:', err);  // Debugging line
      throw new AppError(401, 'Invalid token');
    }

    const { role, email } = decoded;
    console.log('Decoded Token:', decoded);  // Debugging line

    const user = await createUserModel.isUserExistsByCustomId(email);
    if (!user) {
      console.log('User not found!');  // Debugging line
      throw new AppError(404, 'User not found!');
    }

    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      console.log('User is blocked!');  // Debugging line
      throw new AppError(403, 'User is blocked!');
    }

    // Debugging line: Check if the role is admin or if email matches
    if (role !== 'admin' && email !== req.params.email) {
      console.log('Unauthorized access attempt:', req.params.email, 'Logged in as:', email);  // Debugging line
      throw new AppError(403, 'You are not authorized to access this data!');
    }

    (req as any).user = decoded;  // Attach user info to request object
    next();
  }
);

export default verifyUserOrAdmin;

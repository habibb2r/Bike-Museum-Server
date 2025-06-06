import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { createUserModel } from '../Modules/User/user.model';
import AppError from '../ErrorHandlers/AppError';
import catchAsync from '../utils/catchAsync';

const verifyCustomer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(' ')[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;
    const user = await createUserModel.isUserExistsByCustomId(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
    }
    const isBlock = user?.isBlocked;
    const isActive = user?.isActive;
    if (isBlock) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked !');
    }
    if (!isActive) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deactivated !🤦‍♂️');
    }
    if (role === 'user' || role === 'admin') {
      (req as any).user = decoded as JwtPayload & { role: string };
      next();
    } else {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized 😑!');
    }
  },
);

export default verifyCustomer;

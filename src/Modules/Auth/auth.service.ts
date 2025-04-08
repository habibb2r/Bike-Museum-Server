import { TCreateUser } from "../User/user.interface";
import { createUserModel } from "../User/user.model";


const createUserIntoDB = async (userData: TCreateUser) => {
    const res = await createUserModel.create(userData);
    return res;
  };

export const AuthServices = {
    createUserIntoDB,
}
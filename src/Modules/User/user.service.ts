import { createUserModel } from './user.model';

const getAllUserFromDB = async () => {
  const users = await createUserModel.find();
  return users;
};

const getSingleUserFromDB = async (email: string) => {
  const result = await createUserModel.findOne({ email });
  return result;
};

export const UserServices = {
  getAllUserFromDB,
  getSingleUserFromDB
};

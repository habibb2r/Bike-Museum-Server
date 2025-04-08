
  export type TLoginUser = {
    email: string;
    password: string;
  };
  export interface TJwtPayload {
    email:string;
    role:"admin" | "customer";
  }
export enum Role {
  guess = "guess",
  admin = "admin",
}

export interface User {
  username: string;
  password: string;
  role: Role;
  balance: number;
}

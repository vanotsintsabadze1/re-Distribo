export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export enum HttpStatusTypes {
  Success,
  ClientError,
  InternalServerError,
}

export enum UserRole {
  User = "RootUser",
  Employee = "Employee",
  Admin = "Admin",
}

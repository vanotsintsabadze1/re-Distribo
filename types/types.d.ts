interface User {
  id: string;
  email: string;
  emailConfirmed: boolean;
  company: {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
  } | null;
  role: {
    name: "RootUser" | "Employee" | "Admin";
  };
}

interface ResponseError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  code: string;
  traceId?: string;
}

interface ResponseCheckerPayload<T> {
  status: number;
  type: 0 | 1 | 2;
  data: T | ResponseError;
}

interface UserLoginRequest {
  email: string;
  password: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: {
    url: string;
  }[];
}

interface ProductCreationRequest {
  Name: string;
  Description: string;
  Price: number;
  Stock: number;
  ImageFiles: File[];
}

interface ProductCreationRequestSchema {
  Name: string;
  Description: string;
  Price: string;
  Stock: string;
  ImageFiles: string;
}

interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

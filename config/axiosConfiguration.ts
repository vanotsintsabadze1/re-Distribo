"use server";

import axios, { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "./constants";
import { cookies } from "next/headers";
import { setupCache } from "axios-cache-interceptor";

const instance = axios.create({
  baseURL: API_URL,
});

export const axiosService = setupCache(instance, {
  ttl: 0,
});

export async function invalidateCache(id: string) {
  axiosService.storage.remove(id);
}

declare module "axios" {
  interface AxiosRequestConfig {
    requiresAuth?: boolean;
    hasDefaultHeaders?: boolean;
  }
}

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
  hasDefaultHeaders?: boolean;
}

axiosService.interceptors.request.use(async (config: CustomInternalAxiosRequestConfig) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (config.requiresAuth && token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  if (config.hasDefaultHeaders) {
    config.headers.set("Content-Type", "application/json");
    config.headers.set("Accept", "application/json");
  }

  return config;
});

axiosService.interceptors.response.use((res) => res);

/*
In the snippet above, we have created a new Axios instance called  axiosService  that will be used to make requests to the API. We have also created a new interface called  CustomInternalAxiosRequestConfig  that extends  InternalAxiosRequestConfig  and adds two new properties:  requiresAuth  and  hasDefaultHeaders . 
We have also added an interceptor that will run before every request. This interceptor will check if the request requires authentication and if the user is authenticated, it will add the  Authorization  header to the request. It will also check if the request has default headers and if it does, it will add the  Content-Type  and  Accept  headers to the request. 
Now that we have set up our Axios instance, we can use it to make requests to the API. 
Making Requests to the API 
Now that we have set up our Axios instance, we can use it to make requests to the API. Let's create a new file called  api.ts  in the  scripts/actions/api  directory and add the following code to it.
*/

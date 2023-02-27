import { AxiosError } from 'axios';
// import { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
import { IToken } from '../types/interfaces';
import { authorization, BaseUrl, users } from './constants';
import { $authHost, $host } from './http';
// import { useJwt } from 'react-jwt';

interface IDataUser {
  email?: string;
  password?: string;
  nickname?: string;
  lang?: string;
}

// interface IDataDelete {
//   password: string;
// }

export const updateUser = async (data: IDataUser) => {
  try {
    const response = await $authHost.put<IToken>(`${BaseUrl}/${users}/`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteUser = async () => {
  try {
    const response = await $authHost.delete<{ message: string }>(
      `${BaseUrl}/${users}`,
      // data
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const registrAuthUser = async (
  data: IDataUser,
  action: 'registration' | 'login'
) => {
  try {
    const response = await $host.post<IToken>(
      `${BaseUrl}/${users}/${action}`,
      data,
      {
        withCredentials: true,
      }
    );
    console.log('response', response.data);
    return response.data;
  } catch (e) {
    if (e) {
      console.log(e);
      // return e;
    }
  }
};

export const checkToken = async () => {
  let error;
  try {
    const response = await $authHost.get<IToken>(
      `${BaseUrl}/${users}/${authorization}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    error = (e as AxiosError).message;
    console.log(error);
    // return null;
  }
};

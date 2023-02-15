import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IToken } from '../types/interfaces';
import { authorization, BaseUrl, users } from './constants';
import { $host } from './http';
// import { useJwt } from 'react-jwt';

interface IDataUser {
  email: string;
  password: string;
  nickname?: string;
}

export const updateUser = async (data: IDataUser) => {
  try {
    const response = await axios.put<IToken>(`${BaseUrl}/${users}/`, data, {
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
    const response = await axios.delete(`${BaseUrl}/${users}`, {
      withCredentials: true,
    });
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
    const response = await $host.post<IToken>(`${BaseUrl}/${users}/${action}`, data, {
      withCredentials: true,
    })

    return response.data;

  } catch (e) {
    if (e) {
      console.log(e);
    }
  }
};


export const checkToken = async () => {
  let error;
  try {
    const response = await $host.get<IToken>(
      `${BaseUrl}/${users}/${authorization}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    error = (e as AxiosError).message;
    console.log(error);
    return null;
  }
};

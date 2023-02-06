import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { BaseUrl, users } from './constants';

interface IDataUser {
  email: string;
  userName: string;
}

export const getUser = (id: number) => {
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  const getUs = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/${users}/${id}`);
      if (response) {
        setUser(response.data);
      }
    } catch (e) {
      setError((e as AxiosError).message);
    }
  };
  useEffect(() => {
    getUs();
  });

  return { user, error };
};

export const updateUser = async (id: number, data: IDataUser) => {
  try {
    await axios.put(`${BaseUrl}/${users}/${id}`, data);
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${BaseUrl}/${users}/${id}`);
  } catch (e) {
    console.log(e);
  }
};

export const createUser = async (id: number, data: IDataUser) => {
  try {
    await axios.post(`${BaseUrl}/${users}/${id}`, data);
  } catch (e) {
    console.log(e);
  }
};

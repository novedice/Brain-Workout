import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { authorization, BaseUrl, users } from './constants';
import { useJwt } from 'react-jwt';

interface IDataUser {
  email: string;
  password: string;
}

export const getUser = () => {
  const [cookie] = useCookies(['token']);
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  const getUs = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/${users}/${cookie}`, {
        withCredentials: true,
      });
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

export const updateUser = async (data: IDataUser) => {
  const [cookie] = useCookies(['token']);
  try {
    await axios.put(`${BaseUrl}/${users}/${cookie}`, data, {
      withCredentials: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async () => {
  const [cookie] = useCookies(['token']);
  try {
    await axios.delete(`${BaseUrl}/${users}/${users}/${cookie}`, {
      withCredentials: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const registrAuthUser = async (
  data: IDataUser,
  action: 'registration' | 'login'
) => {
  const [token, setToken] = useState();
  const [error, setError] = useState('');
  const { reEvaluateToken } = useJwt('');
  const [, setCookie] = useCookies(['token']);

  try {
    const response = await axios.post(`${BaseUrl}/${users}/${action}`, data, {
      withCredentials: true,
    });
    if (response) {
      setToken(response.data);
      setCookie('token', response.data);
      reEvaluateToken(response.data);
    }
  } catch (e) {
    if (e) {
      setError((e as AxiosError).message);
      return error;
    }
  }
  return token;
};

// export const authorizateUser = async (data: IDataUser) => {
//   const [token, setToken] = useState();
//   const [error, setError] = useState('');
//   try {
//     const response = await axios.post(`${BaseUrl}/${users}/${login}`, data);
//     if (response) {
//       setToken(response.data);
//     }
//   } catch (e) {
//     if (e) {
//       setError((e as AxiosError).message);
//       return error;
//     }
//   }
//   return token;
// };
interface ICookie {
  token?: string;
}

export const refreshToken = async (cookie: ICookie) => {
  // const [newToken, setNewToken] = useState();
  // const [error, setError] = useState('');
  // const [cookie, setCookie] = useCookies(['token']);
  let response;
  let error;
  try {
    response = await axios.get(
      `${BaseUrl}/${users}/${authorization}/${cookie}`,
      { withCredentials: true }
    );
    console.log('response', response);
    // if (response) {

    //   // setNewToken(response.data);
    //   // setCookie('token', response.data);
    // }
  } catch (e) {
    error = (e as AxiosError).message;
    console.log(error);
    return error;
  }
  return response.data;
};

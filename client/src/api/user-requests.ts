import axios, { AxiosError } from 'axios';
// import { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
import { IToken } from '../types/interfaces';
import { authorization, BaseUrl, users } from './constants';
import { $host } from './http';
// import { useJwt } from 'react-jwt';

interface IDataUser {
  email: string;
  password: string;
  nickname?: string;
}

// export const getUser = () => {
//   const [cookie] = useCookies(['token']);
//   const [user, setUser] = useState();
//   const [error, setError] = useState('');
//   const getUs = async () => {
//     try {
//       const response = await axios.get(`${BaseUrl}/${users}/${cookie}`, {
//         withCredentials: true,
//       });
//       if (response) {
//         setUser(response.data);
//       }
//     } catch (e) {
//       setError((e as AxiosError).message);
//     }
//   };
//   useEffect(() => {
//     getUs();
//   });

//   return { user, error };
// };

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
  // const [token, setToken] = useState();
  // const [error, setError] = useState('');
  // const { reEvaluateToken } = useJwt('');
  // const [, setCookie] = useCookies(['token']);
  try {
    const response = await $host.post<IToken>(
      `${BaseUrl}/${users}/${action}`,
      data,
      {
        withCredentials: true,
      }
    );
    // const response = await axios.post(`${BaseUrl}/${users}/${action}`, data, {
    //   withCredentials: true,
    // });
    return response.data;

    // if (response) {
    // return response.data
    // setToken(response.data);
    // setCookie('token', response.data);
    // reEvaluateToken(response.data);
    // }
  } catch (e) {
    if (e) {
      // setError((e as AxiosError).message);
      console.log(e);
      // return e;
    }
  }
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

export const checkToken = async () => {
  // const [newToken, setNewToken] = useState();
  // const [error, setError] = useState('');
  // const [cookie, setCookie] = useCookies(['token']);
  let error;
  try {
    const response = await $host.get<IToken>(
      `${BaseUrl}/${users}/${authorization}`,
      { withCredentials: true }
    );
    return response.data;
    // if (response) {

    //   // setNewToken(response.data);
    //   // setCookie('token', response.data);
    // }
  } catch (e) {
    error = (e as AxiosError).message;
    console.log(error);
    return null;
  }
};

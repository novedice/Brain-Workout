import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { authorization, BaseUrl, users } from './constants';
import { useJwt } from 'react-jwt';

interface IDataUser {
  email: string;
  password: string;
}

const [cookie, setCookie] = useCookies(['token']);

export const getUser = () => {
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
  try {
    await axios.put(`${BaseUrl}/${users}/${cookie}`, data, {
      withCredentials: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async () => {
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

export const refreshToken = async () => {
  const [newToken, setNewToken] = useState();
  const [error, setError] = useState('');
  try {
    const response = await axios.get(
      `${BaseUrl}/${users}/${authorization}/${cookie}`,
      { withCredentials: true }
    );
    if (response) {
      setNewToken(response.data);
      setCookie('token', response.data);
    }
  } catch (e) {
    setError((e as AxiosError).message);
    return error;
  }
  return newToken;
};

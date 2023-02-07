import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IResData } from '../types/interfaces';
import { BaseUrl, results, users } from './constants';

const [cookie] = useCookies(['token']);

export const getUserResults = () => {
  const [userResults, setUserResults] = useState();
  const [resError, setResError] = useState('');
  const fetchResults = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/${users}/${results}/${cookie}`,
        { withCredentials: true }
      );
      setUserResults(response.data);
    } catch (e) {
      setResError((e as AxiosError).message);
    }
  };
  useEffect(() => {
    fetchResults();
  });
  return { userResults, resError };
};

export const createResult = async (resData: IResData) => {
  try {
    axios.post(`${BaseUrl}/${users}/${results}/${cookie}`, resData, {
      withCredentials: true,
    });
  } catch (e) {
    console.log(e);
  }
  // try {
  //   axios({
  //     method: 'post',
  //     url: `${BaseUrl}/${users}/${results}`,
  //     auth: {
  //       username: '',
  //       password: '',
  //     },
  //     data: resData,
  //   });
  // } catch (e) {}
};

// export const deleteResults = async (id: number) => {
//   try {
//     axios.delete(`${BaseUrl}/${results}/${id}`);
//   } catch (e) {
//     console.log(e);
//   }
// };

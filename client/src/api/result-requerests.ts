import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { BaseUrl, results } from './constants';

interface IResData {}

export const getUserResults = (id: number) => {
  const [userResults, setUserResults] = useState();
  const [resError, setResError] = useState('');
  const fetchResults = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/${id}/${results}`);
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

export const updateResult = async (
  id: number,
  resData: IResData,
  game: string
) => {
  try {
    axios.put(`${BaseUrl}/${id}/${game}/${results}`, resData);
  } catch (e) {
    console.log(e);
  }
};

export const deleteResults = async (id: number) => {
  try {
    axios.delete(`${BaseUrl}/${results}/${id}`);
  } catch (e) {
    console.log(e);
  }
};

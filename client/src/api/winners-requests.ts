import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { BaseUrl, winners } from './constants';

interface IWinnerData {
  winnerName: string;
  bestTime: number;
  bestScore: number;
  gameName: string;
}

export const getWinners = (gameName: string) => {
  const [allWinners, setAllWinners] = useState();
  const [winEr, setWinEr] = useState('');

  const fetchWinners = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/${gameName}/${winners}`);
      setAllWinners(response.data);
    } catch (e) {
      setWinEr((e as AxiosError).message);
    }
  };
  useEffect(() => {
    fetchWinners();
  });
  return { allWinners, winEr };
};

export const createWinner = async (
  gameName: string,
  winnerData: IWinnerData
) => {
  try {
    await axios.post(`${BaseUrl}/${gameName}`, winnerData);
  } catch (e) {
    console.log(e);
  }
};

export const deleteWinner = async (winnerName: string) => {
  try {
    await axios.delete(`${BaseUrl}/${winners}/${winnerName}`);
  } catch (e) {
    console.log(e);
  }
};

export const updateWinner = async (
  gameName: string,
  winnerData: IWinnerData
) => {
  try {
    await axios.put(`${BaseUrl}/${winners}`, winnerData);
  } catch (e) {
    console.log(e);
  }
};

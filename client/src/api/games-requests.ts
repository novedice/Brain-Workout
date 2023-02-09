import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { BaseUrl, game } from './constants';

interface IGameData {
  gameName: string;
  category: string;
}

export const getGames = () => {
  const [allGames, setAllGames] = useState();
  const [gamesEr, setGamesEr] = useState('');

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/${game}`);
      setAllGames(response.data);
    } catch (e) {
      setGamesEr((e as AxiosError).message);
    }
  };

  useEffect(() => {
    fetchGames();
  });
  return { allGames, gamesEr };
};

export const updateGames = async (gameData: IGameData) => {
  try {
    await axios.put(`${BaseUrl}/${game}`, gameData);
  } catch (e) {
    console.log(e);
  }
};

export const deleteGame = async (gameName: string) => {
  try {
    await axios.delete(`${BaseUrl}/${game}/${gameName}`);
  } catch (e) {
    console.log(e);
  }
};

export const createGame = async (gameData: IGameData) => {
  try {
    await axios.post(`${BaseUrl}/${game}`, gameData);
  } catch (e) {
    console.log(e);
  }
};

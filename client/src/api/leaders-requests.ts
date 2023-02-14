import axios from "axios";
import { ILeader } from "../types/interfaces";
import { BaseUrl, game, leaders } from "./constants";

export const getLeaders = async (gameId: number, sort: 'ASC' | 'DESC' = 'ASC', limit?: number, page?: number) => {
  try {
    const response = await axios.get<ILeader[]>(`${BaseUrl}/${game}/${gameId}/${leaders}?sort=${sort}&limit=${limit}&page=${page}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
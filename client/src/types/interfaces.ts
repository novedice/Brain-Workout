import { ReactElement } from 'react';

export interface IUser {
  id?: number;
  nickname: string;
  lang: string;
  loggedIn: boolean;
  email?: string;
  alwaysSignIn?: boolean;
}

export interface IToken {
  token: string;
}

export interface IGame {
  gameId: number;
  category: string;
  gameName: string;
  valueType: string;
}

export interface ICategory {
  id: number;
  category: string;
  userId?: number;
}

export interface IResult {
  value: number;
  createdAt: Date;
  gameId: number;
}

export interface IResults {
  // id: number;
  gameId: number;
  gameName: string;
  // valueType: string;
  results: IResult[];
}

export interface IResData {
  gameId: number;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
}

export interface IColorMeaning {
  color: string;
  meaning: string;
  border: string;
}

export interface ILeader {
  id: number;
  nickname: string;
  value: number;
}

export type QParam = {
  CurrentGame: string;
};

export type QparamWorkout = {
  gameNumber: string;
};

export interface IGameList {
  id: number;
  name: ReactElement;
  path: string;
  category: string;
  categoryName: ReactElement;
  gameDescription?: string;
  srcEn?: string;
  srcRus?: string;
  game: ({ gameId }: IGameProps) => JSX.Element;
}

export interface ICardSpeedMacth {
  src: string;
  name: string;
}

export interface ICategories {
  category: string;
  categoryName: ReactElement;
}

export interface IGameProps {
  gameName: string;
  gameId: number;
  gameDescription?: string;
  srcRus?: string;
  srcEn?: string;
}

export interface IOrderedArray {
  bestScore: number;
  gameId: number;
  gameName: ReactElement;
  results: {
    value: number;
    createdAt: string;
  }[];
}

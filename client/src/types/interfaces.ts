import { ReactElement } from 'react';

export interface IUser {
  id?: number;
  nickname: string;
  language: string;
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
  userId: number;
}

export interface IResult {
  id: number;
  userId: string;
  value: number;
  createdDate: Date;
}

export interface IResults {
  gameId: number;
  gameName: string;
  valueType: string;
  result: IResult[];
}

export interface IResData {
  gameId: number;
  value: number;
}

export interface IColorMeaning {
  color: string;
  meaning: string;
  border: string;
}

export interface ILeader {
  id: number;
  nickname: string;
  result: number;
}

export type QParam = {
  CurrentGame: string;
};

export interface IGameList {
  id: number,
  name: ReactElement;
  path: string;
  category: string;
  categoryName: ReactElement;
  game: () => JSX.Element;
}

export interface ICardSpeedMacth {
  src: string;
  name: string;
}

export interface ICategories {
  category: string;
  categoryName: ReactElement;
}

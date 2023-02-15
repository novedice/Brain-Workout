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
  gameID: number;
  category: string;
  gameName: string;
  valueType: string;
}

export interface ICategory {
  id: number;
  category: string;
  userID: number;
}

export interface IResult {
  id: number;
  userID: string;
  value: number;
  createdDate: Date;
}

export interface IResults {
  gameID: number;
  gameName: string;
  valueType: string;
  result: IResult[];
}

export interface IResData {
  gameID: number;
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

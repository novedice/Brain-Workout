export interface ISession {
  id: number;
  userID: number;
  token: string;
}

export interface IUser {
  id: number;
  nickName: string;
  language: 'en' | 'rus';
  loggedIn: boolean;
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

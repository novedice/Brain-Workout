// import axios from "axios";
import { ILeader } from '../types/interfaces';
import { BaseUrl, game, leaders } from './constants';
import { $authHost } from './http';

export const getLeaders = async (gameId: number) => {
  try {
    const response = await $authHost.get<ILeader[]>(
      `${BaseUrl}/${game}/${gameId}/${leaders}`,
      {
        withCredentials: true,
      }
    );
    console.log('leaders in request:', response);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

//   try {
//     const response = await $host.get<IResultResponse[]>(
//       `${BaseUrl}/${users}/${results}`,
//       { withCredentials: true }
//     );
//     return response.data;
//   } catch (e) {
//     console.log(e);
//   }
// };

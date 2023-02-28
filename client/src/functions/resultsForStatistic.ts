import { IResultResponse } from '../api/result-requerests';
import { allGames } from '../game-content/allGames';
import { IOrderedArray } from '../types/interfaces';

export const resultsForStatistic = (results: IResultResponse[]) => {
  const orderedArray: IOrderedArray[] = [];
  for (let i = 0; i < allGames.length; i++) {
    orderedArray.push({
      gameId: allGames[i].id,
      gameName: allGames[i].name,
      bestScore: 0,
      results: [],
    });
    for (let result of results) {
      if (result.gameId === allGames[i].id) {
        orderedArray[i].results.push({
          value: result.value,
          createdAt: result.createdAt,
        });
        if (result.gameId === 1 || result.gameId === 11) {
          orderedArray[i].bestScore =
            orderedArray[i].bestScore < result.value
              ? orderedArray[i].bestScore === 0
                ? result.value
                : orderedArray[i].bestScore
              : result.value;
        } else {
          orderedArray[i].bestScore =
            orderedArray[i].bestScore < result.value
              ? result.value
              : orderedArray[i].bestScore;
        }
      }
    }
  }
  return orderedArray;
};

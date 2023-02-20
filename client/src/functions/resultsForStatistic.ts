import { IResultResponse } from '../api/result-requerests';
import { allGames } from '../game-content/allGames';
import { IOrderedArray } from '../types/interfaces';
// import CATEGORIES from '../game-content/game-categories';

export const resultsForStatistic = (results: IResultResponse[]) => {
  const orderedArray: IOrderedArray[] = [];
  for (let i = 0; i < allGames.length; i++) {
    orderedArray.push({
      gameId: i + 1,
      gameName: allGames[i].name,
      bestScore: 0,
      results: [],
    });
    for (let result of results) {
      if (result.gameId === i + 1) {
        orderedArray[i].results.push({
          value: result.value,
          createdAt: result.createdAt,
        });
        orderedArray[i].bestScore =
          orderedArray[i].bestScore > result.value
            ? orderedArray[i].bestScore
            : result.value;
      }
    }
  }
  return orderedArray;
};

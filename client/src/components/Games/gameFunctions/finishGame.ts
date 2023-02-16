import { createResult } from '../../../api/result-requerests';
import { ADD_RESULT } from '../../../constants';
import { useAppDispatch } from '../../../hooks/useTypeSelector';

export const writeResults = async (
  gameId: number,
  score: number,
  gameName: string
) => {
  const dispatch = useAppDispatch();
  const result = await createResult({ gameId: gameId, value: score });
  if (result) {
    console.log('res', result);
  }
  // for (let userResult of userResults) {
  // if (userResult.gameId === result.gameId) {
  dispatch({
    payload: {
      gameId: result?.gameId,
      gameName: gameName,
      result: { value: result?.value, createdAt: result?.createdAt },
    },
    type: ADD_RESULT,
  });
  // if (userResults) {
  // setCurUserRes(userResults);
  // }
  // }
  // }
  // console.log('userRes', userResults);
  // }
};

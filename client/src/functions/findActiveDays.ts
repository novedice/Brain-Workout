import { IResultResponse } from '../api/result-requerests';

export const findActiveDays = (results: IResultResponse[]) => {
  const activeDates: string[] = [];

  for (let result of results) {
    const currentDay = new Date(result.createdAt).toDateString();

    if (!activeDates.includes(currentDay)) {
      activeDates.push(currentDay);
    }
  }
  return activeDates;
};

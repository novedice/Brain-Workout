import { IColorMeaning } from '../types/interfaces';
import { getRandom } from './random';

export const colors: IColorMeaning[] = [
  { color: 'text-red-500', meaning: 'red', border: 'border-red-500' },
  { color: 'text-blue-500', meaning: 'blue', border: 'border-blue-500' },
  { color: 'text-yellow-500', meaning: 'yellow', border: 'border-yellow-500' },
  { color: 'text-black', meaning: 'black', border: 'border-black' },
];

export const randomColor = () => {
  return colors[getRandom(0, colors.length) - 1];
};

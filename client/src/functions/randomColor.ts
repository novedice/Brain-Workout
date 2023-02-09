import { IColorMeaning } from '../types/interfaces';
import { getRandom } from './random';

export const colors: IColorMeaning[] = [
  { color: 'text-red-500', meaning: 'red' },
  { color: 'text-blue-500', meaning: 'blue' },
  { color: 'text-yellow-500', meaning: 'yellow' },
  { color: 'text-green-500', meaning: 'green' },
  { color: 'text-black', meaning: 'black' },
];

export const randomColor = () => {
  return colors[getRandom(0, colors.length) - 1];
};

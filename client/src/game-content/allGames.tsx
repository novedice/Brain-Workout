import { MeaningColorGame } from '../components/Games/meaningColor';
import { IGameList } from '../types/interfaces';

export const allGames: IGameList[] = [
  {
    name: 'Reaction Time',
    path: 'reaction-time',
    category: 'Speed',
    game: () => {
      return <></>;
    },
  },
  {
    name: 'Sequence Memory',
    path: 'sequence-memory',
    category: 'Memory',
    game: () => {
      return <></>;
    },
  },
  {
    name: 'Aim Trainer',
    path: 'aim-trainer',
    category: 'Speed',
    game: () => {
      return <></>;
    },
  },
  {
    name: 'Chimp test',
    path: 'chimp-test',
    category: 'Problem solving',
    game: () => {
      return <></>;
    },
  },

  {
    name: 'Number Memory',
    path: 'number-memory',
    category: 'Memory',
    game: () => {
      return <></>;
    },
  },
  {
    name: 'Verbal Memory',
    path: 'verbal-memory',
    category: 'Memory',
    game: () => {
      return <></>;
    },
  },
  {
    name: 'Visual memory',
    path: 'visual-memory',
    category: 'Memory',
    game: () => {
      return <></>;
    },
  },
  {
    name: 'Typing',
    path: 'typing',
    category: 'Speed',
    game: () => {
      return <></>;
    },
  },
  {
    name: 'Pixel logic',
    path: 'pixel-logic',
    category: 'Problem solving',
    game: () => {
      return <></>;
    },
  },
  {
    name: 'Color Match',
    path: 'color-match',
    category: 'Flexibility',
    game: MeaningColorGame,
  },
];

import { FormattedMessage } from 'react-intl';
import { MeaningColorGame } from '../components/Games/meaningColor/meaningColor';
import NumberMemory from '../components/Games/numberMemory/NumberMemory';
import { ReactionTime } from '../components/Games/ReactionTime/ReactionTime';
import { SpeedMatchGame } from '../components/Games/SpeedMatch/SpeedMatchGame';
import { MemoryGame } from '../components/MemoryGame/MemoryGame';
import { IGameList, IGameProps } from '../types/interfaces';

export const allGames: IGameList[] = [
  {
    id: 1,
    name: <FormattedMessage id="reaction_time" />,
    path: 'reaction-time',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    game: ReactionTime,
  },
  {
    id: 2,
    name: <FormattedMessage id="sequence_memory" />,
    path: 'sequence-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: ({ gameId, gameName }: IGameProps) => {
      return (
        <>
          {gameId}
          {gameName}
        </>
      );
    },
  },
  {
    id: 3,
    name: <FormattedMessage id="aim_trainer" />,
    path: 'aim-trainer',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    game: ({ gameId, gameName }: IGameProps) => {
      return (
        <>
          {gameId}
          {gameName}
        </>
      );
    },
  },
  {
    id: 4,
    name: <FormattedMessage id="chimp_test" />,
    path: 'chimp-test',
    category: 'problem_solving',
    categoryName: <FormattedMessage id="problem_solving" />,
    game: ({ gameId, gameName }: IGameProps) => {
      return (
        <>
          {gameId}
          {gameName}
        </>
      );
    },
  },

  {
    id: 5,
    name: <FormattedMessage id="number_memory" />,
    path: 'number-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: NumberMemory,
  },
  {
    id: 6,
    name: <FormattedMessage id="verbal_memory" />,
    path: 'verbal-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: ({ gameId, gameName }: IGameProps) => {
      return (
        <>
          {gameId}
          {gameName}
        </>
      );
    },
  },
  {
    id: 7,
    name: <FormattedMessage id="visual_memory" />,
    path: 'visual-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: ({ gameId, gameName }: IGameProps) => {
      return (
        <>
          {gameId}
          {gameName}
        </>
      );
    },
  },
  {
    id: 8,
    name: <FormattedMessage id="typing" />,
    path: 'typing',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    game: ({ gameId, gameName }: IGameProps) => {
      return (
        <>
          {gameId}
          {gameName}
        </>
      );
    },
  },
  {
    id: 9,
    name: <FormattedMessage id="pixel_logic" />,
    path: 'pixel-logic',
    category: 'problem_solving',
    categoryName: <FormattedMessage id="problem_solving" />,
    game: ({ gameId, gameName }: IGameProps) => {
      return (
        <>
          {gameId}
          {gameName}
        </>
      );
    },
  },
  {
    id: 10,
    name: <FormattedMessage id="color_match" />,
    path: 'color-match',
    category: 'flexibility',
    categoryName: <FormattedMessage id="flexibility" />,
    game: MeaningColorGame,
  },
  {
    id: 11,
    name: <FormattedMessage id="memory_game" />,
    path: 'memory-game',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: MemoryGame,
  },
  {
    id: 12,
    name: <FormattedMessage id="speed_match" />,
    path: 'speed-match',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    game: SpeedMatchGame,
  },
];

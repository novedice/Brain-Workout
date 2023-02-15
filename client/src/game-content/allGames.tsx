import { FormattedMessage } from 'react-intl';
import { MeaningColorGame } from '../components/Games/meaningColor/meaningColor';
import { SpeedMatchGame } from '../components/Games/SpeedMatch/SpeedMatchGame';
import { MemoryGame } from '../components/MemoryGame/MemoryGame';
import { IGameList } from '../types/interfaces';

export const allGames: IGameList[] = [
  {
    name: <FormattedMessage id="reaction_time" />,
    path: 'reaction-time',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    game: () => {
      return <></>;
    },
  },
  {
    name: <FormattedMessage id="sequence_memory" />,
    path: 'sequence-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: () => {
      return <></>;
    },
  },
  {
    name: <FormattedMessage id="aim_trainer" />,
    path: 'aim-trainer',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    game: () => {
      return <></>;
    },
  },
  {
    name: <FormattedMessage id="chimp_test" />,
    path: 'chimp-test',
    category: 'problem_solving',
    categoryName: <FormattedMessage id="problem_solving" />,
    game: () => {
      return <></>;
    },
  },

  {
    name: <FormattedMessage id="number_memory" />,
    path: 'number-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: () => {
      return <></>;
    },
  },
  {
    name: <FormattedMessage id="verbal_memory" />,
    path: 'verbal-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: () => {
      return <></>;
    },
  },
  {
    name: <FormattedMessage id="visual_memory" />,
    path: 'visual-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: () => {
      return <></>;
    },
  },
  {
    name: <FormattedMessage id="typing" />,
    path: 'typing',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    game: () => {
      return <></>;
    },
  },
  {
    name: <FormattedMessage id="pixel_logic" />,
    path: 'pixel-logic',
    category: 'problem_solving',
    categoryName: <FormattedMessage id="problem_solving" />,
    game: () => {
      return <></>;
    },
  },
  {
    name: <FormattedMessage id="color_match" />,
    path: 'color-match',
    category: 'flexibility',
    categoryName: <FormattedMessage id="flexibility" />,
    game: MeaningColorGame,
  },
  {
    name: <FormattedMessage id="memory_game" />,
    path: 'memory-game',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: MemoryGame,
  },
  {
    name: <FormattedMessage id="speed_match" />,
    path: 'speed-match',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    game: SpeedMatchGame,
  },
];

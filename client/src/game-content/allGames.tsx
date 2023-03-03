import { FormattedMessage } from 'react-intl';
import { MeaningColorGame } from '../components/Games/meaningColor/meaningColor';
import NumberMemory from '../components/Games/numberMemory/NumberMemory';
import { ReactionTime } from '../components/Games/ReactionTime/ReactionTime';
import SequenceMemory from '../components/Games/sequenceMemory/SequenceMemory';
import { SpeedMatchGame } from '../components/Games/SpeedMatch/SpeedMatchGame';
import { TypingSpeed } from '../components/Games/TypingSpeed/TypingSpeed';
import { MemoryGame } from '../components/MemoryGame/MemoryGame';
import { IGameList, IGameProps } from '../types/interfaces';
import '../assets/games-pictures/color-match-ru.png';
import '../assets/games-pictures/color-match-en.png';
import '../assets/games-pictures/memory-game-ru.png';
import '../assets/games-pictures/memory-game-en.png';
import '../assets/games-pictures/number-memory-ru.png';
import '../assets/games-pictures/number-memory-en.png';
import '../assets/games-pictures/sequence-memory-ru.png';
import '../assets/games-pictures/sequence-memory-en.png';
import '../assets/games-pictures/speed-match-ru.png';
import '../assets/games-pictures/speed-match-en.png';
import '../assets/games-pictures/typing-speed-ru.png';
import '../assets/games-pictures/typing-speed-en.png';
import '../assets/games-pictures/reaction-time-en.png';
import '../assets/games-pictures/work-in-progress.png';
import '../assets/games-pictures/work-in-progress-2.png';

export const allGames: IGameList[] = [
  {
    id: 1,
    name: <FormattedMessage id="reaction_time" />,
    path: 'reaction-time',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    gameDescription: 'reaction_time_description',
    srcEn: 'reaction-time-en.png',
    game: ReactionTime,
  },
  {
    id: 2,
    name: <FormattedMessage id="sequence_memory" />,
    path: 'sequence-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    srcEn: 'sequence-memory-en.png',
    srcRus: 'sequence-memory-en.png',
    game: SequenceMemory,
  },

  {
    id: 5,
    name: <FormattedMessage id="number_memory" />,
    path: 'number-memory',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    game: NumberMemory,
    srcEn: 'number-memory-en.png',
    srcRus: 'number-memory-en.png',
  },

  {
    id: 8,
    name: <FormattedMessage id="typing" />,
    path: 'typing',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    game: TypingSpeed,
    srcEn: 'typing-speed-en.png',
    srcRus: 'typing-speed-en.png',
  },
  {
    id: 10,
    name: <FormattedMessage id="color_match" />,
    path: 'color-match',
    category: 'flexibility',
    categoryName: <FormattedMessage id="flexibility" />,
    gameDescription: 'This game improve your flexibility.',
    srcRus: 'color-match-en.png',
    srcEn: 'color-match-en.png',
    game: MeaningColorGame,
  },
  {
    id: 11,
    name: <FormattedMessage id="memory_game" />,
    path: 'memory-game',
    category: 'memory',
    categoryName: <FormattedMessage id="memory" />,
    srcEn: 'memory-game-en.png',
    srcRus: 'memory-game-en.png',
    game: MemoryGame,
  },
  {
    id: 12,
    name: <FormattedMessage id="speed_match" />,
    path: 'speed-match',
    category: 'speed',
    categoryName: <FormattedMessage id="speed" />,
    srcEn: 'speed-match-en.png',
    srcRus: 'speed-match-en.png',
    game: SpeedMatchGame,
  },

  {
    id: 3,
    name: <FormattedMessage id="aim_trainer" />,
    path: 'Aim-trainer',
    category: 'speed',
    srcEn: 'work-in-progress.png',
    srcRus: 'work-in-progress.png',
    categoryName: <FormattedMessage id="speed" />,
    game: ({ gameName }: IGameProps) => {
      return (
        <>
          <div className="prestart-container">
            <div className="name-of-the-game">{gameName}</div>
            <img src="work-in-progress-2.png" className="mb-6 w-56"></img>
            <div className="game-description">
              <FormattedMessage id="game_in_development" />
            </div>
          </div>
        </>
      );
    },
  },
  {
    id: 7,
    name: <FormattedMessage id="visual_memory" />,
    path: 'Visual-memory',
    category: 'memory',
    srcEn: 'work-in-progress.png',
    srcRus: 'work-in-progress.png',
    categoryName: <FormattedMessage id="memory" />,
    game: ({ gameName }: IGameProps) => {
      return (
        <>
          <div className="prestart-container">
            <div className="name-of-the-game">{gameName}</div>
            <img src="work-in-progress-2.png" className="mb-6 w-56"></img>
            <div className="game-description">
              <FormattedMessage id="game_in_development" />
            </div>
          </div>
        </>
      );
    },
  },
  // {
  //   id: 9,
  //   name: <FormattedMessage id="pixel_logic" />,
  //   path: 'Pixel-logic',
  //   category: 'problem_solving',
  //   srcEn: 'work-in-progress.png',
  //   srcRus: 'work-in-progress.png',
  //   categoryName: <FormattedMessage id="problem_solving" />,
  //   game: ({ gameName }: IGameProps) => {
  //     return (
  //       <>
  //         <div className="prestart-container">
  //           <div className="name-of-the-game">{gameName}</div>
  //           <img src="work-in-progress-2.png" className="mb-6 w-56"></img>
  //           <div className="game-description">
  //             <FormattedMessage id="game_in_development" />
  //           </div>
  //         </div>
  //       </>
  //     );
  //   },
  // },
  // {
  //   id: 4,
  //   name: <FormattedMessage id="chimp_test" />,
  //   path: 'Chimp-test',
  //   category: 'problem_solving',
  //   srcEn: 'work-in-progress.png',
  //   srcRus: 'work-in-progress.png',
  //   categoryName: <FormattedMessage id="problem_solving" />,
  //   game: ({ gameName }: IGameProps) => {
  //     return (
  //       <>
  //         <div className="prestart-container">
  //           <div className="name-of-the-game">{gameName}</div>
  //           <img src="work-in-progress-2.png" className="mb-6 w-56"></img>
  //           <div className="game-description">
  //             <FormattedMessage id="game_in_development" />
  //           </div>
  //         </div>
  //       </>
  //     );
  //   },
  // },
  // {
  //   id: 6,
  //   name: <FormattedMessage id="verbal_memory" />,
  //   path: 'Verbal-memory',
  //   category: 'memory',
  //   srcEn: 'work-in-progress.png',
  //   srcRus: 'work-in-progress.png',
  //   categoryName: <FormattedMessage id="memory" />,
  //   game: ({ gameName }: IGameProps) => {
  //     return (
  //       <>
  //         <div className="prestart-container">
  //           <div className="name-of-the-game">{gameName}</div>
  //           <img src="work-in-progress-2.png" className="mb-6 w-56"></img>
  //           <div className="game-description">
  //             <FormattedMessage id="game_in_development" />
  //           </div>
  //         </div>
  //       </>
  //     );
  //   },
  // },
];

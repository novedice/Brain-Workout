import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { colors } from '../../../functions/randomColor';
import { StatusGameType } from '../../../types/types';

interface IHowToPlayProps {
  howToPlay: boolean;
  setHowToPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
}

export const ColorDemo = ({ setHowToPlay, setStatusGame }: IHowToPlayProps) => {
  const [leftColor, setLeftColor] = useState(2);
  const [rightColor, setRightColor] = useState(0);
  const [leftMeaning, setLeftMeaning] = useState(0);
  const [yesNow, setYesNow] = useState<'' | 'right-now' | 'wrong-now'>(
    'right-now'
  );
  const [noNow, setNoNow] = useState<'' | 'right-now' | 'wrong-now'>(
    'wrong-now'
  );
  const [backColor] = useState('');
  const [noDisabled, setNoDisabled] = useState(true);
  const [yesDisabled, setYesDisabled] = useState(false);
  const [startButton, setStartButton] = useState('');
  const [count, setCount] = useState(0);

  const answerDemo = () => {
    setCount(count + 1);
    if (count > 3) {
      setNoNow('');
      setYesNow('');
      setYesDisabled(true);
      setNoDisabled(true);

      setStartButton('right-now');
    } else {
      if (count % 2 === 0) {
        setLeftMeaning(1);
        setRightColor(1);
        setYesNow('right-now');
        setYesDisabled(false);
        setNoDisabled(true);
        setNoNow('wrong-now');
        setLeftColor(2);
      } else {
        setLeftMeaning(3);
        setRightColor(2);
        setLeftColor(0);
        setNoNow('right-now');
        setYesNow('wrong-now');
        setYesDisabled(true);
        setNoDisabled(false);
      }
    }
  };

  return (
    <>
      {' '}
      <>
        <div className="flex h-full flex-col justify-around">
          <div className="how-to-play flex h-2/3 flex-col">
            <p className="mb-5 text-center text-xl text-gray-700">
              <FormattedMessage id="how_to_play" />
            </p>
            <p className="mb-5 text-center text-xl text-blue-900">
              <FormattedMessage id="how_color" />
            </p>
            <div className="inside-wrap flex h-full flex-col justify-center">
              <div className="mb-10 flex justify-center">
                <div
                  className={`left-part mr-5 flex h-[100px] w-[45%] justify-center border-4 ${colors[leftColor].border} align-middle `}
                >
                  <p
                    className={`flex  items-center justify-center text-center text-5xl uppercase ${colors[leftColor].color}`}
                  >
                    <FormattedMessage id={colors[leftMeaning].meaning} />
                  </p>
                </div>
                <div
                  className={`left-part  flex h-[100px] w-[45%] justify-center border-4 ${colors[rightColor].border} align-middle `}
                >
                  <p
                    className={`flex items-center justify-center text-center text-5xl uppercase ${colors[rightColor].color}`}
                  >
                    ----
                  </p>
                </div>
              </div>
              <div className="buttons flex w-[100%] justify-center">
                <button
                  className={`${noNow} no-answ-demo mr-3 h-[50px] w-[80px] rounded-lg border ${backColor} bg-blue-400`}
                  onClick={answerDemo}
                  disabled={noDisabled}
                >
                  <FormattedMessage id="no" />
                </button>
                <button
                  className={`${yesNow} yes-answ-demo h-[50px] w-[80px] rounded-lg border ${backColor} bg-blue-400`}
                  onClick={answerDemo}
                  disabled={yesDisabled}
                >
                  <FormattedMessage id="yes" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setHowToPlay(false);
              setStatusGame('Started');
            }}
            className={` ${startButton} mr-3 h-[50px] w-[150px] self-center rounded-lg border bg-red-400`}
          >
            <FormattedMessage id="start_game" />
          </button>
        </div>
      </>
    </>
  );
};

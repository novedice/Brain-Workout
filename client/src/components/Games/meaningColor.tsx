import { useState } from 'react';
import { getRandom } from '../../functions/random';
import { colors } from '../../functions/randomColor';
// import { IColorMeaning } from '../../types/interfaces';

export const MeaningColorGame = () => {
  const [leftColor, setLeftColor] = useState(0);
  const [leftMeaningColor, setLeftMeaninfColor] = useState(0);
  const [rightColor, setRightColor] = useState(0);
  const [rightMeaningColor, setRightMeamingColor] = useState(0);
  const [score, setScore] = useState(0);

  const changeColors = () => {
    setLeftColor(getRandom(0, colors.length - 1));
    setLeftMeaninfColor(getRandom(0, colors.length - 1));
    setRightColor(getRandom(0, colors.length - 1));
    setRightMeamingColor(getRandom(0, colors.length - 1));
    // console.log('leftColor', colors[leftColor]);
    // console.log('rightColor', colors[rightColor]);
    // console.log('leftMeaningColor', colors[leftMeaningColor]);
    // console.log('rightMeaningColor', colors[rightMeaningColor]);
  };
  const noAnswer = () => {
    if (leftMeaningColor !== rightColor) {
      setScore((prev) => (prev += 100));
    }
    changeColors();
  };
  const yesAnswer = () => {
    if (leftMeaningColor === rightColor) {
      setScore((prev) => (prev += 100));
    }
    changeColors();
  };

  return (
    <>
      <div className="game-wrapper w-full border">
        <div className="head-game">
          <p>SCORE: {score}</p>
        </div>
        <div className="inside-wrap flex justify-around">
          <div className="left-part flex justify-center border align-middle ">
            <p
              className={`flex justify-center align-middle text-5xl uppercase ${colors[leftColor].color}`}
            >
              {colors[leftMeaningColor].meaning}
            </p>
          </div>
          <div className={`left-part flex justify-center border align-middle `}>
            <p
              className={`flex justify-center align-middle text-5xl uppercase ${colors[rightColor].color}`}
            >
              {colors[rightMeaningColor].meaning}
            </p>
          </div>
        </div>
        <div className="buttons flex w-[100%] justify-around">
          <button onClick={noAnswer}>NO</button>
          <button onClick={yesAnswer}>YES</button>
        </div>
      </div>
    </>
  );
};

// import { useState, useRef } from 'react';
// import { Word } from './Word';

// export function TypingSpeed() {
//   const getContent = () =>
//     'cloud javascrit scc angular vue redux react'.split(' ');
//   // .sort(() => (Math.random() > 0.5 ? 1 : -1));

//   const [userInput, setUserInput] = useState('');
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [currentWordIndex, setСurrentWordIndex] = useState(0);
//   const [correctWordsArray, setСorrectWordsArray] = useState<string[]>([]);
//   const content = useRef(getContent());

//   const inputValue = (value: string) => {
//     if (value.endsWith(' ')) {
//       setСurrentWordIndex((index) => index + 1);
//       setUserInput('');

//       setСorrectWordsArray((data) => {
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         const word = value.trim();
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         const newResult: string[] = [...data];
//         newResult[currentWordIndex] = newResult[currentWordIndex] =
//           content.current[currentWordIndex];
//         return newResult;
//       });
//       // // const word = value.trim();
//       // if (word === content.current[currentWordIndex]) {
//       //   setСorrectWordsArray((data) => {
//       //     const newResult: string[] = [...data];
//       //     newResult[currentWordIndex] = true
//       //     return newResult;
//       //   });
//       // }
//     } else {
//       setUserInput(value);
//     }
//   };

//   return (
//     <div>
//       <h1>Typing Speed Test</h1>
//       <h3>How many words per minute can you type?</h3>
//       <p>
//         {content.current.map((word, index) => {
//           return (
//             <Word
//               text={word}
//               active={index === currentWordIndex}
//               correct={correctWordsArray[index]}
//             />
//           );
//         })}
//       </p>
//       <input
//         type="text"
//         name=""
//         id=""
//         className="border"
//         value={userInput}
//         onChange={(event) => inputValue(event?.target.value)}
//       />
//     </div>
//   );
// }

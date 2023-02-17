import { useState, useRef } from 'react';

export function TypingSpeed() {
  const getContent = () =>
    'cloud javascrit scc angular vue redux react'
      .split(' ')
      .sort(() => (Math.random() > 0.5 ? 1 : -1));

  const [userInput, setUserInput] = useState('');
  const content = useRef(getContent());

  return (
    <div>
      <h1>Typing Speed Test</h1>
      <h3>How many words per minute can you type?</h3>
      <p>{content.current.join(' ')}</p>
      <input
        type="text"
        name=""
        id=""
        className="border"
        value={userInput}
        onChange={(event) => setUserInput(event?.target.value)}
      />
    </div>
  );
}

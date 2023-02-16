// export function TypingSpeed() {
//   return <p>TypingSpeed</p>;
// }
interface IState {
  type: string;
  content: Array<string>;
}
export function TypingSpeed() {
  const state: IState = {
    type: 'e2ndunmund udu2nun unu 2d2d2',
    content: [],
  };
  return (
    <div>
      <h1>Typing Speed Test</h1>
      <h3>How many words per minute can you type?</h3>
      <p>{state.type}</p>
      <input type="text" name="" id="" />
    </div>
  );
}

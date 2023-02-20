import './Word.css';

interface IPropsWord {
  text: string;
  active: boolean;
  correct: string;
}

export function Word({ text, active, correct }: IPropsWord) {
  if (correct) {
    return <span className="correct">{text} </span>;
  }
  if (!correct) {
    return <span className="incorrect">{text} </span>;
  }
  if (active) {
    return <span className="active">{text} </span>;
  }

  return <span>{text} </span>;
}

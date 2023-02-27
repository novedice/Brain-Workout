import { FormattedMessage } from 'react-intl';

interface IButtonStartProps {
  callback: () => void;
  text: string;
}

export const ButtonNumber = ({ callback, text }: IButtonStartProps) => {
  return (
    <>
      <button
        className="number-game__start h-[40px] w-[150px] rounded-lg  bg-blue-300 duration-300 hover:bg-red-200"
        onClick={callback}
      >
        {<FormattedMessage id={text} />}
      </button>
    </>
  );
};

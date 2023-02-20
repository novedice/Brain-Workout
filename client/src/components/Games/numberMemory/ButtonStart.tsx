import { FormattedMessage } from 'react-intl';

interface IButtonStartProps {
  callback: () => void;
  text: string;
}

export const ButtonNumber = ({
  callback,
  text,
}: IButtonStartProps) => {
  return (
    <>
      <button
        className="h-[50px] w-[150px] number-game__start rounded-lg border-8 border-blue-300 bg-gray-200"
        onClick={callback}
      >
        {<FormattedMessage id={text} />}
      </button>
    </>
  );
};

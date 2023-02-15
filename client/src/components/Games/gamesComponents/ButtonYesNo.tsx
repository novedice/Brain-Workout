import { FormattedMessage } from 'react-intl';

interface IButtonYesNoProps {
  val: string;
  callback: () => void;
  disabled: boolean;
}

export const ButtonYesNo = ({ val, callback, disabled }: IButtonYesNoProps) => {
  return (
    <>
      <button
        className="mr-3 h-[50px] w-[80px] rounded-lg border bg-blue-400"
        onClick={callback}
        disabled={disabled}
      >
        <FormattedMessage id={val} />
      </button>
    </>
  );
};

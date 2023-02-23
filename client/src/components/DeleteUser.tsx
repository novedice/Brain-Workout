import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { deleteUser } from '../api/user-requests';
import { styleInput, styleLabel, styleText } from '../constants/styleConstants';

export const DeleteUserBlock = () => {
  const [deleted, setDeleted] = useState(false);
  const [password, setPassword] = useState('');

  const submitDelete = async () => {
    console.log('delete');
    const deleteResponse = await deleteUser();
    if (deleteResponse) {
      console.log('delete response');
      setDeleted(true);
      localStorage.clear();
      console.log(password);
    }
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      {!deleted && (
        <div className="block-changing">
          <div className="mb-8">
            Delete Account By deleting your account, you'll lose all of your
            data, including: Training Progress, History Game Scores and History
          </div>
          <label className={`label__settings ${styleLabel} ${styleText}`}>
            <FormattedMessage id="confirm_password" />
            <input
              type="password"
              name="password"
              className={`mb-1 w-full ${styleInput}`}
              onChange={passwordHandler}
            />
          </label>
          <button
            type="submit"
            className="mb-3 w-[full] rounded-full border bg-blue-400 p-1 px-3 hover:bg-red-200"
            onClick={submitDelete}
          >
            <FormattedMessage id="submit" />
          </button>
        </div>
      )}
      {deleted && <div>Your account was successfully deleted</div>}
    </>
  );
};

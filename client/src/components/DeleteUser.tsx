import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { deleteUser } from '../api/user-requests';
import { LOGOUT, UPDATE_USER } from '../constants';
import { useAppDispatch } from '../hooks/useTypeSelector';

export const DeleteUserBlock = () => {
  const [deleted, setDeleted] = useState(false);
  const dispatch = useAppDispatch();

  const submitDelete = async () => {
    const deleteResponse = await deleteUser();
    if (deleteResponse) {
      setDeleted(true);
      dispatch({ type: LOGOUT });
      dispatch({
        payload: {
          id: 0,
          nickname: '',
          loggedIn: false,
          email: '',
          language: 'en',
          alwaysSignIn: false,
        },
        type: UPDATE_USER,
      });
      localStorage.removeItem('user');
      localStorage.clear();
    }
  };

  return (
    <>
      {!deleted && (
        <div className="block-changing">
          <div className="mb-8">
            <FormattedMessage id="in_case_of_delete" />
          </div>
          <button
            type="submit"
            className="mb-3 w-[full] rounded-full border bg-blue-400 p-1 px-3 hover:bg-red-200"
            onClick={submitDelete}
          >
            <FormattedMessage id="submit_changes" />
          </button>
        </div>
      )}
      {deleted && (
        <div>
          <FormattedMessage id="account_deleted" />
        </div>
      )}
    </>
  );
};

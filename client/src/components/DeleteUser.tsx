import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
// import { redirect } from 'react-router-dom';
import { deleteUser } from '../api/user-requests';
import { LOGOUT, UPDATE_USER } from '../constants';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
// import { styleInput, styleLabel, styleText } from '../constants/styleConstants';

export const DeleteUserBlock = () => {
  const [deleted, setDeleted] = useState(false);
  const dispatch = useAppDispatch();
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  // const [password, setPassword] = useState('');

  const submitDelete = async () => {
    // console.log('delete');
    const deleteResponse = await deleteUser();
    if (deleteResponse) {
      console.log('delete response', deleteResponse);
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
      // dispatch({ type: DELETE_USER });
      // dispatch({ type: LOGOUT });
      console.log('after logout', loggedIn);

      // redirect('/');
      // console.log(password);
    }
  };

  // const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(event.target.value);
  // };

  return (
    <>
      {!deleted && (
        <div className="block-changing">
          <div className="mb-8">
            <FormattedMessage id="in_case_of_delete" />
          </div>
          {/* <label className={`label__settings ${styleLabel} ${styleText}`}>
            <FormattedMessage id="confirm_password_delete" />
            <input
              type="password"
              name="password"
              className={`mt-[10px] mb-4 w-full ${styleInput}`}
              onChange={passwordHandler}
            />
          </label> */}
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

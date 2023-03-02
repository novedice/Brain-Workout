import { ReactElement, SetStateAction, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { updateUser } from '../api/user-requests';
import {
  styleLabel,
  styleText,
  styleInput,
  styleErrorMes,
} from '../constants/styleConstants';
import { isEmailValid } from '../functions/validEmail';
import { isNameValid } from '../functions/validName';
import { isValidPassword } from '../functions/validPassword';
import { isPasswordsEquial } from '../functions/validPasswordConfirm';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
import jwt_decode from 'jwt-decode';
import { IUser } from '../types/interfaces';
import { UPDATE_TOKEN, UPDATE_USER } from '../constants';
import { DeleteUserBlock } from './DeleteUser';
import { setToken } from '../functions/tokenManipulation';

interface IChangeUserDataProps {
  typeOfChanges: '' | 'name' | 'email' | 'password' | 'delete';
  setOpenChanges: React.Dispatch<SetStateAction<boolean>>;
}

export const ChangeUserData = ({
  typeOfChanges,
  setOpenChanges,
}: IChangeUserDataProps) => {
  const user = useTypeSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ReactElement | string>();
  const [value, setValue] = useState<string>('');
  const [confirmValue, setConfirmValue] = useState<string>('');

  const changeComplete = async () => {
    const responseChanges =
      typeOfChanges === 'password'
        ? await updateUser({
            password: value,
          })
        : await updateUser({
            email: typeOfChanges === 'email' ? value : user.email,
            nickname: typeOfChanges === 'name' ? value : user.nickname,
          });

    if (responseChanges) {
      dispatch({
        payload: {
          id: jwt_decode<IUser>(responseChanges.token).id,
          nickname: jwt_decode<IUser>(responseChanges.token).nickname,
          loggedIn: true,
          language: jwt_decode<IUser>(responseChanges.token).lang,
          email: jwt_decode<IUser>(responseChanges.token).email,
          alwaysSignIn: true,
        },
        type: UPDATE_USER,
      });

      dispatch({
        payload: { token: responseChanges.token },
        type: UPDATE_TOKEN,
      });
      setToken(responseChanges.token);

      localStorage.setItem('user', JSON.stringify(user));
      // localStorage.setItem('token', JSON.stringify(responseChanges.token));

      document.cookie = `auth=Bearer ${responseChanges.token}`;
      typeOfChanges = '';
      setOpenChanges(false);
    } else {
      setError(<FormattedMessage id="user_exists" />);
      return;
    }
  };

  const submitChanges = (event: React.FormEvent) => {
    event.preventDefault();
    let numberOfErr = 0;
    setError('');
    switch (typeOfChanges) {
      case 'name':
        let resName = isNameValid(value, numberOfErr);
        setError(resName.err);
        numberOfErr = resName.n;
        if (resName.n === 0 && value === user.nickname) {
          setError(<FormattedMessage id="name_the_same" />);
          numberOfErr += 1;
        }
        break;
      case 'email':
        let resEmail = isEmailValid(value, numberOfErr);
        setError(resEmail.err);
        numberOfErr = resEmail.n;

        break;
      case 'password':
        let resPass = isValidPassword(value, numberOfErr);
        setError(resPass.err);
        numberOfErr = resPass.n;
        if (numberOfErr === 0) {
          let resConfirm = isPasswordsEquial(
            confirmValue as string,
            value,
            numberOfErr
          );
          setError(resConfirm.err);
          numberOfErr = resConfirm.n;
        }
        break;
    }

    if (numberOfErr !== 0) {
      return;
    } else {
      changeComplete();
      return;
    }
  };

  const valueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const confirmValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmValue(event.target.value);
  };

  return (
    <>
      {typeOfChanges === 'delete' && <DeleteUserBlock />}
      {typeOfChanges !== 'delete' && (
        <>
          <div className="block-changing">
            <label className={`label__settings ${styleLabel} ${styleText}`}>
              <FormattedMessage id={`new_${typeOfChanges}`} />
              <input
                type={typeOfChanges === 'name' ? 'text' : typeOfChanges}
                name={typeOfChanges}
                className={`mt-[10px] mb-4 w-full ${styleInput}`}
                onChange={valueHandler}
              />
            </label>
            {typeOfChanges === 'password' && (
              <label className={`label__settings ${styleLabel} ${styleText}`}>
                <FormattedMessage id="confirm_new_password" />
                <input
                  type="password"
                  name="password"
                  className={`mt-[10px] mb-4 w-full ${styleInput}`}
                  onChange={confirmValueHandler}
                />
              </label>
            )}
            {error && <div className={styleErrorMes}>{error}</div>}
            <button
              type="submit"
              className="mb-3 w-[full] rounded-full border bg-blue-400 p-1 px-3 hover:bg-red-200"
              onClick={submitChanges}
            >
              <FormattedMessage id="submit_changes" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

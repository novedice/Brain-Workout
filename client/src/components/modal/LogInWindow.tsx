import React, { ReactElement, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { registrAuthUser } from '../../api/user-requests';
import {
  HIDE_MODAL,
  LOGGIN,
  LOGGINUSER,
  SHOW_SIGNUP,
  UPDATE_USER,
} from '../../constants';
import {
  styleErrorMes,
  styleInput,
  styleLabel,
  styleText,
} from '../../constants/styleConstants';
import { useAppDispatch, useTypeSelector } from '../../hooks/useTypeSelector';
import { IUser } from '../../types/interfaces';
import './ModalWindow.css';
import { FormattedMessage } from 'react-intl';

const LogInWindow = () => {
  const dispatch = useAppDispatch();
  const { openLogInModal } = useTypeSelector((state) => state.logInModal);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordEr, setPasswordEr] = useState<ReactElement | string>('');
  const user: IUser = useTypeSelector((state) => state.userInfo);
  const [checked, setChecked] = useState(true);

  const modalHide = () => {
    dispatch({ type: HIDE_MODAL });
  };

  const signUpModalShow = () => {
    dispatch({ type: SHOW_SIGNUP });
  };

  const loginComplete = async () => {
    const loginResponse = await registrAuthUser(
      { email: email, password: password, lang: user.lang },
      'login'
    );
    if (loginResponse) {
      dispatch({ type: LOGGIN });
      dispatch({
        payload: {
          id: jwt_decode<IUser>(loginResponse.token).id,
          nickname: jwt_decode<IUser>(loginResponse.token).nickname,
          loggedIn: true,
          email: email,
          language: user.lang,
          alwaysSignIn: checked,
        },
        type: UPDATE_USER,
      });
      localStorage.setItem('token', loginResponse.token);

      dispatch({ type: LOGGINUSER });
      modalHide();

      if (checked) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else {
      setPasswordEr(<FormattedMessage id="wrong_password" />);
    }
  };

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordEr('');
    setEmailError('');

    if (!password || !email) {
      setPasswordEr(<p>Please enter your email and password</p>);
      return;
    } else {
      loginComplete();
    }
  };

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const staySignedHandler = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div
        className={openLogInModal ? 'modal active' : 'modal'}
        onClick={() => modalHide()}
      >
        <div
          className={
            openLogInModal
              ? 'modal__content active flex flex-col items-center'
              : 'modal__content flex flex-col items-center'
          }
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="caption_login mb-2">
            <FormattedMessage id="login" />
          </h1>
          <p className="mb-2">
            <FormattedMessage id="need_account" />
            <span
              className="link__signup"
              onClick={() => {
                modalHide();
                signUpModalShow();
              }}
            >
              <FormattedMessage id="signup" />
            </span>
          </p>
          <form
            onSubmit={loginHandler}
            className="ml-auto mr-auto flex w-full max-w-lg flex-col p-4"
          >
            <label className={`label__signup ${styleLabel} ${styleText}`}>
              <FormattedMessage id="e_mail" />
              <input
                type="text"
                className={`mb-1 w-full ${styleInput}`}
                onChange={emailHandler}
              />
            </label>
            {emailError && <p className={styleErrorMes}>{emailError}</p>}
            <label className={`label__signup ${styleLabel} ${styleText}`}>
              <FormattedMessage id="password" />
              <input
                type="password"
                className={`mb-1 w-full ${styleInput}`}
                onChange={passwordHandler}
              />
            </label>
            {passwordEr && (
              <p className={`${styleErrorMes} text-lg`}>{passwordEr}</p>
            )}
            <button className="mb-3 w-[full] rounded-full border bg-blue-400 p-1 px-3  hover:bg-red-200">
              <FormattedMessage id="login" />
            </button>
            <div className="flex items-center justify-start">
              <label>
                <input
                  className="mr-3"
                  type="checkbox"
                  checked={checked}
                  onChange={staySignedHandler}
                ></input>
                <FormattedMessage id="stay_signed" />
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default LogInWindow;

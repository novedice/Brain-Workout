import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {
  /* refreshToken, checkToken,*/ registrAuthUser,
} from '../../api/user-requests';
import {
  HIDE_MODAL,
  LOGGIN,
  LOGGINUSER,
  SHOW_SIGNUP /* UPDATE_TOKEN */,
  UPDATE_TOKEN,
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

const LogInWindow = () => {
  const dispatch = useAppDispatch();
  const { openLogInModal } = useTypeSelector((state) => state.logInModal);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordEr, setPasswordEr] = useState('');
  const { token } = useTypeSelector((state) => state.tokenInfo);
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
      { email: email, password: password },
      'login'
    );
    if (loginResponse) {
      dispatch({ payload: { token: loginResponse.token }, type: UPDATE_TOKEN });
      dispatch({ type: LOGGIN });
      dispatch({
        payload: {
          id: jwt_decode<IUser>(loginResponse.token).id,
          nickname: jwt_decode<IUser>(loginResponse.token).nickname,
          loggedIn: true,
          email: email,
          language: user.language,
          alwaysSignIn: checked,
        },
        type: UPDATE_USER,
      });

      document.cookie = `auth=Bearer ${loginResponse.token}`;
      console.log('token:', token);
      modalHide();
      dispatch({ type: LOGGINUSER });

      if (checked) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } else {
      setPasswordEr('Your email or password is incorrect. Please try again');
    }
  };

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordEr('');
    setEmailError('');

    if (!password || !email || passwordEr || emailError) {
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
          <h1 className="caption_login mb-2">Log in</h1>
          <p className="mb-2">
            Need an account?
            <span
              className="link__signup"
              onClick={() => {
                modalHide();
                signUpModalShow();
              }}
            >
              Sign Up
            </span>
          </p>
          <form
            onSubmit={loginHandler}
            className="ml-auto mr-auto flex w-full max-w-lg flex-col p-4"
          >
            <label className={`label__signup ${styleLabel} ${styleText}`}>
              E-mail
              <input
                type="text"
                className={`mb-1 w-full ${styleInput}`}
                onChange={emailHandler}
              />
            </label>
            {emailError && <p className={styleErrorMes}>{emailError}</p>}
            <label className={`label__signup ${styleLabel} ${styleText}`}>
              Password
              <input
                type="password"
                className={`mb-1 w-full ${styleInput}`}
                onChange={passwordHandler}
              />
            </label>
            {passwordEr && (
              <p className={`${styleErrorMes} text-lg`}>{passwordEr}</p>
            )}
            <button className="mb-3 w-16 rounded-full border bg-blue-400 p-1 px-3  hover:bg-red-200">
              Login
            </button>
            <div className="flex items-center justify-start">
              <label>
                <input
                  className="mr-3"
                  type="checkbox"
                  checked={checked}
                  onChange={staySignedHandler}
                ></input>
                Stay signed in
              </label>
            </div>
          </form>
          <p className="mb-2">
            Forgot password?
            <Link to="/reset" className="link__signup">
              Reset password
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default LogInWindow;

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';
import { refreshToken, registrAuthUser } from '../../api/user-requests';
import { HIDE_MODAL, LOGGIN, SHOW_SIGNUP, UPDATE_TOKEN } from '../../constants';
import {
  styleErrorMes,
  styleInput,
  styleLabel,
  styleText,
} from '../../constants/styleConstants';
import { useAppDispatch, useTypeSelector } from '../../hooks/useTypeSelector';
import './ModalWindow.css';

const LogInWindow = () => {
  const dispatch = useAppDispatch();
  const { openLogInModal } = useTypeSelector((state) => state.logInModal);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordEr, setPasswordEr] = useState('');
  const { token } = useTypeSelector((state) => state.tokenInfo);
  // const user = useTypeSelector((state) => state.userInfo);
  // const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  const [cookie] = useCookies(['token']);

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
    console.log('login data', loginResponse);
    if (loginResponse) {
      dispatch({ type: LOGGIN });
      const t = await refreshToken(cookie);
      dispatch({ payload: t, type: UPDATE_TOKEN });
      console.log('token:', token);
      const decodedToken = decodeToken(token);
      console.log(decodedToken);
      modalHide();
    }
    dispatch({ type: LOGGIN });
    dispatch({ type: 'LOGGINUSER' });
    modalHide();
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

  return (
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
            // to="/signup"
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
          {passwordEr && <p className={styleErrorMes}>{passwordEr}</p>}
          <button className="mb-3 w-16 rounded-full border bg-blue-400 p-1 px-3  hover:bg-red-200">
            Login
          </button>
        </form>
        <p className="mb-2">
          Forgot password?
          <Link to="/reset" className="link__signup">
            Reset password
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LogInWindow;

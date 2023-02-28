import React, { ReactElement, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { registrAuthUser } from '../../api/user-requests';
import jwt_decode from 'jwt-decode';
import {
  HIDE_SIGNUP,
  LOGGIN,
  LOGGINUSER,
  SHOW_MODAL,
  UPDATE_TOKEN,
  UPDATE_USER,
} from '../../constants';
import {
  styleErrorMes,
  styleInput,
  styleLabel,
  styleText,
} from '../../constants/styleConstants';
import { isEmailValid } from '../../functions/validEmail';
import { isNameValid } from '../../functions/validName';
import { isValidPassword } from '../../functions/validPassword';
import { isPasswordsEquial } from '../../functions/validPasswordConfirm';
import { useAppDispatch, useTypeSelector } from '../../hooks/useTypeSelector';
import { IUser } from '../../types/interfaces';
import './ModalWindow.css';
import { setToken } from '../../functions/tokenManipulation';

const SignUpModal = () => {
  const [nickname, setNickname] = useState('');
  const [nameError, setNameError] = useState<ReactElement | string>();
  const [password, setPassword] = useState('');
  const [passwordEr, setPasswordEr] = useState<ReactElement | string>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<ReactElement | string>();
  const [confirmPass, setConfirmPass] = useState('');
  const [confirmPassErr, setConfirmPassErr] = useState<ReactElement | string>();
  const [checked, setChecked] = useState(true);
  const user: IUser = useTypeSelector((state) => state.userInfo);

  const dispatch = useAppDispatch();
  const { openSignUpModal } = useTypeSelector((state) => state.signUpModal);

  const signUpModalHide = () => {
    dispatch({ type: HIDE_SIGNUP });
  };

  const modalShow = () => {
    dispatch({ type: SHOW_MODAL });
  };

  const sigInComplete = async () => {
    const registration = await registrAuthUser(
      {
        email: email,
        password: password,
        nickname: nickname,
        lang: user.lang,
      },
      'registration'
    );

    if (registration) {
      dispatch({ type: LOGGIN });
      dispatch({
        payload: {
          id: jwt_decode<IUser>(registration.token).id,
          nickname: jwt_decode<IUser>(registration.token).nickname,
          loggedIn: true,
          language: user.lang,
          email: user.email,
          alwaysSignIn: checked,
        },
        type: UPDATE_USER,
      });

      dispatch({
        payload: { token: registration.token },
        type: UPDATE_TOKEN,
      });
      dispatch({ type: LOGGINUSER });
      localStorage.setItem('user', JSON.stringify(user));
      // localStorage.setItem('token', registration.token);
      setToken(registration.token);

      if (checked) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      signUpModalHide();
    } else {
      setEmailError(<FormattedMessage id="user_exists" />);
      return;
    }

    // modalShow();
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    let numOfErr = emailError ? 1 : 0;

    setPasswordEr(isValidPassword(password, numOfErr).err);
    numOfErr = isValidPassword(password, numOfErr).n;
    setNameError(isNameValid(nickname, numOfErr).err);
    numOfErr = isNameValid(nickname, numOfErr).n;
    setEmailError(isEmailValid(email, numOfErr).err);
    numOfErr = isEmailValid(email, numOfErr).n;
    setConfirmPassErr(isPasswordsEquial(confirmPass, password, numOfErr).err);
    numOfErr = isEmailValid(email, numOfErr).n;

    if (numOfErr !== 0) {
      return;
    } else {
      sigInComplete();
      return;
    }
  };

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPass(event.target.value);
  };

  const staySignedHandler = () => {
    setChecked(!checked);
  };

  return (
    <div
      className={openSignUpModal ? 'modal active' : 'modal'}
      onClick={() => signUpModalHide()}
    >
      <div
        className={
          openSignUpModal
            ? 'modal__content active flex flex-col items-center'
            : 'modal__content flex flex-col items-center'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="caption_login mb-2">
          <FormattedMessage id="registration" />
        </h1>
        <p className="mb-2">
          <FormattedMessage id="already_have" />
          <span
            className="link__signup"
            onClick={() => {
              signUpModalHide();
              modalShow();
            }}
          >
            <FormattedMessage id="to_login" />
          </span>
        </p>
        <form
          onSubmit={submitHandler}
          className="ml-auto mr-auto flex w-full max-w-lg flex-col p-4"
        >
          <label className={`label__signup ${styleLabel} ${styleText}`}>
            <FormattedMessage id="e_mail" />
            <input
              type="email"
              name="email"
              className={`mb-1 w-full ${styleInput}`}
              onChange={emailHandler}
            />
          </label>
          {emailError && <div className={styleErrorMes}>{emailError}</div>}
          <label className={`label__signup ${styleLabel} ${styleText}`}>
            <FormattedMessage id="name" />
            <input
              type="text"
              className={`mb-1 w-full ${styleInput}`}
              onChange={nameHandler}
            />
          </label>
          {nameError && <div className={styleErrorMes}>{nameError}</div>}
          <label className={`label__signup ${styleLabel} ${styleText}`}>
            <FormattedMessage id="password" />
            <input
              type="password"
              className={`mb-1 w-full ${styleInput}`}
              onChange={passwordHandler}
            />
          </label>
          {passwordEr && <div className={styleErrorMes}>{passwordEr}</div>}
          <label className={`label__signup ${styleLabel} ${styleText}`}>
            <FormattedMessage id="confirm_password" />
            <input
              type="password"
              className={`mb-1 w-full ${styleInput}`}
              onChange={confirmPasswordHandler}
            />
          </label>
          {confirmPassErr && (
            <div className={styleErrorMes}>{confirmPassErr}</div>
          )}
          <button
            type="submit"
            className="mb-3 w-[full] rounded-full border bg-blue-400 p-1 px-3 hover:bg-red-200"
          >
            <FormattedMessage id="registration" />
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
  );
};
export default SignUpModal;

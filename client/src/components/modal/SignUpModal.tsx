import React, { useState } from 'react';
import { registrAuthUser } from '../../api/user-requests';
import { HIDE_SIGNUP, SHOW_MODAL, UPDATE_USER } from '../../constants';
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

const SignUpModal = () => {
  const [nickname, setNickname] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordEr, setPasswordEr] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [confirmPassErr, setConfirmPassErr] = useState('');
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
      { email: email, password: password, nickname: nickname },
      'registration'
    );

    console.log('registration data', registration);
    if (registration) {
      dispatch({
        payload: {
          nickname: nickname,
          loggedIn: false,
          language: user.language,
          email: user.email,
        },
        type: UPDATE_USER,
      });
      document.cookie = `auth=Bearer ${registration.token}`;
      console.log('user after sign up', user);
      console.log('cookies', document.cookie);
      signUpModalHide();
      modalShow();
    } else {
      setEmailError(
        'User with this email already exists. Please check the information and try again. If you already have an account, please Log In. '
      );
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // setConfirmPassErr('');
    // setEmailError('');
    // setNameError('');
    // setPasswordEr('');
    console.log('submit started');

    setPasswordEr(isValidPassword(password));
    setNameError(isNameValid(nickname));
    setEmailError(emailError ? emailError : isEmailValid(email));
    setConfirmPassErr(isPasswordsEquial(confirmPass, password));

    if (
      passwordEr ||
      emailError ||
      confirmPassErr ||
      nameError ||
      !nickname ||
      !email ||
      !password ||
      !confirmPass
    ) {
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
        <h1 className="caption_login mb-2">Sign up</h1>
        <p className="mb-2">
          Already have an account?
          <span
            className="link__signup"
            onClick={() => {
              signUpModalHide();
              modalShow();
            }}
          >
            Log in
          </span>
        </p>
        <form
          onSubmit={submitHandler}
          className="ml-auto mr-auto flex w-full max-w-lg flex-col p-4"
        >
          <label className={`label__signup ${styleLabel} ${styleText}`}>
            Email
            <input
              type="email"
              name="email"
              className={`mb-1 w-full ${styleInput}`}
              onChange={emailHandler}
            />
          </label>
          {emailError && <p className={styleErrorMes}>{emailError}</p>}
          <label className={`label__signup ${styleLabel} ${styleText}`}>
            Name
            <input
              type="text"
              className={`mb-1 w-full ${styleInput}`}
              onChange={nameHandler}
            />
          </label>
          {nameError && (
            <p className={styleErrorMes}>
              The name should contain at least 3 letters
            </p>
          )}
          <label className={`label__signup ${styleLabel} ${styleText}`}>
            Password
            <input
              type="password"
              className={`mb-1 w-full ${styleInput}`}
              onChange={passwordHandler}
            />
          </label>
          {passwordEr && <p className={styleErrorMes}>{passwordEr}</p>}
          <label className={`label__signup ${styleLabel} ${styleText}`}>
            Confirm password
            <input
              type="password"
              className={`mb-1 w-full ${styleInput}`}
              onChange={confirmPasswordHandler}
            />
          </label>
          {confirmPassErr && (
            <p className={styleErrorMes}>The passwords are not the same</p>
          )}
          <button
            type="submit"
            className="mb-3 w-36 rounded-full border bg-blue-400 p-1 px-3 hover:bg-red-200"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUpModal;

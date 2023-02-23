import { useEffect, useState } from 'react';
import { ChangeUserData } from '../components/ChangeUserData';
// import { FormattedMessage } from 'react-intl';
// import { updateUser } from '../api/user-requests';
// import { UPDATE_TOKEN, UPDATE_USER } from '../constants';
// import { styleLabel, styleText, styleInput } from '../constants/styleConstants';
import { useTypeSelector } from '../hooks/useTypeSelector';
// import { IUser } from '../types/interfaces';
import './AccountSettingsPage.css';
// import jwt_decode from 'jwt-decode';
// import { isValidPassword } from '../functions/validPassword';
// import { isPasswordsEquial } from '../functions/validPasswordConfirm';
// import { isEmailValid } from '../functions/validEmail';
// import { isNameValid } from '../functions/validName';

export function AccounSettingsPage() {
  // const dispatch = useAppDispatch();
  const user = useTypeSelector((state) => state.userInfo);
  const token = useTypeSelector((state) => state.tokenInfo);
  const [changingsIn, setChangingsIn] = useState<'account' | 'training'>(
    'account'
  );
  const [openChanges, setOpenChanges] = useState(false);
  const [typeOfChanges, setTypeOfChanges] = useState<
    'name' | 'email' | 'password' | ''
  >('');
  // const [changeName, setChangeName] = useState<boolean>(false);
  // const [changeEmail, setChangeEmail] = useState<boolean>(false);
  // const [changePassword, setChangePassword] = useState<boolean>(false);
  // const [newName, setNewName] = useState<string>('');
  // const [newEmail, setNewEmail] = useState<string>('');
  // const [newPassword, setNewPassword] = useState<string>('');
  // const [confirmPassword, setConfirmPassword] = useState<string>('');
  // const [error, setError] = useState<ReactElement | string>();
  const [currentName, setCurrentName] = useState(user.nickname);
  const [curentEmail, setCurrentEmail] = useState(user.email);

  useEffect(() => {
    setCurrentEmail(user.email);
    setCurrentName(user.nickname);
  }, [token]);

  return (
    <>
      <div className="account-page">
        <div className="account-container">
          <aside className="aside-nav-account">
            <div
              className={`aside-nav-list ${
                changingsIn === 'account' ? 'open-now' : ''
              }`}
              onClick={() => setChangingsIn('account')}
            >
              Account settings
            </div>
            <div
              className={`aside-nav-list ${
                changingsIn === 'training' ? 'open-now' : ''
              }`}
              onClick={() => setChangingsIn('training')}
            >
              Training Preferences
            </div>
          </aside>
          <main>
            {changingsIn === 'account' && (
              <>
                <article className="account-info">
                  {openChanges && (
                    <ChangeUserData
                      typeOfChanges={typeOfChanges}
                      setOpenChanges={setOpenChanges}
                    />
                  )}
                  {!openChanges && (
                    <>
                      {' '}
                      <section className="section">
                        <h2 className="h2-account">Account</h2>
                        <div className="info-block">
                          <div className="info">
                            <p className="name-email">your name</p>
                            <p className="user-name-email">{currentName}</p>
                          </div>
                          <div className="change-in-process">
                            <p
                              className="name-email change-info"
                              onClick={() => {
                                setTypeOfChanges('name');
                                setOpenChanges(true);
                              }}
                            >
                              change name
                            </p>
                            {/* {changeName && (
                        <div className="block-changing">
                          <label
                            className={`label__settings ${styleLabel} ${styleText}`}
                          >
                            <FormattedMessage id="name" />
                            <input
                              type="text"
                              name="name"
                              className={`mb-1 w-full ${styleInput}`}
                              onChange={nameHandler}
                            />
                          </label>
                          {error && <p>{error}</p>}
                          <button
                            type="submit"
                            className="mb-3 w-[full] rounded-full border bg-blue-400 p-1 px-3 hover:bg-red-200"
                            onClick={submitChanges}
                          >
                            <FormattedMessage id="registration" />
                          </button>
                        </div>
                      )} */}
                          </div>
                        </div>
                      </section>
                      <section className="section">
                        <h3 className="h3-account">Login information</h3>
                        <div className="info-block">
                          <div className="info">
                            <p className="name-email">Your email</p>
                            <p className="user-name-email">{curentEmail}</p>
                          </div>
                          <div className="change-info">
                            <div className="change-in-process">
                              <p
                                className="name-email"
                                onClick={() => {
                                  setTypeOfChanges('email');
                                  setOpenChanges(true);
                                }}
                              >
                                change email
                              </p>
                              {/* {changeEmail && (
                          <div className="block-changing">
                            <label
                              className={`label__settings ${styleLabel} ${styleText}`}
                            >
                              <FormattedMessage id="e_mail" />
                              <input
                                type="email"
                                name="email"
                                className={`mb-1 w-full ${styleInput}`}
                                onChange={emailHandler}
                              />
                            </label>
                            <button
                              type="submit"
                              className="mb-3 w-[full] rounded-full border bg-blue-400 p-1 px-3 hover:bg-red-200"
                              onClick={submitChanges}
                            >
                              <FormattedMessage id="registration" />
                            </button>
                          </div>
                        )} */}
                            </div>
                            <div className="change-in-process">
                              <p
                                className="name-email"
                                onClick={() => {
                                  setTypeOfChanges('password');
                                  setOpenChanges(true);
                                }}
                              >
                                change password
                              </p>
                              {/* {changePassword && (
                          <div className="block-changing">
                            <label
                              className={`label__settings ${styleLabel} ${styleText}`}
                            >
                              <FormattedMessage id="password" />
                              <input
                                type="password"
                                name="password"
                                className={`mb-1 w-full ${styleInput}`}
                                onChange={passwordHandler}
                              />
                            </label>
                            <label
                              className={`label__settings ${styleLabel} ${styleText}`}
                            >
                              <FormattedMessage id="confirm_password" />
                              <input
                                type="password"
                                name="password"
                                className={`mb-1 w-full ${styleInput}`}
                                onChange={confirmPasswordHandler}
                              />
                            </label>
                            <button
                              type="submit"
                              className="mb-3 w-[full] rounded-full border bg-blue-400 p-1 px-3 hover:bg-red-200"
                              onClick={submitChanges}
                            >
                              <FormattedMessage id="registration" />
                            </button>
                          </div> */}
                              {/* )} */}
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="section">
                        <div className="info-block">
                          <div className="change-info">delete account</div>
                        </div>
                      </section>
                    </>
                  )}
                </article>
              </>
            )}
            {changingsIn === 'training' && (
              <article className="account-info">
                <section className="section"></section>
                <section className="section"></section>
                <section className="section"></section>
              </article>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

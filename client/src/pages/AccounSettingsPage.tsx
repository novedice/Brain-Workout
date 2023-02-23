import { useEffect, useState } from 'react';
import { ChangeUserData } from '../components/ChangeUserData';
import { ChooseFavoriteCategory } from '../components/ChooseFavoriteCategore';
import { useTypeSelector } from '../hooks/useTypeSelector';
import './AccountSettingsPage.css';

export function AccounSettingsPage() {
  const user = useTypeSelector((state) => state.userInfo);
  const token = useTypeSelector((state) => state.tokenInfo);
  const [changingsIn, setChangingsIn] = useState<'account' | 'training'>(
    'account'
  );
  const [openChanges, setOpenChanges] = useState(false);
  const [typeOfChanges, setTypeOfChanges] = useState<
    'name' | 'email' | 'password' | 'delete' | ''
  >('');
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
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="section">
                        <div className="info-block">
                          <div
                            className="change-info"
                            onClick={() => {
                              setTypeOfChanges('delete');
                              setOpenChanges(true);
                            }}
                          >
                            delete account
                          </div>
                        </div>
                      </section>
                    </>
                  )}
                </article>
              </>
            )}
            {changingsIn === 'training' && (
              <article className="account-info">
                <section className="section">
                  <ChooseFavoriteCategory />
                </section>
              </article>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

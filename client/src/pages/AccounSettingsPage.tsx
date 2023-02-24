import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
// import { getLeaders } from '../api/leaders-requests';
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
            {(!openChanges || (changingsIn === 'training' && openChanges)) && (
              <div
                className={`aside-nav-list upper-case ${
                  changingsIn === 'account' ? 'open-now' : ''
                }`}
                onClick={() => setChangingsIn('account')}
              >
                <FormattedMessage id="to_settings" />
              </div>
            )}
            {openChanges && changingsIn !== 'training' && (
              <div
                className={`aside-nav-list upper-case ${
                  changingsIn === 'account' ? 'open-now' : ''
                }`}
                onClick={() => {
                  setChangingsIn('account');
                  setOpenChanges(false);
                }}
              >
                <FormattedMessage id="back_to_settings" />
              </div>
            )}
            <div
              className={`aside-nav-list upper-case ${
                changingsIn === 'training' ? 'open-now' : ''
              }`}
              onClick={() => setChangingsIn('training')}
            >
              <FormattedMessage id="training_preferences" />
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
                        <h2 className="h2-account upper-case">
                          <FormattedMessage id="account" />
                        </h2>
                        <div className="info-block">
                          <div className="info">
                            <p className="name-email">
                              <FormattedMessage id="your_name" />
                            </p>
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
                              <FormattedMessage id="change_name" />
                            </p>
                          </div>
                        </div>
                      </section>
                      <section className="section">
                        <h3 className="h3-account">
                          <FormattedMessage id="login_information" />
                        </h3>
                        <div className="info-block">
                          <div className="info">
                            <p className="name-email">
                              <FormattedMessage id="your_email" />
                            </p>
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
                                <FormattedMessage id="change_email" />
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
                                <FormattedMessage id="change_password" />
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="section">
                        <div className="info-block">
                          <div
                            className="change-info name-email"
                            onClick={() => {
                              setTypeOfChanges('delete');
                              setOpenChanges(true);
                            }}
                          >
                            <FormattedMessage id="delete_account" />
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

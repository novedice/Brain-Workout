import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { SHOW_MODAL, SHOW_SIGNUP } from '../constants';
import { useAppDispatch } from '../hooks/useTypeSelector';

export const BlockNotLoggedIn = () => {
  const dispatch = useAppDispatch();

  const modalShow = () => {
    dispatch({ type: SHOW_MODAL });
  };

  const signUpModalShow = () => {
    dispatch({ type: SHOW_SIGNUP });
  };
  return (
    <>
      <div className="account-page">
        <div className="account-container">
          <aside className="aside-nav-account">
            <Link to="/">
              <div className={`aside-nav-list upper-case`}>
                <FormattedMessage id="to_main" />
              </div>
            </Link>
          </aside>
          <div className="account-info">
            <p>
              <FormattedMessage id="you_are_not_loggin" />
              <span className="change-info" onClick={modalShow}>
                <FormattedMessage id="login" />
              </span>
              <span>. </span>
              <span>
                <FormattedMessage id="need_account" />
              </span>
              <span className="change-info" onClick={signUpModalShow}>
                <FormattedMessage id="signup" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

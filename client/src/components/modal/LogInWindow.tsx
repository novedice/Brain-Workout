import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HIDE_MODAL, SHOW_SIGNUP } from '../../constants';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import './ModalWindow.css';

const LogInWindow = () => {
  const dispatch = useDispatch();
  const { openLogInModal } = useTypeSelector((state) => state.logInModal);

  const modalHide = () => {
    dispatch({ type: HIDE_MODAL });
  };

  const signUpModalShow = () => {
    dispatch({ type: SHOW_SIGNUP });
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
        <label className="label__signup">
          Name
          <input type="text" className="mb-4 border" />
        </label>
        <label className="label__signup">
          Password
          <input type="password" className="mb-4 border" />
        </label>

        <button className="mb-3 w-16 rounded-full border p-1 px-3 hover:bg-red-200">
          Login
        </button>
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

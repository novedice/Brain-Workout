import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { HIDE_SIGNUP, SHOW_MODAL } from '../../constants';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import './ModalWindow.css';

const SignUpModal = () => {
  const dispatch = useDispatch();
  const { openSignUpModal } = useTypeSelector((state) => state.signUpModal);

  const signUpModalHide = () => {
    dispatch({ type: HIDE_SIGNUP });
  };

  const modalShow = () => {
    dispatch({ type: SHOW_MODAL });
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
        <label className="label__signup">
          Email
          <input type="email" name="email" className="mb-4 border" />
        </label>
        <label className="label__signup">
          Name
          <input type="text" className="mb-4 border" />
        </label>
        <label className="label__signup">
          Password
          <input type="password" className="mb-4 border" />
        </label>
        <label className="label__signup">
          Confirm password
          <input type="password" className="mb-4 border" />
        </label>
        <button className="mb-3 w-24 rounded-full border p-1 px-3 hover:bg-red-200">
          Sign up
        </button>
        {/* <p className="mb-2">
          Forgot password?
          <Link to="/reset" className="link__signup">
            Reset password
          </Link>
        </p> */}
      </div>
    </div>
  );
};
export default SignUpModal;

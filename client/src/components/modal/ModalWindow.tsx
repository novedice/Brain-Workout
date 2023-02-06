// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import './ModalWindow.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ModalWindow = () => {
  // const dispatch = useDispatch();
  // const { openModal } = useTypeSelector((state) => state.openModal);
  const { openModal } = useTypeSelector((state) => state.openModal);
  console.log(openModal);

  return (
    <div className={openModal ? 'modal' : 'RU'}>
      <div className="modal__content">dwdwd</div>
    </div>
  );
};
export default ModalWindow;

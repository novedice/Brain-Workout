// import { useCookies } from 'react-cookie';
import { checkToken } from '../api/user-requests';
import { UPDATE_TOKEN, UPDATE_USER } from '../constants';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
import { IUser } from '../types/interfaces';

export const Template = () => {
  const { id, nickname, language, loggedIn } = useTypeSelector(
    (state) => state.userInfo
  );
  const { token: token1 } = useTypeSelector((state) => state.tokenInfo);
  const dispatch = useAppDispatch();
  // const [cookie] = useCookies(['token']);

  const newUser: IUser = {
    id: 1,
    nickname: 'HNB',
    language: 'en',
    loggedIn: true,
  };

  const logUser = async () => {
    const t = await checkToken();
    console.log('t', t);
    dispatch({ payload: t, type: UPDATE_TOKEN });
    console.log('new token', token1);
    console.log('update');
    dispatch({ payload: newUser, type: UPDATE_USER });
  };
  return (
    <>
      {' '}
      <div>
        <p>{`id = ${id}; nickname=${nickname}; lang=${language}, log=${loggedIn}`}</p>
      </div>
      <button onClick={logUser}>UPDATE USER</button>
    </>
  );
};

import { useCookies } from 'react-cookie';
import { refreshToken } from '../api/user-requests';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
import { IUser } from '../types/interfaces';

export const Template = () => {
  const { id, nickName, language, loggedIn } = useTypeSelector(
    (state) => state.userInfo
  );
  const { token: token1 } = useTypeSelector((state) => state.tokenInfo);
  const dispatch = useAppDispatch();
  const [cookie] = useCookies(['token']);

  const newUser: IUser = {
    id: 1,
    nickName: 'HNB',
    language: 'en',
    loggedIn: true,
  };

  const logUser = async () => {
    const t = await refreshToken(cookie);
    console.log('t', t);
    dispatch({ payload: t, type: 'UPDATE' });
    console.log('new token', token1);
    console.log('update');
    dispatch({ payload: newUser, type: 'UPDATE' });
  };
  return (
    <>
      {' '}
      <div>
        <p>{`id = ${id}; nickName=${nickName}; lang=${language}, log=${loggedIn}`}</p>
      </div>
      <button onClick={logUser}>UPDATE USER</button>
    </>
  );
};

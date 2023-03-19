import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

const LoginComponent = () => {
  const { screenClass, isLogin, changeLoginState } = useRootData(
    ({ appStore, loginStore }) => ({
      screenClass: appStore.screenClass.get(),
      isLogin: loginStore.isLogin.get(),
      changeLoginState: loginStore.changeLoginState,
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const CurrentLogin = (ID: string, PW: string) => {
    if (ID === 'usr' && PW === 'usr') return true;
    return false;
  };

  const [id, setId] = useState('');
  const inputID = (event: React.FormEvent<HTMLInputElement>) =>
    setId(event.currentTarget.value);

  const [pw, setPw] = useState('');
  const inputPW = (event: React.FormEvent<HTMLInputElement>) =>
    setPw(event.currentTarget.value);

  const [loginType, setLoginType] = useState('');
  const changeloginType = (co: string) => setLoginType(co);
  const [loginState, setLoginState] = useState(false);
  const changeloginState = (current: boolean) => setLoginState(current);

  const submitInfo = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (isLogin === true) return;

    if (id === '') {
      changeloginType('아이디를 입력해주세요');
      changeloginState(true);
      return;
    } else changeloginState(false);

    if (pw === '') {
      changeloginType('비밀번호를 입력해주세요');
      changeloginState(true);
      return;
    } else changeloginState(false);

    if (CurrentLogin(id, pw)) {
      alert(`환영합니다 ${id}님`);
      changeLoginState(true);
    } else {
      changeloginState(true);
      changeloginType('올바르지 않은 아이디 혹은 비밀번호');
    }
  };
  return (
    <div className={styles.mainBlock}>
      <h1>WhenThen</h1>
      <form className={styles.formBlock} onSubmit={submitInfo}>
        <input
          id="idInputBox"
          type="text"
          placeholder="아이디"
          value={id}
          onChange={inputID}
          className={styles.inputBox}
        ></input>
        <input
          type="password"
          placeholder="비번"
          value={pw}
          onChange={inputPW}
          className={styles.inputBox}
        ></input>
        {loginState && <label htmlFor="idInputBox">{loginType}</label>}
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginComponent;

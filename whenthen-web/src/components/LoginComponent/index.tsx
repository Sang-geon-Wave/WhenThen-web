import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
  const inputID = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeloginState(false);
    setId(event.currentTarget.value);
  };

  const [pw, setPw] = useState('');
  const inputPW = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeloginState(false);
    setPw(event.currentTarget.value);
  };

  const [loginType, setLoginType] = useState('');
  const changeloginType = (co: string) => setLoginType(co);
  const [loginState, setLoginState] = useState(false);
  const changeloginState = (current: boolean) => setLoginState(current);

  const submitInfo = (event: React.FormEvent<HTMLFormElement>) => {
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
      <Form
        className={loginState ? styles.formErrorBlock : styles.formBlock}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitInfo(e)}
      >
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputID(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputPW(e)}
          />
          {loginState && (
            <Form.Text className="text-muted">{loginType}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="로그인 상태 유지" />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          로그인
        </Button>
      </Form>
    </div>
  );
};

export default LoginComponent;

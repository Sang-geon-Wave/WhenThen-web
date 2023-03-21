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

  const [loginErrType, setLoginErrType] = useState('');
  const changeLoginErrType = (errType: string) => setLoginErrType(errType);
  const [loginErr, setLoginErr] = useState(false);
  const changeLoginErr = (err: boolean) => setLoginErr(err);

  const [id, setId] = useState('');
  const inputID = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeLoginErr(false);
    setId(event.currentTarget.value);
  };

  const [pw, setPw] = useState('');
  const inputPW = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeLoginErr(false);
    setPw(event.currentTarget.value);
  };

  const submitInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin === true) return;

    if (id === '') {
      changeLoginErrType('아이디를 입력해주세요');
      changeLoginErr(true);
      return;
    } else changeLoginErr(false);

    if (pw === '') {
      changeLoginErrType('비밀번호를 입력해주세요');
      changeLoginErr(true);
      return;
    } else changeLoginErr(false);

    if (CurrentLogin(id, pw)) {
      alert(`환영합니다 ${id}님`);
      changeLoginState(true);
    } else {
      changeLoginErr(true);
      changeLoginErrType('올바르지 않은 아이디 혹은 비밀번호');
    }
  };
  return (
    <div className={styles.mainBlock}>
      <h1>WhenThen</h1>
      <Form
        className={loginErr ? styles.formErrorBlock : styles.formBlock}
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
          {loginErr && (
            <Form.Text className="text-muted">{loginErrType}</Form.Text>
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

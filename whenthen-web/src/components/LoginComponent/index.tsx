import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AlertType } from '../AlertComponent';

const LoginComponent = () => {
  const { screenClass, setAlert, isLogin, changeLoginState, login, refresh } =
    useRootData(({ appStore, authStore }) => ({
      screenClass: appStore.screenClass.get(),
      setAlert: appStore.setAlert,
      isLogin: authStore.isLogin.get(),
      changeLoginState: authStore.changeLoginState,
      login: authStore.login,
      refresh: authStore.refresh,
    }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  // Todo: implement actual login feature
  const tmpCurrentLoginInfo = (ID: string | null, PW: string | null) => {
    if (ID === 'usr' && PW === 'usr') return true;
    return false;
  };

  const navigate = useNavigate();

  // Try refresh token
  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  const [loginErrType, setLoginErrType] = useState('');
  const [loginErr, setLoginErr] = useState(false);

  const [usrId, setUsrId] = useState('');
  const inputID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginErr(false);
    setUsrId(event.currentTarget.value);
  };

  const [usrPw, setUsrPw] = useState('');
  const inputPW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginErr(false);
    setUsrPw(event.currentTarget.value);
  };

  const [autoLogin, setAutoLogin] = useState(false);
  const toggleAutoLogin = () => setAutoLogin(!autoLogin);

  const submitInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin === true) return;

    if (!usrId || !usrPw) {
      setLoginErrType(`${!usrId ? '아이디' : '비밀번호'}를 입력해주세요`);
      setLoginErr(true);
      return;
    } else setLoginErr(false);

    if (tmpCurrentLoginInfo(usrId, usrPw)) {
      setAlert({
        alertType: AlertType.Confirmation,
        alertContent: `환영합니다 ${usrId}님`,
        handleConfirm: () => {
          console.log('login success');
        },
        confirmText: 'OK',
      });
      changeLoginState(true);
      if (autoLogin) {
        // 추후 서버에서 토큰이 날라오면 토큰 하나만 저장예정
        localStorage.setItem('ID', usrId);
        localStorage.setItem('PW', usrPw);
        localStorage.setItem('autoLogin', 'true');
      } else localStorage.setItem('autoLogin', 'false');
    } else {
      setLoginErr(true);
      setLoginErrType('올바르지 않은 아이디 혹은 비밀번호');
    }
  };
  return (
    <div className={styles.mainBlock}>
      <Form
        className={loginErr ? styles.formErrorBlock : styles.formBlock}
        onSubmit={submitInfo}
      >
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디"
            value={usrId}
            onChange={inputID}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            value={usrPw}
            onChange={inputPW}
          />
          {loginErr && (
            <Form.Text className={styles.errorMessageBlock}>
              {loginErrType}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={toggleAutoLogin}
            type="checkbox"
            label="로그인 상태 유지"
            checked={autoLogin}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          로그인
        </Button>
      </Form>
    </div>
  );
};

export default LoginComponent;

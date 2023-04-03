import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignupComponent = () => {
  const { screenClass, isLogin, changeLoginState } = useRootData(
    ({ appStore, loginStore }) => ({
      screenClass: appStore.screenClass.get(),
      isLogin: loginStore.isLogin.get(),
      changeLoginState: loginStore.changeLoginState,
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  // Todo: implement actual login feature
  const tmpCurrentLoginInfo = (ID: string | null, PW: string | null) => {
    if (ID === 'usr' && PW === 'usr') return true;
    return false;
  };

  const [signupErrType, setSignupErrType] = useState('');
  const [signupErr, setSignupErr] = useState(false);

  const [usrId, setUsrId] = useState('');
  const inputID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupErr(false);
    setUsrId(event.currentTarget.value);
  };

  const [usrPw, setUsrPw] = useState('');
  const inputPW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupErr(false);
    setUsrPw(event.currentTarget.value);
  };

  const [usrPwRe, setUsrPwRe] = useState('');
  const inputPWRe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupErr(false);
    setUsrPwRe(event.currentTarget.value);
  };

  const submitInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupErr(false);

    if (!usrId) {
      setSignupErrType(`아이디를 입력해주세요`);
      setSignupErr(true);
      return;
    } else if (!usrPw) {
      setSignupErrType(`비밀번호를 입력해주세요`);
      setSignupErr(true);
      return;
    } else if (!usrPwRe) {
      setSignupErrType(`비밀번호 확인을 입력해주세요`);
      setSignupErr(true);
      return;
    }

    // id가 이미 있는지 검증 (수정 예정)
    if (usrId === 'usr') {
      setSignupErrType(`이미 존재하는 ID 입니다`);
      setSignupErr(true);
      return;
    }

    const reg = /^[A-Za-z0-9]{6,12}$/;
    if (!reg.test(usrPw)) {
      setSignupErrType('비밀번호 조건이 일치하지 않습니다');
      setSignupErr(true);
      return;
    } else if (usrPw !== usrPwRe) {
      setSignupErrType('비밀번호가 일치하지 않습니다');
      setSignupErr(true);
      return;
    }

    alert(`회원가입 완료하였습니다 ${usrId}님`);
  };

  return (
    <div className={styles.mainBlock}>
      <Form
        className={signupErr ? styles.formErrorBlock : styles.formBlock}
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
            type="text"
            placeholder="비밀번호"
            value={usrPw}
            onChange={inputPW}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordRe">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            value={usrPwRe}
            onChange={inputPWRe}
          />
          {signupErr && (
            <Form.Text className={styles.errorMessageBlock}>
              {signupErrType}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default SignupComponent;

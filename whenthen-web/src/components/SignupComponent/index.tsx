import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserSignupType } from '../../types/UserType';

const enum SignupErrorMessages {
  Normal = '',
  NoID = '아이디를 입력해주세요',
  NoPW = '비밀번호를 입력해주세요',
  NoPWRe = '비밀번호 확인을 입력해주세요',
  ExistID = '이미 존재하는 ID 입니다',
  IllegalPW = '비밀번호 조건을 만족하지 않습니다',
  IllegalPWRe = '비밀번호 확인이 일치하지 않습니다',
}

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

  const [signupErrMsg, setSignupErrMsg] = useState<SignupErrorMessages>(
    SignupErrorMessages.Normal,
  );

  const [user, setUser] = useState<UserSignupType>({
    ID: '',
    PW: '',
    PWRe: '',
  });

  const onChangeID = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUser = { ID: event.currentTarget.value };
    setUser((user) => ({
      ...user,
      ...updatedUser,
    }));
  };

  const onChangePW = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUser = { PW: event.currentTarget.value };
    setUser((user) => ({
      ...user,
      ...updatedUser,
    }));
  };

  const onChangePWRe = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUser = { PWRe: event.currentTarget.value };
    setUser((user) => ({
      ...user,
      ...updatedUser,
    }));
  };

  const submitInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupErrMsg(SignupErrorMessages.Normal);

    if (!user.ID) {
      setSignupErrMsg(SignupErrorMessages.NoID);
      return;
    } else if (!user.PW) {
      setSignupErrMsg(SignupErrorMessages.NoPW);
      return;
    } else if (!user.PWRe) {
      setSignupErrMsg(SignupErrorMessages.NoPWRe);
      return;
    }

    // id가 이미 있는지 검증 (수정 예정)
    if (user.ID === 'usr') {
      setSignupErrMsg(SignupErrorMessages.ExistID);
      return;
    }

    const reg = /^[A-Za-z0-9]{6,12}$/;
    if (!reg.test(user.PW)) {
      setSignupErrMsg(SignupErrorMessages.IllegalPW);
      return;
    } else if (user.PW !== user.PWRe) {
      setSignupErrMsg(SignupErrorMessages.IllegalPWRe);
      return;
    }

    alert(`회원가입 완료하였습니다 ${user.ID}님`);
  };

  return (
    <div className={styles.mainBlock}>
      <Form
        className={signupErrMsg ? styles.formErrorBlock : styles.formBlock}
        onSubmit={submitInfo}
      >
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디"
            value={user.ID}
            onChange={onChangeID}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="text"
            placeholder="비밀번호"
            value={user.PW}
            onChange={onChangePW}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordRe">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            value={user.PWRe}
            onChange={onChangePWRe}
          />
          {signupErrMsg && (
            <Form.Text className={styles.errorMessageBlock}>
              {signupErrMsg}
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

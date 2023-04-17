import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserSignupType } from '../../types/UserType';

const enum SignupErrorMessages {
  NoID = '아이디를 입력해주세요',
  NoPW = '비밀번호를 입력해주세요',
  NoPWRe = '비밀번호 확인을 입력해주세요',
  ExistID = '이미 존재하는 ID 입니다',
  IllegalPW = '비밀번호 조건을 만족하지 않습니다',
  IllegalPWRe = '비밀번호 확인이 일치하지 않습니다',
}

const SignupComponent = () => {
  const { screenClass, signup } = useRootData(({ appStore, authStore }) => ({
    screenClass: appStore.screenClass.get(),
    signup: authStore.signup,
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const navigate = useNavigate();

  const [signupErrMsg, setSignupErrMsg] = useState<null | SignupErrorMessages>(
    null,
  );

  const [user, setUser] = useState<UserSignupType>({
    ID: '',
    PW: '',
    PWRe: '',
  });

  const updateSignupInfo = (key: keyof UserSignupType, value: string) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const submitInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupErrMsg(null);

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

    const reg = /^[A-Za-z0-9]{6,12}$/;
    if (!reg.test(user.PW)) {
      setSignupErrMsg(SignupErrorMessages.IllegalPW);
      return;
    } else if (user.PW !== user.PWRe) {
      setSignupErrMsg(SignupErrorMessages.IllegalPWRe);
      return;
    }

    const res = await signup(user.ID, user.PW);
    if (res === 200) {
      alert(`회원가입 완료하였습니다 ${user.ID}님`);
      navigate('/login');
    } else if (res === 409) {
      setSignupErrMsg(SignupErrorMessages.ExistID);
    }
  };

  // Todo: Get more info such as email address, name, nickname, ...

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('ID', e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            value={user.PW}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('PW', e.target.value)
            }
          />
          <Form.Text>
            영어 소문자, 대문자, 숫자로 이루어진 6자에서 12자리 비밀번호
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordRe">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            value={user.PWRe}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('PWRe', e.target.value)
            }
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

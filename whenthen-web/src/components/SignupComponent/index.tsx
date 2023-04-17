import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserSignupType } from '../../types/UserType';
import HttpStatus from 'http-status-codes';

const enum SignupErrorMessages {
  IllegalID = '아이디는 5~16자의 영문 소문자와 숫자로 이루어져야 합니다',
  NoPW = '비밀번호를 입력해주세요',
  NoPWRe = '비밀번호 확인을 입력해주세요',
  ExistID = '이미 존재하는 ID 입니다',
  IllegalPW = '비밀번호가 조건을 만족하지 않습니다',
  IllegalPWRe = '비밀번호 확인이 일치하지 않습니다',
  IllegalNickname = '닉네임은 최대 30자 이하여야 합니다',
  IllegalEmail = '올바른 이메일 주소가 아닙니다',
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
    id: '',
    pw: '',
    pwRe: '',
    email: '',
    nickname: '',
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

    const idReg = /^[a-z\d]{5,16}$/;
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$]{8,16}$/;
    const nicknameReg = /^.{1,30}$/;
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!user.id || !idReg.test(user.id)) {
      setSignupErrMsg(SignupErrorMessages.IllegalID);
      return;
    } else if (!user.pw) {
      setSignupErrMsg(SignupErrorMessages.NoPW);
      return;
    } else if (!user.pwRe) {
      setSignupErrMsg(SignupErrorMessages.NoPWRe);
      return;
    } else if (user.nickname.length && !nicknameReg.test(user.nickname)) {
      // Optional
      setSignupErrMsg(SignupErrorMessages.IllegalNickname);
      return;
    } else if (user.email.length && !emailReg.test(user.email)) {
      // Optional
      setSignupErrMsg(SignupErrorMessages.IllegalEmail);
      return;
    }

    if (!passwordReg.test(user.pw)) {
      setSignupErrMsg(SignupErrorMessages.IllegalPW);
      return;
    } else if (user.pw !== user.pwRe) {
      setSignupErrMsg(SignupErrorMessages.IllegalPWRe);
      return;
    }

    const res = await signup(user.id, user.pw, user.nickname, user.email);
    if (res === HttpStatus.OK) {
      alert(`회원가입 완료하였습니다 ${user.id}님`);
      navigate('/login');
    } else if (res === HttpStatus.CONFLICT) {
      setSignupErrMsg(SignupErrorMessages.ExistID);
    }
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
            value={user.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('id', e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            value={user.pw}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('pw', e.target.value)
            }
          />
          <Form.Text>
            영어 소문자 + 대문자 + 숫자 + 특수문자 (!@#$) 조합의 8자리 이상
            16자리 이하 비밀번호
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordRe">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            value={user.pwRe}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('pwRe', e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="닉네임"
            value={user.nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('nickname', e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="text"
            placeholder="이메일"
            value={user.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateSignupInfo('email', e.target.value)
            }
          />
        </Form.Group>

        {signupErrMsg && (
          <Form.Text className={styles.errorMessageBlock}>
            {signupErrMsg}
          </Form.Text>
        )}

        <Button variant="outline-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default SignupComponent;

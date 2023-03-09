import React from 'react';
import useRootData from '../../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { useObserver } from 'mobx-react-lite';
// import stylesMobileDefault from './MobileDefault.module.scss';

const HeaderComponent = () => {
  const { loginStore } = useRootData(({ loginStore }) => ({
    loginStore: loginStore,
  }));
  let myPageSignInButtonClicked = () => {
    !!loginStore.isLogin ? alert('logout!') : alert('login!');
    !!loginStore.isLogin
      ? loginStore.changeLoginState(false)
      : loginStore.changeLoginState(true);
  };
  let signUpLogoutButtonClicked = () => {
    !!loginStore.isLogin ? alert('logout!') : alert('sign up!');
    !!loginStore.isLogin
      ? loginStore.changeLoginState(false)
      : loginStore.changeLoginState(false); // 회원가입 페이지로 이동
  };
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>
        <a href="#">
          <img
            className={styles.logoImg}
            src="https://pbs.twimg.com/profile_images/1121985451907137536/2Uq0Ih-2_400x400.jpg"
          />
        </a>
        <span>WhenThen</span>
      </h1>
      <div className={styles.topBarBlank}></div>
      <div className={styles.topBarButton}>
        <span>about</span>
      </div>
      <div
        className={styles.topBarButton}
        onClick={() => signUpLogoutButtonClicked()}
      >
        {!!loginStore.isLogin ? <span>log out</span> : <span>sign up</span>}
      </div>
      <div
        className={styles.topBarButton}
        onClick={() => myPageSignInButtonClicked()}
      >
        {!!loginStore.isLogin ? (
          <a href="#">
            <img
              className={styles.myPageImg}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaboC_OonRfowhuzgVIZ7BkLQYiWNeSQkfA&usqp=CAU"
            />
          </a>
        ) : (
          <span>sign in</span>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;

import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { observer } from 'mobx-react-lite';
import { action, observe } from 'mobx';
// import stylesMobileDefault from './MobileDefault.module.scss';

const HeaderComponent = () => {
  const { screenClass, isLogin, changeLoginState } = useRootData(
    ({ appStore, loginStore }) => ({
      screenClass: appStore.screenClass.get(),
      isLogin: loginStore.isLogin.get(),
      changeLoginState: loginStore.changeLoginState,
    }),
  );

  const isDesktop = screenClass === 'xl';

  let myPageSignInButtonClicked = () => {
    !!isLogin ? alert('logout!') : alert('login!');
    !!isLogin ? changeLoginState(false) : changeLoginState(true);
    console.log(isLogin);
  };
  let signUpLogoutButtonClicked = () => {
    !!isLogin ? alert('logout!') : alert('sign up!');
    !!isLogin ? changeLoginState(false) : changeLoginState(false); // 회원가입 페이지로 이동
  };

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
        {!!isLogin ? <span>log out</span> : <span>sign up</span>}
      </div>
      <div
        className={styles.topBarButton}
        onClick={() => myPageSignInButtonClicked()}
      >
        {!!isLogin ? (
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

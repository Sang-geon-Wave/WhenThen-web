import React from 'react';
import { Nav, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import MyPageImg from '../../assets/images/person.svg';
import HambergerImg from '../../assets/images/list.svg';

const HeaderComponent = () => {
  const {
    screenClass,
    isLogin,
    changeLoginState,
    isSideBarVisible,
    changeSideBarState,
  } = useRootData(({ appStore, loginStore, sideBarStore }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: loginStore.isLogin.get(),
    changeLoginState: loginStore.changeLoginState,
    isSideBarVisible: sideBarStore.isVisible.get(),
    changeSideBarState: sideBarStore.changeSideBarState,
  }));

  const isDesktop = screenClass === 'xl';

  let logInButtonClicked = () => {
    alert('login!');
    changeLoginState(true);
    console.log(isLogin);
  };

  let LogOutButtonClicked = () => {
    alert('logout!');
    changeLoginState(false);
    console.log(isLogin);
  };
  let SideBarButtonClicked = () => {
    changeSideBarState(!isSideBarVisible);
    console.log(isSideBarVisible);
  };

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.header}>
      <Navbar>
        {screenClass === 'xl' ? (
          <></>
        ) : (
          <img
            src={HambergerImg}
            width="50px"
            onClick={() => SideBarButtonClicked()}
          ></img>
        )}
        <NavbarBrand>
          <div className={styles.logo}>
            <a href="#">
              <img
                className={styles.logoImg}
                src="https://pbs.twimg.com/profile_images/1121985451907137536/2Uq0Ih-2_400x400.jpg"
              />
              <span>WhenThen</span>
            </a>
          </div>
        </NavbarBrand>
      </Navbar>
      <div className={styles.nav}>
        {isLogin ? (
          <NavDropdown
            title={<img src={MyPageImg} width="50px" />}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Dash Board</NavDropdown.Item>
            <NavDropdown.Item href="#">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#" onClick={() => LogOutButtonClicked()}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <>
            <div className={styles.topBarButton}>
              <span>about</span>
            </div>
            <div className={styles.topBarButton}>
              <span>sign up</span>
            </div>
            <div
              className={styles.topBarButton}
              onClick={() => logInButtonClicked()}
            >
              <span>sign in</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;

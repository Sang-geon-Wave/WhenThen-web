import React from 'react';
import { Nav, NavbarBrand, NavDropdown } from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import { useLocation, Link } from 'react-router-dom';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import MyPageImg from '../../assets/images/person.svg';
import HambergerImg from '../../assets/images/list.svg';
import logoImg from '../../assets/images/aeyung.jpg';

const HeaderComponent = () => {
  const {
    screenClass,
    isLogin,
    changeLoginState,
    currentMainMenu,
    changeMainMenu,
    sideBarVisibility,
    changeSideBarVisibility,
  } = useRootData(({ appStore, loginStore }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: loginStore.isLogin.get(),
    changeLoginState: loginStore.changeLoginState,
    currentMainMenu: appStore.currentMainMenu.get(),
    changeMainMenu: appStore.changeMainMenu,
    sideBarVisibility: appStore.sideBarVisibility.get(),
    changeSideBarVisibility: appStore.changeSideBarVisibility,
  }));

  const isDesktop = screenClass === 'xl';
  console.log(currentMainMenu);

  const logOutButtonClicked = () => {
    alert('logout!');
    changeLoginState(false);
    // changeMainMenu('/');
  };
  const logInButtonClicked = () => {
    alert('login!');
    changeLoginState(true);
    // changeMainMenu('/logIn');
  };
  const sideBarButtonClicked = () => {
    changeSideBarVisibility(!sideBarVisibility);
  };

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.header}>
      {screenClass === 'xl' || currentMainMenu === '' ? (
        <></>
      ) : (
        <img src={HambergerImg} width="50px" onClick={sideBarButtonClicked} />
      )}

      {screenClass === 'xl' || currentMainMenu === '' ? (
        <></>
      ) : (
        <Nav className="me-auto" />
      )}
      <NavbarBrand>
        <div className={styles.logo} onClick={() => changeMainMenu('/')}>
          <img className={styles.logoImg} src={logoImg} />
          <span>WhenThen</span>
        </div>
      </NavbarBrand>
      <Nav className="me-auto" />
      <div className={styles.nav}>
        {!!isLogin ? (
          <NavDropdown
            title={<img src={MyPageImg} width="50px" />}
            id="basic-navbar-nav"
          >
            <Nav className="me-auto">
              <NavDropdown.Item onClick={() => changeMainMenu('/myPage')}>
                My Page
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeMainMenu('/dashBoard')}>
                DashBoard
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeMainMenu('/')}>
                Something
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logOutButtonClicked}>
                Log Out
              </NavDropdown.Item>
            </Nav>
          </NavDropdown>
        ) : (
          <>
            {screenClass === 'xl' ? (
              <>
                <div
                  className={styles.topBarButton}
                  onClick={() => changeMainMenu('/layout')}
                >
                  <span>about</span>
                </div>
                <div
                  className={styles.topBarButton}
                  onClick={() => changeMainMenu('/signUp')}
                >
                  <span>sign up</span>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className={styles.topBarButton} onClick={logInButtonClicked}>
              <span>sign in</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;

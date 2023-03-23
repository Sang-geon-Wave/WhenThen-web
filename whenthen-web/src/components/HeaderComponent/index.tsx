import React from 'react';
import { Nav, NavbarBrand, NavDropdown } from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
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
    sideBarVisibility,
    changeSideBarVisibility,
  } = useRootData(({ appStore, loginStore }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: loginStore.isLogin.get(),
    changeLoginState: loginStore.changeLoginState,
    sideBarVisibility: appStore.sideBarVisibility.get(),
    changeSideBarVisibility: appStore.changeSideBarVisibility,
  }));

  const isDesktop = screenClass === 'xl';

  const logOutButtonClicked = () => {
    alert('logout!');
    changeLoginState(false);
  };
  const logInButtonClicked = () => {
    alert('login!');
    changeLoginState(true);
  };
  const sideBarButtonClicked = () => {
    changeSideBarVisibility(!sideBarVisibility);
  };
  const link = new Set(document.location.href.split('/'));
  const isLanding = link.size <= 3;

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.header}>
      {screenClass === 'xl' || isLanding ? (
        <></>
      ) : (
        <img src={HambergerImg} width="50px" onClick={sideBarButtonClicked} />
      )}

      {screenClass === 'xl' || isLanding ? <></> : <Nav className="me-auto" />}
      <NavbarBrand href="#">
        <div className={styles.logo}>
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
              <NavDropdown.Item href="#">My Page</NavDropdown.Item>
              <NavDropdown.Item href="#">DashBoard</NavDropdown.Item>
              <NavDropdown.Item href="#">Something</NavDropdown.Item>
              <NavDropdown.Divider />
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
                  onClick={() => (location.href = '#about')}
                >
                  <span>about</span>
                </div>
                <div
                  className={styles.topBarButton}
                  onClick={() => (location.href = '#signUp')}
                >
                  <span>sign up</span>
                </div>
              </>
            ) : (
              <></>
            )}
            <div
              className={styles.topBarButton}
              // onClick={() => (location.href = '#signIn')} 변경 예정
              onClick={logInButtonClicked}
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

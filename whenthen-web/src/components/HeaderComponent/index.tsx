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
  const nowLocation = useLocation();

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

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.header}>
      {screenClass === 'xl' || nowLocation.pathname === '/' ? (
        <></>
      ) : (
        <img src={HambergerImg} width="50px" onClick={sideBarButtonClicked} />
      )}

      {screenClass === 'xl' || nowLocation.pathname === '/' ? (
        <></>
      ) : (
        <Nav className="me-auto" />
      )}
      <NavbarBrand>
        <Link to={'/'}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={logoImg} />
            <span>WhenThen</span>
          </div>
        </Link>
      </NavbarBrand>
      <Nav className="me-auto" />
      <div className={styles.nav}>
        {!!isLogin ? (
          <NavDropdown
            title={<img src={MyPageImg} width="50px" />}
            id="basic-navbar-nav"
          >
            <Nav className="me-auto">
              <NavDropdown.Item href="#">
                <Link to={'/'}>My Page</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                <Link to={'/'}>DashBoard</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                <Link to={'/'}>Something</Link>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logOutButtonClicked}>
                <Link to={'/'}>Log Out</Link>
              </NavDropdown.Item>
            </Nav>
          </NavDropdown>
        ) : (
          <>
            {screenClass === 'xl' ? (
              <>
                <Link to={'/'}>
                  <div className={styles.topBarButton}>
                    <span>about</span>
                  </div>
                </Link>
                <Link to={'/'}>
                  <div className={styles.topBarButton}>
                    <span>sign up</span>
                  </div>
                </Link>
              </>
            ) : (
              <></>
            )}
            {/* <Link to={'/'}> */}
            <div className={styles.topBarButton} onClick={logInButtonClicked}>
              <span>sign in</span>
            </div>
            {/* </Link> */}
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;

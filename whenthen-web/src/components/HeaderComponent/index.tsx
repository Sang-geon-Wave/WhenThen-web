import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import { useLocation, useNavigate } from 'react-router-dom';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import MyPageImg from '../../assets/images/person.svg';
import HambergerImg from '../../assets/images/list.svg';
import logoImg from '../../assets/images/logo_header.svg';
import api from '../../api';

const HeaderComponent = () => {
  const {
    screenClass,
    isLogin,
    currentMainMenu,
    sideBarVisibility,
    logout,
    changeSideBarVisibility,
  } = useRootData(({ appStore, authStore }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: authStore.isLogin.get(),
    currentMainMenu: appStore.currentMainMenu.get(),
    sideBarVisibility: appStore.sideBarVisibility.get(),
    logout: authStore.logout,
    changeSideBarVisibility: appStore.changeSideBarVisibility,
  }));

  const isDesktop = screenClass === 'xl';
  const nowLocation = useLocation();
  const navigate = useNavigate();

  const logOutButtonClicked = async () => {
    await logout();
    navigate('/');
  };
  const logInButtonClicked = async () => {
    navigate('/login');
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
      <Navbar.Brand onClick={() => navigate('/')}>
        <img className={styles.logoImg} src={logoImg} />
      </Navbar.Brand>
      <Nav className="me-auto" />
      <div className={styles.nav}>
        {!!isLogin ? (
          <NavDropdown
            title={<img src={MyPageImg} width="50px" />}
            id="basic-navbar-nav"
          >
            <Nav className="me-auto">
              <NavDropdown.Item
                onClick={async () => {
                  const { data } = await api.get('/user/me');
                  const { user_id: userId, email, nickname } = data;
                  alert(`${userId}, ${email}, ${nickname}`);
                  // Todo: navigate('/my-page')
                }}
              >
                My Page
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/timeline')}>
                DashBoard
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/')}>
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
                  onClick={() => navigate('/layout')}
                >
                  <div className="px-2">ABOUT</div>
                </div>
                <div
                  className={styles.topBarButton}
                  onClick={() => navigate('/sign-up')}
                >
                  <div className="px-2">SIGN UP</div>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className={styles.topBarButton} onClick={logInButtonClicked}>
              <div className="px-2">SIGN IN</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;

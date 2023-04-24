import React, { useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import MockComponent from '../../components/MockComponent';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import api from '../../api';
import authStore from '../../stores/auth';

const MockPage = () => {
  const { screenClass, accessToken } = useRootData(
    ({ appStore, authStore }) => ({
      screenClass: appStore.screenClass.get(),
      accessToken: authStore.accessToken.get(),
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  useEffect(() => {
    (async () => {
      // Unprotected API call test
      const result = await api.get('/mock');
      console.log('mock', result);
      // Protected API call test
      try {
        const result2 = await api.get('/mock/auth');
        console.log('mock/auth', result2);
      } catch (e) {}
      // Authentication API call test
      const login = await authStore.login('usr', 'usr');
      console.log('login', login);
      // Protected API call test
      try {
        const result4 = await api.get('/mock/auth');
        console.log('mock/auth', result4);
      } catch (e) {}
      // Deauthentication API call test
      const logout = await authStore.logout();
      console.log('logout', logout);
    })();
  }, []);

  return (
    <>
      <MockComponent message={'hello, world'} highlight={true} />
      {accessToken}
    </>
  );
};

export default MockPage;

import React from 'react';
import LoginComponent from '../../components/LoginComponent';
import HeaderComponent from '../../components/HeaderComponent';
import LoginHeaderComponent from '../../components/LoginHeaderComponent';

const LoginPage = () => {
  return (
    <div>
      <HeaderComponent />
      <LoginHeaderComponent />
      <LoginComponent />
    </div>
  );
};

export default LoginPage;

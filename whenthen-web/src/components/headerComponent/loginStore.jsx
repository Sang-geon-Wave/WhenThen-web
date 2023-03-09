import { observable } from 'mobx';

const LoginStore = observable({
  isLogin: false,

  userLogin() {
    this.isLogin = true;
  },
  userLogout() {
    this.isLogin = false;
  },
});

export default LoginStore;

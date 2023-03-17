import { observable } from 'mobx';

const createStore = () => {
  const loginStore = {
    isLogin: observable.box(false),

    changeLoginState(data: boolean) {
      loginStore.isLogin.set(data);
    },
  };

  return loginStore;
};

const store = createStore();
export default store;

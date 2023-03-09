import { observable } from 'mobx';

interface loginStore {
  isLogin: boolean;
  changeLoginState(data: boolean): void;
}
const createStore = () => {
  const loginStore = observable<loginStore>({
    isLogin: false,

    changeLoginState(data: boolean) {
      this.isLogin = data;
    },
  });

  return loginStore;
};

const store = createStore();
export default store;

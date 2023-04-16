import { observable } from 'mobx';

const createStore = () => {
  const authStore = {
    accessToken: observable.box<null | string>(null),

    changeAccessToken(data: string) {
      authStore.accessToken.set(data);
    },
  };

  return authStore;
};

const store = createStore();
export default store;

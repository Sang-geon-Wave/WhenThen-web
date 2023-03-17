import { observable } from 'mobx';

const createStore = () => {
  const sideBarStore = {
    isVisible: observable.box(false),

    changeSideBarState(data: boolean) {
      sideBarStore.isVisible.set(data);
    },
  };

  return sideBarStore;
};

const store = createStore();
export default store;

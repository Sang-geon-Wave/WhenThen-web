import { observable } from 'mobx';
import history from '../utils/history';

const createStore = () => {
  const appStore = {
    screenClass: observable.box(window.innerWidth > 768 ? 'xl' : 'xs'),
    currentMainMenu: observable.box(''),

    alertModalVisibility: observable.box(false),
    alertModalContent: observable.box(''),

    sideBarVisibility: observable.box(false),

    changeSideBarVisibility(data: boolean) {
      appStore.sideBarVisibility.set(data);
    },

    // Set screen class
    changeScreenClass(data: any) {
      appStore.screenClass.set(data);
    },

    changeMainMenu(data: any) {
      appStore.currentMainMenu.set(data);
      history.push(data);
    },

    setAlert(content: any) {
      appStore.alertModalVisibility.set(true);
      appStore.alertModalContent.set(content);
    },
    removeAlert() {
      appStore.alertModalVisibility.set(false);
    },
  };

  return appStore;
};

const store = createStore();
export default store;

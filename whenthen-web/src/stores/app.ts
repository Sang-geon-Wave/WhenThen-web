import { observable } from 'mobx';
import history from '../utils/history';
import { boolean } from 'yargs';

const createStore = () => {
  const appStore = {
    screenClass: observable.box(window.innerWidth > 768 ? 'xl' : 'xs'),
    currentMainMenu: observable.box('/'),

    alertModalVisibility: observable.box(false),
    alertModalContent: observable.box(''),
    confirmModal: observable.box(false),

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

    setComfirm(content: any) {
      appStore.alertModalVisibility.set(true);
      appStore.alertModalContent.set(content);
      appStore.confirmModal.set(true);
    },
    setAlert(content: any) {
      appStore.alertModalVisibility.set(true);
      appStore.alertModalContent.set(content);
      appStore.confirmModal.set(false);
    },
    removeAlert() {
      appStore.alertModalVisibility.set(false);
    },
  };

  return appStore;
};

const store = createStore();
export default store;

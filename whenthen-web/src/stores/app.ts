import { observable } from 'mobx';
import history from '../utils/history';

const createStore = () => {
  const appStore = {
    screenClass: observable.box(window.innerWidth > 768 ? 'xl' : 'xs'),
    currentMainMenu: observable.box(''),

    alertModalVisibility: observable.box(false),
    alertModalContent: observable.box(''),

    isVisible: observable.box(false),

    changeSideBarState(data: boolean) {
      appStore.isVisible.set(data);
    },

    // Set screen class
    changeScreenClass(data: any) {
      appStore.screenClass.set(data);
    },

    changeMainMenu(data: any) {
      appStore.currentMainMenu.set(data);
      history.push(data);
    },

    changeAlertModalVisibility(data: any) {
      appStore.alertModalVisibility.set(data);
    },
    changeAlertModalContent(data: any) {
      appStore.alertModalContent.set(data);
      appStore.alertModalVisibility.set(!!data);
    },
  };

  return appStore;
};

const store = createStore();
export default store;

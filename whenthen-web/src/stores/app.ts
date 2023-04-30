import { observable } from 'mobx';
import history from '../utils/history';
import { boolean } from 'yargs';
import { AlertProps, DefaultAlertProps } from '../components/AlertComponent';

const createStore = () => {
  const appStore = {
    screenClass: observable.box(window.innerWidth > 768 ? 'xl' : 'xs'),
    currentMainMenu: observable.box('/'),

    alertModalVisibility: observable.box(false),
    alertModalProps: observable.box<AlertProps>(),

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

    setAlert(props?: AlertProps) {
      appStore.alertModalVisibility.set(true);
      appStore.alertModalProps.set({
        ...DefaultAlertProps,
        ...props,
      });
    },
    removeAlert() {
      appStore.alertModalVisibility.set(false);
    },
  };

  return appStore;
};

const store = createStore();
export default store;

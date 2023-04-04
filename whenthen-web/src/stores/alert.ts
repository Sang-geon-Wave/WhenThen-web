import { observable } from 'mobx';
import { stringify } from 'querystring';

const createStore = () => {
  const alertStore = {
    alertVisibility: observable.box(false),
    alertMessage: observable.box('message'),

    changeAlertState(message: string | null, data: boolean = true) {
      alertStore.alertVisibility.set(data);
      if (message != null) alertStore.alertMessage.set(message);
    },
  };

  return alertStore;
};

const store = createStore();
export default store;

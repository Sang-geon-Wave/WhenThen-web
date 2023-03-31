import appStore from './app';
import loginStore from './login';
import alertStore from './alert';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginStore: typeof loginStore;
  alertStore: typeof alertStore;
}

const createRootStore = () => ({
  appStore,
  loginStore,
  alertStore,
});

export default createRootStore;

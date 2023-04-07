import appStore from './app';
import loginStore from './login';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginStore: typeof loginStore;
}

const createRootStore = () => ({
  appStore,
  loginStore,
});

export default createRootStore;

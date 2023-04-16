import appStore from './app';
import loginStore from './login';
import authStore from './auth';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginStore: typeof loginStore;
  authStore: typeof authStore;
}

const createRootStore = () => ({
  appStore,
  loginStore,
  authStore,
});

export default createRootStore;

import appStore from './app';
import authStore from './auth';

export interface TypeRootStore {
  appStore: typeof appStore;
  authStore: typeof authStore;
}

const createRootStore = () => ({
  appStore,
  authStore,
});

export default createRootStore;

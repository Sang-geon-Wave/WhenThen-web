import appStore from './app';
import loginStore from './login';
import sideBarStore from './sideBar';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginStore: typeof loginStore;
  sideBarStore: typeof sideBarStore;
}

const createRootStore = () => ({
  appStore,
  loginStore,
  sideBarStore,
});

export default createRootStore;

import useRootData from '../../hooks/useRootData';
import DefaultDesktop from '../DefaultDesktop';
import DefaultMobile from '../DefaultMobile';

interface Props {
  children: React.ReactNode;
  hideSideBar: boolean;
}

const DefaultLayout = ({ children, hideSideBar }: Props) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  return isDesktop ? (
    <DefaultDesktop hideSideBar={hideSideBar}>{children}</DefaultDesktop>
  ) : (
    <DefaultMobile hideSideBar={hideSideBar}>{children}</DefaultMobile>
  );
};

export default DefaultLayout;

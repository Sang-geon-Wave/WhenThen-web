import useRootData from '../../hooks/useRootData';
import DefaultDesktop from '../DefaultDesktop';
import DefaultMobile from '../DefaultMobile';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  return isDesktop ? (
    <DefaultDesktop>{children}</DefaultDesktop>
  ) : (
    <DefaultMobile>{children}</DefaultMobile>
  );
};

export default DefaultLayout;

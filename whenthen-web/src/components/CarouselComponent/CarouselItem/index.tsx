import useRootData from '../../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

export interface ProbsCarouselItemComponent {
  src: string;
}

const CarouselItemComponent: React.FunctionComponent<
  ProbsCarouselItemComponent
> = ({ src }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.carouselItem}>
      <img src={src} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default CarouselItemComponent;

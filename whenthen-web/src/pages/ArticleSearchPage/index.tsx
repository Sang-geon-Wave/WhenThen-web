import { AxiosResponse } from 'axios';
import SearchComponent from '../../components/SearchComponent';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const ArticleSearchPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const types = [
    'title',
    'detail',
    'url',
    'start_datetime',
    'end_datetime',
    'place',
  ];
  const dateTypes = new Set(['start_datetime', 'end_datetime']);
  const onSearchCompleted = (response: AxiosResponse<any, any>) => {};
  return (
    <div>
      <SearchComponent
        types={types}
        dateTypes={dateTypes}
        onSearchCompleted={onSearchCompleted}
      ></SearchComponent>
    </div>
  );
};

export default ArticleSearchPage;

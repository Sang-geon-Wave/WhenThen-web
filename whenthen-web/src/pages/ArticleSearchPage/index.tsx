import { AxiosResponse } from 'axios';
import SearchComponent from '../../components/SearchComponent';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import { memo, useState } from 'react';
import TimelineCardComponent from '../../components/TimelineCardComponent';
import empty from '../../assets/images/empty.png';
import searching from '../../assets/images/searching.png';

const ArticleSearchPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  enum SearchStatus {
    BEGIN,
    RUNNING,
    DONE,
  }
  const types = [
    'title',
    'detail',
    'url',
    'start_datetime',
    'end_datetime',
    'place',
  ];
  const dateTypes = new Set(['start_datetime', 'end_datetime']);

  const [searchState, setSearchState] = useState({
    articles: [],
    searchStatus: SearchStatus.BEGIN,
  });

  const getImageUrl = (thumbnail: any) => {
    if (thumbnail && thumbnail.data) {
      const arrayBuffer = new Uint8Array(thumbnail.data).buffer;
      const blob = new Blob([arrayBuffer], {
        type: 'image/jpeg',
      });
      return window.URL.createObjectURL(blob);
    }
    return '';
  };
  const onSearchBefore = () => {
    setSearchState({
      articles: [],
      searchStatus: SearchStatus.BEGIN,
    });
    console.log('before');
    return true;
  };
  const onSearchStart = () => {
    setSearchState({
      ...searchState,
      searchStatus: SearchStatus.RUNNING,
    });
    console.log('start');
  };
  const onSearchCompleted = (response: AxiosResponse<any, any>) => {
    const fetchedArticles = response.data.data;
    setSearchState({
      articles: fetchedArticles,
      searchStatus: SearchStatus.DONE,
    });
    console.log('completed');
  };
  const MemoCard = memo(TimelineCardComponent);

  return (
    <div>
      <SearchComponent
        types={types}
        dateTypes={dateTypes}
        onSearchBefore={onSearchBefore}
        onSearchStart={onSearchStart}
        onSearchCompleted={onSearchCompleted}
      ></SearchComponent>
      {searchState.articles &&
        searchState.articles.map((article: any, idx) => (
          <TimelineCardComponent
            key={idx}
            title={article.title}
            content={article.detail}
            imgUrl={getImageUrl(article.thumbnail)}
            sub={article.sub}
          />
        ))}
      {searchState.searchStatus == SearchStatus.RUNNING && (
        <MemoCard title="검색중 ..." imgUrl={searching} content=" " sub=" " />
      )}
      {searchState.searchStatus == SearchStatus.DONE &&
        searchState.articles.length == 0 && (
          <MemoCard
            title="검색 결과가 없습니다!"
            imgUrl={empty}
            content=" "
            sub=" "
          />
        )}
    </div>
  );
};

export default ArticleSearchPage;

import { AxiosResponse } from 'axios';
import React, { memo, useEffect, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Pagination,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import TimelineCardComponent from '../../components/TimelineCardComponent';
import empty from '../../assets/images/empty.png';
import searching from '../../assets/images/searching.png';
import api from '../../api';
import DatepickerComponent from '../../components/DatepickerComponent';
import { AlertType } from '../../components/AlertComponent';

const ArticleSearchPage = () => {
  const { screenClass, setAlert } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
    setAlert: appStore.setAlert,
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
    page: 1,
  });

  const setPage = (page: number) => {
    setSearchState({
      articles: [],
      searchStatus: SearchStatus.BEGIN,
      page: page,
    });
  };

  useEffect(() => {
    getSearchResult();
  }, [searchState.page]);

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
      page: searchState.page,
    });
    return true;
  };

  const onSearchStart = () => {
    setSearchState({
      ...searchState,
      searchStatus: SearchStatus.RUNNING,
      page: searchState.page,
    });
  };

  const onSearchCompleted = (response: AxiosResponse<any, any>) => {
    const fetchedArticles = response.data.data;
    setSearchState({
      articles: fetchedArticles,
      searchStatus: SearchStatus.DONE,
      page: searchState.page,
    });
  };

  const onSearchError = (errmsg: string) => {
    setSearchState({
      articles: [],
      searchStatus: SearchStatus.BEGIN,
      page: searchState.page,
    });
  };

  const MemoCard = memo(TimelineCardComponent);

  const getSearchResult = async () => {
    if (!searchValue) return;

    try {
      if (onSearchBefore && !onSearchBefore()) return; // cancel event feature before starts
      if (onSearchStart) onSearchStart();
      const response: AxiosResponse<any, any> = await api.get(
        `/search?type=${searchType}&value=${searchValue}&page=${page}`,
      );
      onSearchCompleted(response);
    } catch (e: any) {
      const errmsg = e instanceof Error ? e.message : String(e);
      if (onSearchError) onSearchError(errmsg);
      console.log(errmsg);
      setAlert({
        alertType: AlertType.Warning,
        alertContent: `${errmsg}`,
        confirmText: 'Confirm',
      });
    }
  };

  const handleTypeSelect = (type: string) => {
    setSearchType(type);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const [searchType, setSearchType] = useState(types[0]);
  const [searchValue, setSearchValue] = useState('');
  const [isDateType, setDateType] = useState(
    dateTypes && dateTypes.has(searchType),
  );

  useEffect(() => {
    setDateType(dateTypes && dateTypes.has(searchType));
  }, [searchType]);

  const { articles, searchStatus, page } = searchState;

  const renderPaginationItems = () => {
    const paginationItems: JSX.Element[] = [];

    const addPaginationItem = (pageNumber: number) => {
      paginationItems.push(
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === searchState.page}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>,
      );
    };

    if (searchState.page >= 3) {
      addPaginationItem(searchState.page - 2);
    }
    if (searchState.page >= 2) {
      addPaginationItem(searchState.page - 1);
    }
    addPaginationItem(searchState.page);
    addPaginationItem(searchState.page + 1);
    addPaginationItem(searchState.page + 2);
    if (searchState.page <= 2) {
      addPaginationItem(searchState.page + 3);
    }
    if (searchState.page <= 1) {
      addPaginationItem(searchState.page + 4);
    }

    return paginationItems;
  };

  return (
    <div className={styles.container}>
      <div>
        <InputGroup className="mb-3">
          <DropdownButton variant="secondary" title={searchType}>
            {types.map((type) => (
              <Dropdown.Item key={type} onClick={() => handleTypeSelect(type)}>
                {type}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          {isDateType && (
            <DatepickerComponent
              onDateSelected={(formattedDate) => {
                setSearchValue(formattedDate);
              }}
            ></DatepickerComponent>
          )}
          {!isDateType && (
            <Form.Control aria-label="search" onChange={handleInputChange} />
          )}
          <Button variant="primary" onClick={getSearchResult}>
            Search
          </Button>
        </InputGroup>
      </div>
      {searchStatus == SearchStatus.DONE && (
        <Pagination size="lg">{renderPaginationItems()}</Pagination>
      )}
      {articles &&
        articles.map((article: any, idx: number) => (
          <TimelineCardComponent
            key={idx}
            title={article.title}
            content={article.detail}
            imgUrl={getImageUrl(article.thumbnail)}
            sub={(() => {
              const contents: string[] = [];
              if (article.url) contents.push('URL: ' + article.url);
              if (article.place) contents.push('장소: ' + article.place);
              if (article.start_datetime)
                contents.push(
                  '시작 날짜: ' + article.start_datetime.slice(0, 10),
                );
              if (article.end_datetime)
                contents.push(
                  '끝나는 날짜: ' + article.end_datetime.slice(0, 10),
                );
              return contents.join(', ');
            })()}
          />
        ))}
      {searchStatus == SearchStatus.RUNNING && (
        <MemoCard title="검색중 ..." imgUrl={searching} content=" " sub=" " />
      )}
      {searchStatus == SearchStatus.DONE && articles.length == 0 && (
        <MemoCard
          title="검색 결과가 없습니다!"
          imgUrl={empty}
          content=" "
          sub=" "
        />
      )}
      {searchStatus == SearchStatus.DONE && (
        <Pagination size="lg">{renderPaginationItems()}</Pagination>
      )}
    </div>
  );
};

export default ArticleSearchPage;

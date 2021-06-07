import React, { useEffect } from 'react';
import { MapBox } from 'client/ui/components/_ui/MapBox';
import {
  SearchWrapper,
  Content,
} from './styled';

const Search = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <SearchWrapper>
      <Content>
        <MapBox />
      </Content>
    </SearchWrapper>
  );
};

export default Search;

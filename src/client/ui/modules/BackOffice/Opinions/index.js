import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TagSvg, ArchiveSvg, LoupeSvg } from 'client/assets/images';
import { EmptyBlock } from 'client/ui/modules/BackOffice/components/EmptyBlock';
import { loadByParam } from 'client/store/backOffice';
import { OpinionInfo } from 'client/ui/modules/BackOffice/components/OpinionInfo';
import moment from 'moment';
import {
  ReservationWrapper,
  NavBarStyled,
  List,
  LoaderStyled,
} from './styled';

const SEARCH_FIELDS = ['comments', 'create_at'];

const Opinions = () => {
  const rootDispatch = useDispatch();
  const { opinions, loading } = useSelector(state => state.backOffice);
  const { restaurant } = useParams();
  const [t] = useTranslation();
  const [searched, setSearched] = useState(null);
  const [filtred, setFiltred] = useState([]);

  const handleSearch = (str = null) => {
    let result = null;
    if (str && str.length > 0) { 
      result = filtred.filter(item => SEARCH_FIELDS.some(field => {
        let value = item[field];
        if (!value) return false;
        value = value.toString();
        if (Array.isArray(value)) {
          return value.some(val => val.toLowerCase().indexOf(str) > -1);
        }
        return value.toLowerCase().indexOf(str) > -1;
      }));
    }
    setSearched(result);
  };

  useEffect(() => {
    window.prerenderReady = true;
    rootDispatch(loadByParam({
      name: 'data_opinions',
      data: { restaurant },
    }));
  }, []);

  useEffect(() => {
    if (opinions) {
      const result = opinions.sort((a, b) => moment(a.create_at).diff(moment(b.create_at)));
      setFiltred(result);
    }
  }, [opinions]);

  return opinions && (
    <ReservationWrapper>
      <NavBarStyled
        onSearch={handleSearch}
        settings={{
          delete: false,
          loupe: true,
          archive: true,
          back: { text: 'back' },
          title: {
            icon: <TagSvg />,
            text: t('common.words.opinions'),
          },
        }}
      />
      <List>
        {loading && (<LoaderStyled />)}
        {(searched && searched.length === 0) || filtred.length === 0 ? (
          <EmptyBlock
            type={searched ? 'search' : 'noData'}
            icon={searched ? (<LoupeSvg />) : (<ArchiveSvg />)}
          />
        ) : (searched || filtred).map((item, i) => (
          <OpinionInfo 
            {...item}
            key={`_opinions_${i + 1}_${item.id}`}
          />
        ))}
      </List>
    </ReservationWrapper>
  );
};

export default Opinions;

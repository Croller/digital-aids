import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ClockSvg, ArchiveSvg, LoupeSvg } from 'client/assets/images';
import { EmptyBlock } from 'client/ui/modules/BackOffice/components/EmptyBlock';
import { update, loadByParam } from 'client/store/backOffice';
import { ReservationInfo } from 'client/ui/modules/BackOffice/components/ReservationInfo';
import moment from 'moment';
import {
  ReservationWrapper,
  NavBarStyled,
  List,
  LoaderStyled,
} from './styled';

const SEARCH_FIELDS = ['name', 'email', 'phone', 'persons', 'reserve_at'];

const Reservations = () => {
  const rootDispatch = useDispatch();
  const { reserve, loading } = useSelector(state => state.backOffice);
  const { restaurant } = useParams();
  const [t] = useTranslation();
  const [searched, setSearched] = useState(null);
  const [filtred, setFiltred] = useState([]);
  const [data, setData] = useState({
    filter: 'all', // is_approved  (true, false)
    day: moment().format('DD.MM.YYYY'),
  });

  const handleEvent = (obj) => {
    rootDispatch(update({ name: 'data_reserve', data: obj }));
  };

  const handleSearch = (str = null) => {
    let result = null;
    if (str && str.length > 0) { 
      result = filtred.filter(item => SEARCH_FIELDS.some(field => {
        if (!item[field]) return false;
        if (Array.isArray(item[field])) {
          return item[field].some(value => value.toLowerCase().indexOf(str) > -1);
        }
        return item[field].toLowerCase().indexOf(str) > -1;
      }));
    }
    setSearched(result);
  };

  useEffect(() => {
    window.prerenderReady = true;
    rootDispatch(loadByParam({
      name: 'data_reserve',
      data: { restaurant },
    }));
  }, []);

  useEffect(() => {
    if (reserve) {
      const { filter } = data;
      const sorted = reserve.sort((a, b) => moment(a.created_at).diff(moment(b.created_at)));
      const result = filter === 'all' ? sorted : sorted.filter(({ is_approved }) => filter === is_approved);
      setFiltred(result);
    }
  }, [reserve, data]);

  return reserve && (
    <ReservationWrapper>
      <NavBarStyled
        onSearch={handleSearch}
        settings={{
          delete: false,
          back: { text: 'back' },
          title: {
            icon: <ClockSvg />,
            text: t('common.words.reserve'),
          },
        }}
      />
      <List>
        {loading && (<LoaderStyled />)}
        {searched || filtred.length === 0 ? (
          <EmptyBlock
            type={searched ? 'search' : 'noData'}
            icon={searched ? (<LoupeSvg />) : (<ArchiveSvg />)}
          />
        ) : filtred.map((item, i) => (
          <ReservationInfo 
            {...item}
            key={`_reservation_${i + 1}_${item.id}`}
            onEvent={handleEvent}
          />
        ))}
      </List>
    </ReservationWrapper>
  );
};

export default Reservations;

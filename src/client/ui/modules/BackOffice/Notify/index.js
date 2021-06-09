import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { BellSvg, ArchiveSvg, LoupeSvg } from 'client/assets/images';
import { EmptyBlock } from 'client/ui/modules/BackOffice/components/EmptyBlock';
import { update, loadByParam } from 'client/store/backOffice';
import { NotifyInfo } from 'client/ui/modules/BackOffice/components/NotifyInfo';
import moment from 'moment';
import {
  ReservationWrapper,
  NavBarStyled,
  List,
  LoaderStyled,
} from './styled';

const SEARCH_FIELDS = ['create_at'];

const Notify = () => {
  const rootDispatch = useDispatch();
  const { notify, alert, loading } = useSelector(state => state.backOffice);
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

  const handleEvent = (obj) => {
    rootDispatch(update({ name: 'data_notify', data: obj }));
  };

  useEffect(() => {
    window.prerenderReady = true;
    rootDispatch(loadByParam({
      name: 'data_notify',
      data: { restaurant },
    }));
  }, []);

  useEffect(() => {
    if (notify) {
      const result = notify.sort((a, b) => moment(b.create_at).diff(moment(a.create_at)));
      setFiltred(result);
    }
  }, [alert.notify, notify && notify.length]);

  return notify && (
    <ReservationWrapper>
      <NavBarStyled
        onSearch={handleSearch}
        settings={{
          delete: false,
          loupe: true,
          archive: true,
          back: { text: 'back' },
          title: {
            icon: <BellSvg />,
            text: t('common.words.notify'),
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
          <NotifyInfo 
            {...item}
            key={`_opinions_${i + 1}_${item.id}`}
            onEvent={handleEvent}
          />
        ))}
      </List>
    </ReservationWrapper>
  );
};

export default Notify;

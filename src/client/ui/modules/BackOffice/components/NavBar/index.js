import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import { IconText } from 'client/ui/components/_block/IconText';
import {
  ChevronSvg,
  LoupeSvg,
  TrashSvg,
  PlusSvg,
  ArchiveSvg,
  RestaurantSvg,
  CloseSvg,
} from 'client/assets/images';
import {
  NavBarWrapper,
  Control,
  Title,
  BackBtn,
  AddBtn,
  LoupeBtn,
  DeleteBtn,
  ArchiveBtn,
  Search,
} from './styled';

export const NavBar = ({
  settings = {},
  onSearch = () => {},
  onEvent = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const history = useHistory();
  const { restaurant, category } = useParams();
  const { pathname } = useLocation();
  const { roles } = useSelector(state => state.user);
  const [options, setOptions] = useState({
    back: false,
    loupe: false,
    delete: false,
    archive: true,
    add_new: true,
    search: false,
    event: null, // prop for modal
    title: {
      icon: <RestaurantSvg />,
      text: t('common.words.restaurant'),
    },
  });
  const [showConfirm, hideConfirm] = useModal(() => (
    <ConfirmChange
      title={t(`backOffice.confirmModal.${options.event.title}`)}
      textOk={t(`common.words.${options.event.key}`)}
      textCancel={t('common.words.cancel')}
      onCancel={hideConfirm}
      onClose={hideConfirm}
      onOk={() => {
        hideConfirm();
        onEvent(options.event.params);
      }}
    />
  ), [options]);

  const handleRoute = (key) => {
    const pathParts = pathname.split('/');
    let path = '';
    if (key === 'back') {
      history.goBack();
      return;
      // path = `${pathParts[0]}/${pathParts[1]}/restaurants`;
      // if (params.language && params.restaurant) {
      //   path = `${pathParts.slice(0, -1).join('/')}/menu`;
      // }
      // if (pathname.indexOf('/archive') > -1) {
      //   path = pathParts.slice(0, -1).join('/');
      // }
    }
    if (key === 'archive') {
      path = `${pathParts.join('/')}/${key}`;
    }
    if (key === 'new') {
      path = `${pathParts[0]}/${pathParts[1]}/${pathParts[2].slice(0, -1)}/${key}`;
    }
    history.push(path);
  };

  const handleChange = (key = null) => {
    if (!key) return;
    const obj = { ...options };

    if (key === 'loupe') {
      obj.loupe = !options.loupe;
      obj.search = !options.search;
      onSearch();
      setOptions(obj);
      return;
    }
    if (key === 'delete') {
      showConfirm();
      obj.event = {
        key,
        title: restaurant ? 'restaurant.delete' : 'archive',
        params: { is_deleted: true },
      };
      setOptions(obj);
      return;
    }
    onEvent(key);
  };

  const handleSearch = (str) => {
    onSearch(str.toLowerCase());
  };

  useEffect(() => {
    const data = { ...options };
    let page = 'restaurants';
    
    data.loupe = true;
    data.search = false;
    data.back = false;
    data.archive = true;
    data.delete = false;
    data.add_new = true;
    data.title = {
      icon: <RestaurantSvg />,
      text: t(`common.words.${page}`),
    };

    switch (true) {
      case pathname.indexOf('/menu') > -1:
        page = 'dish';
        break;
      case pathname.indexOf('/foodtips') > -1:
        page = 'foodtips';
        break;
      case pathname.indexOf('/special-deals') > -1:
        page = 'deals';
        break;
      default:
        break;
    }

    if (['/restaurant/'].some(f => pathname.indexOf(f) > -1) && restaurant && !category) {
      data.back = { text: 'back' };
      data.loupe = false;
      data.search = false;
      data.delete = restaurant !== 'new';
      data.archive = false;
      data.add_new = false;
      data.title = {
        icon: <RestaurantSvg />,
        text: `${restaurant !== 'new' ? '' : `${t('common.words.create')} `}${t(`common.words.${page}`)}`,
      };
    }

    if (['/restaurants/archive', '/menu', '/special-deals', '/foodtips'].some(f => pathname.indexOf(f) > -1)) {
      data.back = { text: 'back' };
      data.archive = !['/special-deals', '/foodtips'].some(f => pathname.indexOf(f) > -1) && pathname.indexOf('/archive') === -1;
      data.delete = pathname.indexOf('/archive') > -1;
      data.add_new = false;
      data.title = pathname.indexOf('/archive') > -1 && {
        icon: <ArchiveSvg />,
        text: `${t(`common.words.${page}`)} ${t('common.words.archive')}`,
      };
    }
    setOptions({ ...data, ...settings });
  }, [pathname]);

  return options && (
    <NavBarWrapper className={className}>
      <Control>
        {options.back && (
          <BackBtn onClick={() => handleRoute('back')}>
            <ChevronSvg />
            {t(`common.words.${options.back.text}`)}
          </BackBtn>
        )}
        {options.add_new && roles.some(f => f.guest || f.root || f.root_back) && (
          <AddBtn onClick={() => handleRoute('new')}>
            <PlusSvg />
            {t('common.words.newAdd')}
          </AddBtn>
        )}
      </Control>
      {options.title && (
        <Title archive={pathname.indexOf('archive') > -1}>
          {options.title && !options.search && (<IconText {...options.title} />)}
          {options.search && (
            <Search
              onChange={handleSearch}
              prefix={<LoupeSvg />}
              suffix={<CloseSvg onClick={() => handleChange('loupe')} />}
              placeholder={t('common.words.search')}
            />
          )}
        </Title>
      )}
      <Control>
        {options.loupe && (
          <LoupeBtn onClick={() => handleChange('loupe')}>
            <LoupeSvg />
          </LoupeBtn>
        )}
        {options.delete && roles.some(f => f.manager || f.manager_back || f.root || f.root_back) && (
          <Tooltip placement="top" title={t('common.words.delete')}>
            <DeleteBtn onClick={() => handleChange('delete')}>
              <TrashSvg />
            </DeleteBtn>
          </Tooltip>
        )}
        {options.archive && roles.some(f => f.manager || f.manager_back || f.root || f.root_back) && (
          <ArchiveBtn onClick={() => handleRoute('archive')}>
            <ArchiveSvg />
            {t('common.words.archive')}
          </ArchiveBtn>
        )}
      </Control>
    </NavBarWrapper>
  );
};

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconText } from 'client/ui/components/_block/IconText';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
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
  NavbarRestaurant,
  Control,
  Title,
  BackBtn,
  AddBtn,
  LoupeBtn,
  DeleteBtn,
  ArchiveBtn,
  Search,
} from './styled';

export const Navbar = ({
  settings = null,
  onChange = () => {},
  onEvent = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const history = useHistory();
  const params = useParams();
  const { pathname } = useLocation();
  const { roles } = useSelector(state => state.user.info);
  const [options, setOptions] = useState(settings || {
    back: false,
    loupe: true,
    delete: false,
    archive: true,
    add_new: true,
    title: true,
    search: false,
    event: null, // prop for modal
  });
  const [showConfir, hideConfirm] = useModal(() => (
    <ConfirmChange
      title={t(`backOffice.confirmModal.${options.event.title}`)}
      textOk={t(`common.words.${options.event.key}`)}
      textCancel={t('common.words.doNot')}
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
      if (history.action !== 'POP' && params.language && params.restaurant) {
        history.goBack();
        return null;
      }
      path = `${pathParts[0]}/${pathParts[1]}/restaurants`;
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
      setOptions(obj);
      return;
    }
    if (key === 'delete') {
      showConfir();
      obj.event = {
        key,
        title: pathname.restaurant ? 'restaurant.delete' : 'archive',
        params: { is_deleted: true },
      };
      setOptions(obj);
      return;
    }
    onEvent(key);
  };

  const handleSearch = (val) => {
    console.log(val);
    onChange(val);
  };

  const haveRole = (arr) => arr.some(s => roles.includes(s));

  useEffect(() => {
    const data = { ...options };
    const pathParts = pathname.split('/');
    const page = pathParts[2] || 'restaurants';

    if (pathParts[2] === 'restaurants') {
      data.back = false;
      data.loupe = true;
      data.delete = false;
      data.archive = true;
      data.add_new = true;
      data.title = {
        icon: <RestaurantSvg />,
        text: t(`common.words.${page}`),
      };
    }

    if (pathname.indexOf('archive') > -1) {
      data.back = true;
      data.delete = true;
      data.archive = false;
      data.add_new = false;
      data.title = {
        icon: <ArchiveSvg />,
        text: `${t('common.words.archive')} ${t(`common.words.${page}`)}`,
      };
    }

    if (pathParts[2] === 'restaurant' && params.restaurant) {
      data.back = true;
      data.loupe = false;
      data.search = false;
      data.delete = params.restaurant !== 'new';
      data.archive = false;
      data.add_new = false;
      data.title = {
        icon: <RestaurantSvg />,
        text: `${params.restaurant !== 'new' ? '' : `${t('common.words.create')} `}${t(`common.words.${page}`)}`,
      };
    }

    setOptions(data);
  }, [pathname]);

  return options && (
    <NavbarRestaurant className={className}>
      <Control>
        {options.back && (
          <BackBtn onClick={() => handleRoute('back')}>
            <IconText
              icon={<ChevronSvg />}
              text={t('common.words.back')}
            />
          </BackBtn>
        )}
        {options.add_new && haveRole([1, 2]) && (
          <AddBtn onClick={() => handleRoute('new')}>
            <IconText
              icon={<PlusSvg />}
              text={t('common.words.add_new')}
            />
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
        {options.delete && haveRole([1, 2]) && (
          <Tooltip placement="top" title={t('common.words.delete')}>
            <DeleteBtn onClick={() => handleChange('delete')}>
              <TrashSvg />
            </DeleteBtn>
          </Tooltip>
        )}
        {options.archive && haveRole([1, 2]) && (
          <ArchiveBtn onClick={() => handleRoute('archive')}>
            <IconText
              icon={<ArchiveSvg />}
              text={t('common.words.archive')}
            />
          </ArchiveBtn>
        )}
      </Control>
    </NavbarRestaurant>
  );
};

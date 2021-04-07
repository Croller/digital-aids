import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconText } from 'client/ui/components/_ui/_etc/IconText';
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
  TopbarWrapper,
  Control,
  Title,
  BackBtn,
  AddBtn,
  LoupeBtn,
  DeleteBtn,
  ArchiveBtn,
  Search,
} from './styled';

export const Topbar = ({
  settings = null,
  onSearch = () => {},
  onChange = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const history = useHistory();
  const params = useParams();
  const { pathname } = useLocation();
  const [options, setOptions] = useState(settings || {
    back: false,
    loupe: true,
    delete: false,
    archive: true,
    add_new: true,
    title: true,
    search: false,
  });

  const handleRoute = (key) => {
    const pathParts = pathname.split('/');
    let path = '';
    if (key === 'back') {
      path = pathParts.slice(0, -1).join('/');
      if (history.action !== 'POP') {
        history.goBack();
        return null;
      }
    }
    if (key === 'archive') {
      path = `${pathParts.join('/')}/${key}`;
    }
    if (key === 'new') {
      path = `${pathParts[0]}/${pathParts[1]}/${pathParts[2].slice(0, -1)}/${key}`;
    }
    history.push(path);
  };

  const handleChange = (controlKey = null) => {
    if (!controlKey) return;
    const obj = { ...options };

    if (controlKey === 'loupe') {
      obj.loupe = !obj.loupe;
      obj.search = !obj.search;
    }

    setOptions({ ...obj });
    onChange(controlKey);
  };

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
    <TopbarWrapper className={className}>
      <Control>
        {options.back && (
          <BackBtn onClick={() => handleRoute('back')}>
            <IconText
              icon={<ChevronSvg />}
              text={t('common.words.back')}
            />
          </BackBtn>
        )}
        {options.add_new && (
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
              onChange={onSearch}
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
        {options.delete && (
          <DeleteBtn onClick={() => handleChange('delete')}>
            <TrashSvg />
          </DeleteBtn>
        )}
        {options.archive && (
          <ArchiveBtn onClick={() => handleRoute('archive')}>
            <IconText
              icon={<ArchiveSvg />}
              text={t('common.words.archive')}
            />
          </ArchiveBtn>
        )}
      </Control>
    </TopbarWrapper>
  );
};

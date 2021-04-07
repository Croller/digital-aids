import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
  params = null,
  onSearch = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const history = useHistory();
  const { pathname } = useLocation();
  const [options, setOptions] = useState(params || {
    back: false,
    loupe: true,
    delete: false,
    archive: true,
    add_new: true,
    title: null,
  });
  
  const handleRoute = (key) => {
    const pathParts = pathname.split('/');
    let path = '';
    if (key === 'back') {
      path = pathParts.slice(0, -1).join('/');
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
    }

    setOptions({ ...obj });
  };

  useEffect(() => {
    const data = { ...options };
    const pathParts = pathname.split('/');
    const page = pathParts[2] || 'restaurants';

    if (pathname.indexOf('restaurants') > -1) {
      data.back = false;
      data.loupe = true;
      data.delete = false;
      data.archive = true;
      data.add_new = true;
    }

    if (pathname.indexOf('archive') > -1) {
      data.back = true;
      data.delete = true;
      data.archive = false;
      data.add_new = false;
    }

    data.title = {
      icon: !data.archive ? <ArchiveSvg /> : <RestaurantSvg />,
      text: `${!data.archive ? `${t('common.words.archive')} ` : ''}${t(`common.words.${page}`)}`,
    };
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
      {!options.loupe && (
        <Search
          onChange={onSearch}
          prefix={<LoupeSvg />}
          suffix={<CloseSvg onClick={() => handleChange('loupe')} />}
          placeholder={t('common.words.search')}
        />
      )}
      {options.loupe && options.title && (
        <Title archive={!options.archive}>
          {options.loupe ? (
            <IconText {...options.title} />
          ) : (
            <Search
              onChange={onSearch}
              prefix={<LoupeSvg />}
              suffix={<CloseSvg onClick={() => handleChange('loupe')} />}
              placeholder
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

import React, { useState } from 'react';
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
  page = 'restaurants',
  params = {
    back: false,
    loupe: true,
    delete: false,
    archive: true,
    add_new: true,
  },
  onSearch = () => {},
  onChange = () => {},
  onRoute = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const [options, setOptions] = useState(params);
  const title = {
    icon: !options.archive ? <ArchiveSvg /> : <RestaurantSvg />,
    text: `${!options.archive ? `${t('common.words.archive')} ` : ''}${t(`common.words.${page}`)}`,
  };

  const handleChange = (controlKey = null) => {
    if (!controlKey) return;
    const obj = { ...options };

    if (controlKey === 'loupe') {
      obj.loupe = !obj.loupe;
    }

    setOptions({ ...obj });
    onChange(controlKey);
  };

  return options && (
    <TopbarWrapper className={className}>
      <Control>
        {options.back && (
          <BackBtn onClick={() => onRoute('back')}>
            <IconText
              icon={<ChevronSvg />}
              text={t('common.words.back')}
            />
          </BackBtn>
        )}
        {options.add_new && (
          <AddBtn onClick={() => onRoute('new')}>
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
      {options.loupe && (
        <Title archive={!options.archive}>
          {options.loupe ? (
            <IconText {...title} />
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
          <ArchiveBtn onClick={() => onRoute('archive')}>
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

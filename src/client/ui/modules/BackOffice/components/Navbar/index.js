import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconText } from 'client/ui/components/_ui/_etc/IconText';
import {
  ChevronSvg,
  LoupeSvg,
  TrashSvg,
  PlusSvg,
  ArchiveSvg,
  RestaurantSvg,
} from 'client/assets/images';
import {
  Wrapper,
  Control,
  Title,
  BackBtn,
  AddBtn,
  LoupeBtn,
  DeleteBtn,
  ArchiveBtn,
  Search,
} from './styled';

export const Navbar = memo(({
  options = {
    back: false,
    loupe: true,
    title: true,
    delete: false,
    archive: true,
    add_new: true,
  },
  onClick = () => {},
  onRoute = () => {},
}) => {
  const [t] = useTranslation();

  const getTitle = () => `${options.archive ? `${t('common.words.archive')} ` : ''}${t('common.words.restourants')}`;

  const getIcon = () => (options.archive ? <ArchiveSvg /> : <RestaurantSvg />);

  return options && (
    <Wrapper>
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
          <AddBtn onClick={() => onRoute('add_new')}>
            <IconText
              icon={<PlusSvg />}
              text={t('common.words.add_new')}
            />
          </AddBtn>
        )}
      </Control>
      {options.search && (
        <Search />
      )}
      {options.title && (
        <Title archive={options.archive}>
          <IconText
            icon={getIcon()}
            text={getTitle()}
          />
        </Title>
      )}
      <Control>
        {options.loupe && (
          <LoupeBtn onClick={() => onClick('loupe')}>
            <LoupeSvg />
          </LoupeBtn>
        )}
        {options.delete && (
          <DeleteBtn onClick={() => onClick('delete')}>
            <TrashSvg />
          </DeleteBtn>
        )}
        {options.archive && (
          <ArchiveBtn onClick={() => onClick('archive')}>
            <IconText
              icon={<ArchiveSvg />}
              text={t('common.words.archive')}
            />
          </ArchiveBtn>
        )}
      </Control>
    </Wrapper>
  );
});

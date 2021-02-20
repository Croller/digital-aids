import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScrollHideBlockStyled,
  Wrapper,
  Item,
  IconWrapper, CountBandage, Icon,
  Text,
} from './styled';

export const FooterMenu = memo(({
  onClick,
}) => {
  const [t] = useTranslation();
  const ITEMS = [
    {
      key: 'language',
      image: '',
      text: t('footerMobileMenu.lng'),
    },
    {
      key: 'menu',
      image: '',
      text: t('footerMobileMenu.menu'),
    },
    {
      key: 'order',
      image: '',
      text: t('footerMobileMenu.order'),
    },
  ];

  return (
    <ScrollHideBlockStyled direction="down">
      <Wrapper>
        {ITEMS.map((item, i) => (
          <Item
            key={`_menu_item_${i + 1}`}
            onClick={() => onClick(`/${item.key}`)}
          >
            <IconWrapper>
              {i === 2 && (
                <CountBandage>
                  2
                </CountBandage>
              )}
              <Icon />
            </IconWrapper>
            <Text>{item.text}</Text>
          </Item>
        ))}
      </Wrapper>
    </ScrollHideBlockStyled>
  );
});

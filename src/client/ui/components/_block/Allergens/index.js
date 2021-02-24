import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ALLERGENS } from './constants';
import { 
  Wrapper,
  List,
  Item,
  IconWrapper,
  Text,
  Description,
} from './styled';

export const Allergens = memo(({
  list = null,
  className,
}) => {
  const [t] = useTranslation();
  return (
    <Wrapper className={className}>
      <List>
        {[...(list || ALLERGENS)].map(({ key, icon }) => (
          <Item
            key={`_allergen_${key}`}
          >
            {icon && (
              <IconWrapper>
                {icon}
              </IconWrapper>
            )}
            <Text>
              {t(`compAllergens.allergens.${key}`)}
            </Text>
          </Item>
        ))}
      </List>
      <Description>
        {t('compAllergens.descriptions')}
      </Description>
    </Wrapper>
  );
});

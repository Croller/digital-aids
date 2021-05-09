import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getDictionaryItem } from 'client/utils/common';
import { ALLERGENS } from './constants';
import { 
  Wrapper,
  List,
  Item,
  ImgWrapper,
  Text,
  Description,
} from './styled';

export const Allergens = memo(({
  source = null,
  className,
}) => {
  const [t] = useTranslation();
  return (
    <Wrapper className={className}>
      {source && (
        <List>
          {source.map(({ id, name }) => (
            <Item key={`_allergen_${id}`}>
              <ImgWrapper src={getDictionaryItem(id, 'key', ALLERGENS, 'src')} />
              <Text>
                {name}
              </Text>
            </Item>
          ))}
        </List>
      )}
      <Description>
        {t('restaurant.compAllergens.descriptions')}
      </Description>
    </Wrapper>
  );
});

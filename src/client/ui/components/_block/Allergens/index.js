import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
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

  const getAllergens = (arr = null) => {
    if (!arr) return ALLERGENS;
    return ALLERGENS.filter(f => arr.some(s => s === f.id));
  };

  return (
    <Wrapper className={className}>
      <List>
        {getAllergens(source).map(({ key, src }) => (
          <Item
            key={`_allergen_${key}`}
          >
            <ImgWrapper src={src} />
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

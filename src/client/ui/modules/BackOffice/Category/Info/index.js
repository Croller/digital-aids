import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Item,
  Label,
  Field,
  InfoWrapper,
} from './styled';

const Block = ({
  label = null,
  text = null,
}) => (
  <Item>
    {label && (
      <Label>
        {label}
      </Label>
    )}
    {text && (
      <Field>
        {text}
      </Field>
    )}
  </Item>
);

export const Info = ({
  options = null,
  page = 'foodtips',
  className,
}) => {
  const [t] = useTranslation();
  const [param, setParams] = useState(null);

  useEffect(() => {
    if (options) {
      const {
        rules = null,
      } = options;

      if (['foodtips', 'special-deals'].includes(page) && rules) {
        setParams({
          info: {
            label: t('common.words.info'),
            text: (t(`backOffice.info.${page}.info`)).replace('/maxLength/', rules.info.maxLength),
          },
        });
      }
    }
    return () => {
      setParams(null);
    };
  }, [options]);

  return options && param && (
    <InfoWrapper className={className}>
      {Object.keys(param).map((key, k) => (
        <Block
          key={`_block_${key}_${k + 1}`}
          {...param[key]}
        />
      ))}
    </InfoWrapper>
  );
};

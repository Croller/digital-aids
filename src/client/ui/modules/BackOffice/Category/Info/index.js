import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Item,
  Label,
  Descriptions,
  InfoWrapper,
} from './styled';

const Block = ({
  label = null,
  descriptions = null,
}) => (
  <Item>
    {label && (
      <Label>
        {label}
      </Label>
    )}
    {descriptions && (
      <Descriptions>
        {descriptions}
      </Descriptions>
    )}
  </Item>
);

export const Info = memo(({
  options = null,
  className,
}) => {
  const [t] = useTranslation();
  const {
    rules = null,
  } = options;

  return options && (
    <InfoWrapper className={className}>
      {rules && Object.keys(rules.info).map((key, k) => (
        <Block
          key={`_info_${key}_${k + 1}`}
          label="Info"
          descriptions={t['common.backOffice']}
        />
      ))}
    </InfoWrapper>
  );
});

import React, { memo, useState } from 'react';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { getDictionaryItem } from 'client/utils/common';
import { OPINION_RATING } from 'client/utils/constants';
import moment from 'moment';
import {
  StarHalfDashedSvg,
  CalendarSvg,
  PlusSvg,
  CloseSvg,
} from 'client/assets/images';
import { 
  Wrapper,
  Head,
  Rate,
  ValuationWrapper,
  Valuation, ValuationText,
  EmojiWrapper,
  Date,
  Controls,
  Control,
  Hr, Comment,
} from './styled';

export const OpinionInfo = memo(({
  rate,
  create_at,
  className,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [t] = useTranslation();
  const category = Object.keys(rate).filter(f => f !== 'comments');

  const rateCalc = () => {
    const total = category.length;
    const calc = category.reduce((sum, key) => (rate[key] ? sum + rate[key] : sum), 0);
    return Math.floor(calc / total);
  };

  return (
    <Wrapper className={className}>
      <Head>
        <Rate
          icon={<StarHalfDashedSvg />}
          text={`${rateCalc()} / ${category.length}`}
        />
        <ValuationWrapper>
          {category.map(key => (
            <Valuation key={key}>
              <EmojiWrapper>
                {getDictionaryItem(rate[key], 'value', OPINION_RATING, 'icon')}
              </EmojiWrapper>
              <ValuationText>
                {t(`restaurant.pageOpinion.rate.${key}`)}
              </ValuationText>
            </Valuation>
          ))}
        </ValuationWrapper>
        <Date
          icon={<CalendarSvg />}
          text={(
            <>
              {moment(create_at).format('DD.MM.YYYY')}
              <br />
              {moment(create_at).format('HH:mm')}
            </>
          )}
        />
        <Controls>
          <Tooltip placement="top" title={t('common.words.more')}>
            <Control
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <CloseSvg /> : <PlusSvg />}
            </Control>
          </Tooltip>
        </Controls>
      </Head>
      {collapsed && (
        <>
          <Hr />
          <Comment>
            {`${t('common.words.comments')}: ${rate.comments}`}
          </Comment>
        </>
      )}
    </Wrapper>
  );
});

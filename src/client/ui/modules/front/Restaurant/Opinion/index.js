import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  EmojiiVeryAngryPng,
  EmojiiSmilingFacePng,
  EmojiiVerySadPng,
  EmojiiHeartEyesPng,
} from 'client/assets/images';
import {
  Wrapper,
  Title,
  Description,
  RateWrapper,
  RateContainer,
  RateTitle,
  ValuationWrapper, Valuation,
  Img,
  CommentTitle,
  CommentControl,
  SendButton,
} from './styled';

const RATE = [
  'service',
  'meal',
  'covid',
  'menu',
];

const RATING = [
  {
    key: 'love',
    value: 4,
    src: EmojiiHeartEyesPng,
  },
  {
    key: 'satisfied',
    value: 3,
    src: EmojiiSmilingFacePng,
  },
  {
    key: 'disappointed',
    value: 2,
    src: EmojiiVerySadPng,
  },
  {
    key: 'angry',
    value: 1,
    src: EmojiiVeryAngryPng,
  },
];

const Opinion = () => {
  const history = useHistory();
  const [t] = useTranslation();
  const [rating, setRating] = useState({});
  const [comment, setComment] = useState('');

  const handleClickRate = (obj) => {
    setRating({ ...rating, ...obj });
  };

  const handleChangeComment = (e) => {
    e.stopPropagation();
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    console.log('send opinion', {
      ...rating,
      comment,
    });
    history.push('categories');
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <Title>
        {t('pageOpinion.title')}
      </Title>
      <Description>
        {t('pageOpinion.descriptions')}
      </Description>
      <RateWrapper>
        {RATE.map((rate) => (
          <RateContainer key={rate}>
            <RateTitle>
              {t(`pageOpinion.rate.${rate}`)}
            </RateTitle>
            <ValuationWrapper>
              {RATING.map(({ key, src }) => (
                <Valuation
                  key={key}
                  active={(rating[rate] && rating[rate] === key) || false}
                  onClick={() => handleClickRate({ [rate]: key })}
                >
                  <Img src={src} />
                  {t(`pageOpinion.rating.${key}`)}
                </Valuation>
              ))}
            </ValuationWrapper>
          </RateContainer>
        ))}
      </RateWrapper>
      <CommentTitle>
        {t('common.comments')}
      </CommentTitle>
      <CommentControl rows={1} onChange={handleChangeComment} />
      <SendButton onClick={handleSubmit}>
        {t('common.send')}
      </SendButton>
    </Wrapper>
  );
};

export default Opinion;

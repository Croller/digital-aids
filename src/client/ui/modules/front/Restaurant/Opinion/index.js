import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { OpinionModal } from 'client/ui/components/_block/Modal/Opinion';
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
  EmojiWrapper,
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
    icon: '😍',
    src: EmojiiHeartEyesPng,
  },
  {
    key: 'satisfied',
    value: 3,
    icon: '😊',
    src: EmojiiSmilingFacePng,
  },
  {
    key: 'disappointed',
    value: 2,
    icon: '😟',
    src: EmojiiVerySadPng,
  },
  {
    key: 'angry',
    value: 1,
    icon: '😡',
    src: EmojiiVeryAngryPng,
  },
];

const Opinion = () => {
  const history = useHistory();
  const [t] = useTranslation();
  const [rating, setRating] = useState({});
  const [comment, setComment] = useState('');
  const [existOpinion, setExistOpinion] = useState(false);

  const handleClickRate = (obj) => {
    setRating({ ...rating, ...obj });
  };

  const handleChangeComment = (e) => {
    e.stopPropagation();
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // console.log('send opinion', {
    //   ...rating,
    //   comment,
    // });
    // history.push('categories');
    setExistOpinion(true);
  };

  const handleCloseModal = () => {
    setExistOpinion(false);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
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
                {RATING.map(({ key, icon }) => (
                  <Valuation
                    key={key}
                    active={(rating[rate] && rating[rate] === key) || false}
                    onClick={() => handleClickRate({ [rate]: key })}
                  >
                    <EmojiWrapper>
                      {icon}
                    </EmojiWrapper>
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
      {existOpinion && (
        <OpinionModal onOk={handleCloseModal} />
      )}
    </>
  );
};

export default Opinion;

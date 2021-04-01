import React, { useState, useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import { useTranslation } from 'react-i18next';
// import { useHistory } from 'react-router-dom';
import { OpinionModal } from 'client/ui/components/_block/Modal/Opinion';

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
  },
  {
    key: 'satisfied',
    value: 3,
    icon: '😊',
  },
  {
    key: 'disappointed',
    value: 2,
    icon: '😟',
  },
  {
    key: 'angry',
    value: 1,
    icon: '😡',
  },
];

const Opinion = () => {
  // const history = useHistory();
  const [t] = useTranslation();
  const [rating, setRating] = useState({});
  const [comment, setComment] = useState('');
  const [existOpinion, hideModal] = useModal(() => (
    <OpinionModal onOk={hideModal} />
  ));

  const handleClickRate = (obj) => {
    setRating({ ...rating, ...obj });
  };

  const handleChangeComment = (e) => {
    e.stopPropagation();
    setComment(e.target.value);
  };

  // const handleSubmit = () => {
  // console.log('send opinion', {
  //   ...rating,
  //   comment,
  // });
  // history.push('categories');
  // setExistOpinion(true);
  // };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      <Wrapper>
        <Title>
          {t('restaurant.pageOpinion.title')}
        </Title>
        <Description>
          {t('restaurant.pageOpinion.descriptions')}
        </Description>
        <RateWrapper>
          {RATE.map((rate) => (
            <RateContainer key={rate}>
              <RateTitle>
                {t(`restaurant.pageOpinion.rate.${rate}`)}
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
                    {t(`restaurant.pageOpinion.rating.${key}`)}
                  </Valuation>
                ))}
              </ValuationWrapper>
            </RateContainer>
          ))}
        </RateWrapper>
        <CommentTitle>
          {t('restaurant.common.comments')}
        </CommentTitle>
        <CommentControl rows={1} onChange={handleChangeComment} />
        <SendButton onClick={existOpinion}>
          {t('restaurant.common.send')}
        </SendButton>
      </Wrapper>
    </>
  );
};

export default Opinion;

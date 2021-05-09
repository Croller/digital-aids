import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from 'react-modal-hook';
import { useTranslation } from 'react-i18next';
import { OpinionModal } from 'client/ui/components/_block/Modal/Opinion';
import { getLocal, setLocal } from 'client/utils/localStorageEdit';
import { renderToStaticMarkup } from 'react-dom/server';
import { showMessage } from 'client/ui/components/_ui/Message';
import { OpinionMail } from 'client/ui/components/Mails/Opinion';
import { sendFromInfo } from 'client/providers/common';
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

export const RATING = [
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
  const { user: { info: { token } }, restaurant: { info: { name, opinion } } } = useSelector(s => s);
  const [t] = useTranslation();
  const [rating, setRating] = useState({});
  const [comments, setComments] = useState('');
  const [existOpinion, hideModal] = useModal(() => (
    <OpinionModal onOk={hideModal} />
  ));

  const mail = renderToStaticMarkup(
    <OpinionMail
      rating={rating}
      commemts={comments}
    />,
  );

  console.log('mail', mail);

  const handleClickRate = (obj) => {
    setRating({ ...rating, ...obj });
  };

  const handleChangeComment = (e) => {
    e.stopPropagation();
    setComments(e.target.value);
  };

  const handleSend = async () => {
    const local = getLocal();
    const { restaurant: { opnionSend } } = local;
    if (opnionSend) {
      existOpinion();
    } else {
      await sendFromInfo({
        token,
        data: {
          to: process.env.NODE_ENV === 'development' ? '79104643015@yandex.ru' : opinion,
          subject: `${name} - ${t('restaurant.pageOpinion.title')}`,
          body: mail,
          html: true,
        },
      });
      showMessage({ type: 'success', content: t('restaurant.pageOpinion.mail.send') });
      local.restaurant.opnionSend = true;
      setLocal(local);
    }
  };

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
        <CommentControl minRows={2} onChange={handleChangeComment} value={comments} />
        <SendButton onClick={handleSend}>
          {t('restaurant.common.send')}
        </SendButton>
      </Wrapper>
    </>
  );
};

export default Opinion;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'react-modal-hook';
import { useTranslation } from 'react-i18next';
import { OpinionModal } from 'client/ui/components/_block/Modal/Opinion';
import { getLocal, setLocal } from 'client/utils/localStorageEdit';
import { showMessage } from 'client/ui/components/_ui/Message';
import { updateRow } from 'client/store/restaurant';
import { OPINION_CATEGORY, OPINION_RATING } from 'client/utils/constants';
// import { OpinionMail } from 'client/ui/components/Mails/Opinion';
// import { renderToStaticMarkup } from 'react-dom/server';
// import { sendFromInfo } from 'client/providers/common';
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

const Opinion = () => {
  const { id } = useSelector(s => s.restaurant.info);
  const rootDispatch = useDispatch();
  const [t] = useTranslation();
  const [data, setData] = useState({
    service: null,
    meal: null,
    covid: null,
    menu: null,
    comments: null,
  });
  const [existOpinion, hideModal] = useModal(() => (
    <OpinionModal onOk={hideModal} />
  ));

  const handleClickRate = (obj) => {
    setData({ ...data, ...obj });
  };

  const handleChangeComment = (e) => {
    e.stopPropagation();
    setData({ ...data, comments: e.target.value });
  };

  const handleSend = async () => {
    const local = getLocal();
    const { restaurant: { opnionSend } } = local;

    if (opnionSend) {
      existOpinion();
      return;
    }
    const mapper = Object.keys(data).reduce((obj, key) => {
      if (key !== 'comments') {
        const rate = OPINION_RATING.find(f => f.key === data[key]);
        return { ...obj, [key]: rate.value };
      }
      return { ...obj, [key]: data[key] };
    }, {});

    rootDispatch(updateRow({
      name: 'data_opinions',
      data: {
        restaurant: id,
        rate: mapper,
      },
    }));
    showMessage({ type: 'success', content: t('restaurant.pageOpinion.mail.send') });
    local.restaurant.opnionSend = true;
    setLocal(local);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  // const handleSend = async () => {
  //   const local = getLocal();
  //   const { restaurant: { opnionSend } } = local;
  //   if (opnionSend) {
  //     existOpinion();
  //   } else {
  //     await sendFromInfo({
  //       token,
  //       data: {
  //         to: process.env.NODE_ENV === 'development' ? '79104643015@yandex.ru' : opinion,
  //         subject: `${name} - ${t('restaurant.pageOpinion.title')}`,
  //         body: mail,
  //         html: true,
  //       },
  //     });
  //     showMessage({ type: 'success', content: t('restaurant.pageOpinion.mail.send') });
  //     local.restaurant.opnionSend = true;
  //     setLocal(local);
  //   }
  // };

  // const mail = renderToStaticMarkup(
  //   <OpinionMail
  //     rating={rating}
  //     commemts={comments}
  //   />,
  // );

  // console.log('mail', mail);

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
          {OPINION_CATEGORY.map((rate) => (
            <RateContainer key={rate}>
              <RateTitle>
                {t(`restaurant.pageOpinion.rate.${rate}`)}
              </RateTitle>
              <ValuationWrapper>
                {OPINION_RATING.map(({ key, icon }) => (
                  <Valuation
                    key={key}
                    active={(data[rate] && data[rate] === key) || false}
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
        <CommentControl minRows={2} onChange={handleChangeComment} value={data.comments} />
        <SendButton onClick={handleSend}>
          {t('restaurant.common.send')}
        </SendButton>
      </Wrapper>
    </>
  );
};

export default Opinion;

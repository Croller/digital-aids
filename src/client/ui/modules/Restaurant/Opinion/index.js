import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'react-modal-hook';
import { useTranslation } from 'react-i18next';
import { OpinionModal } from 'client/ui/components/_block/Modal/Opinion';
import { getLocalRestaurant, setLocalRestaurant } from 'client/utils/localStorage';
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
  const { id, key } = useSelector(s => s.restaurant.info);
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
    const local = getLocalRestaurant(key);
    const { opinionSend } = local;

    if (opinionSend) {
      existOpinion();
      return;
    }
    const mapper = Object.keys(data).reduce((obj, k) => {
      if (k !== 'comments') {
        const rate = OPINION_RATING.find(f => f.key === data[k]);
        return { ...obj, [k]: rate.value };
      }
      return { ...obj, [k]: data[k] };
    }, {});

    rootDispatch(updateRow({
      name: 'data_opinions',
      data: {
        restaurant: id,
        rate: mapper,
      },
    }));
    showMessage({ type: 'success', content: t('restaurant.pageOpinion.mail.send') });
    local.opinionSend = true;
    setLocalRestaurant(key, local);
  };

  // const handleSend = async () => {
  //   const local = getLocal();
  //   const { restaurant: { opinionSend } } = local;
  //   if (opinionSend) {
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
  //     local.restaurant.opinionSend = true;
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
          {OPINION_CATEGORY.map(rate => (
            <RateContainer key={rate}>
              <RateTitle>
                {t(`restaurant.pageOpinion.rate.${rate}`)}
              </RateTitle>
              <ValuationWrapper>
                {OPINION_RATING.map(item => (
                  <Valuation
                    key={item.key}
                    active={(data[rate] && data[rate] === item.key) || false}
                    onClick={() => handleClickRate({ [rate]: item.key })}
                  >
                    <EmojiWrapper>
                      {item.icon}
                    </EmojiWrapper>
                    {t(`restaurant.pageOpinion.rating.${item.key}`)}
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

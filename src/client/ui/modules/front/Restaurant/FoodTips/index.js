import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DontWaste } from 'client/ui/components/Footer/DontWaste';
import { 
  CloseSvg,
  FoodTipsTempPng,
} from 'client/assets/images';
import { 
  Wrapper,
  CloseButton,
  Slider,
  ImgWrapper,
  Img,
  Content,
  Dish,
  Description,
  PriceWrapper,
  Total,
  Price,
  AddButton,
} from './styled';

const FoodTips = () => {
  const {
    key,
    currency,
    dishes,
  } = useSelector(store => store.restaurant);
  const { dish } = useParams();
  const history = useHistory();
  const [t] = useTranslation();
  const [item, setItem] = useState(null);

  const handleRoute = () => {
    const path = `/restaurant/${key}/categories`;

    if (history.action !== 'POP') {
      history.goBack();
      return null;
    }
    history.push(path);
  };

  useEffect(() => {
    window.prerenderReady = true;
    setItem(dishes.find(f => f.key === dish) || null);
  }, []);

  return item && (
    <Wrapper>
      <CloseButton onClick={() => handleRoute('categories')}>
        <CloseSvg />
      </CloseButton>
      <Slider
        autoPlay
        showThumbs={false}
      >
        {item.images ? item.images.map((src, s) => (
          <ImgWrapper key={`_image_${s + 1}`}>
            <Img src={src} />
          </ImgWrapper>
        )) : [...(new Array(5))].map((src, s) => (
          <ImgWrapper key={`_image_${s + 1}`}>
            <Img src={FoodTipsTempPng} />
          </ImgWrapper>
        ))}
      </Slider>
      <Content>
        <Dish>
          {item.name}
        </Dish>
        <Description>
          {item.foodtips}
        </Description>
        <PriceWrapper>
          <Total>
            {`${t('common.total')}:`}
          </Total>
          <Price>
            {item.price.toFixed(2)}
            {t(`common.currency.${currency[0]}`)}
          </Price>
        </PriceWrapper>
        <AddButton>
          {t('common.add_to_order')}
        </AddButton>
      </Content>
      <DontWaste />
    </Wrapper>
  );
};

export default FoodTips;

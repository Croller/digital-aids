import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronSvg, InfoCircleSvg, RestaurantLogoTempPng } from 'client/assets/images';
import { getTotal } from 'client/utils/restaurant';
import QRCode from 'qrcode.react';
import moment from 'moment';
import {
  Wrapper,
  Header, BackButton,
  QRCodeWrapper, Logo, AlertWrapper,
  ReceiptWrapper,
  DateTime,
  CategoryWrapper,
  NameWrapper, Name, Price, NameCategory,
  GroupWrapper, GroupTitle, GroupItem,
  GroupName, DishNumber, DishName,
  Total, TotalText, TotalSumm,
} from './styled';

const Receipt = () => {
  const { 
    user: {
      lng,
    },
    restaurant: {
      key,
      currency,
      logo,
      order,
    },
  } = useSelector(store => store);
  const history = useHistory();
  const [t] = useTranslation();
  const [categoryOrder, setCategoryOrder] = useState(null);

  const handleRouteOrder = () => {
    history.goBack();
  };

  const handleRoute = (path = 'categories') => {
    history.push(`/restaurant/${key}/${path}`);
  };

  const getDateTime = (str) => {
    moment.locale(str);
    return moment().format('DD.MM.YYYY HH:mm');
  };

  const getDish = (item, dailyname) => {
    const data = dailyname ? item.dish : item;
    return {
      ...data,
      order_count: data.order_count || 1,
    };
  };

  // const getQRCodeValue = ()

  const getTitle = (arr, category, index) => (
    <NameWrapper>
      {!category.dailymenu && ((arr[index - 1] && arr[index - 1].dailymenu) || index === 0) && (
        <>
          <Name>
            {t('common.menu')}
          </Name>
          <br />
        </>
      )}
      <NameCategory>
        <Name>
          {category.name}
        </Name>
        {category.dailymenu && (
          <Price>
            {`${category.order_count ? category.order_count : 1} X ${category.options.price.toFixed(2)} ${t(`common.currency.${currency[0]}`)}`} 
          </Price>
        )}
      </NameCategory>
    </NameWrapper>
  );

  useEffect(() => {
    window.prerenderReady = true;
    if (order) {
      const categoryGroup = order.reduce((arr, category) => {
        const existCategory = arr.find(s => s.id === category.id);
        if (existCategory && existCategory.dailymenu) {
          const editOrder = existCategory.order.reduce((arrDish, catDish) => {
            const existDish = category.order.find(f => f.dish.id === catDish.dish.id);
            if (existDish) {
              return [
                ...arrDish,
                {
                  ...existDish,
                  dish: {
                    ...existDish.dish,
                    order_count: existDish.dish.order_count ? existDish.dish.order_count + 1 : 2,
                  },
                },
              ];
            }
            return [...arrDish, { ...catDish, dish: { ...catDish.dish, order_count: 1 } }];
          }, []);
          return [
            ...arr.filter(f => f.id !== category.id),
            { ...category, order: editOrder, order_count: category.order_count ? category.order_count + 1 : 2 },
          ];
        }
        return [...arr, category];
      }, []);
      setCategoryOrder(categoryGroup);
      console.log('category order', categoryGroup);
    }
  }, []);

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={handleRouteOrder}>
          <ChevronSvg />
          {`${t('common.my')} ${t('common.order')}`}
        </BackButton>
      </Header>
      {categoryOrder && (
        <>
          <QRCodeWrapper>
            <Logo
              src={logo || RestaurantLogoTempPng}
              onClick={() => handleRoute('information')}
            />
            <QRCode value="test" />
            <AlertWrapper>
              <InfoCircleSvg />
              {t('pageReceipt.ask_waiter')}
            </AlertWrapper>
          </QRCodeWrapper>
          <ReceiptWrapper>
            <DateTime>
              {getDateTime(lng)}
            </DateTime>
            {categoryOrder.map((category, c) => (
              <CategoryWrapper key={`_category_${c + 1}`}>
                {getTitle(categoryOrder, category, c)}
                {category.order.map((item, k) => (
                  <GroupWrapper key={`_group_${k + 1}`}>
                    {category.dailymenu && (
                      <GroupTitle>
                        {item.name}
                      </GroupTitle>
                    )}
                    <GroupItem>
                      <GroupName>
                        <DishNumber>
                          {getDish(item, category.dailymenu).number}
                        </DishNumber>
                        <DishName>
                          {getDish(item, category.dailymenu).name}
                        </DishName>
                        <Price>
                          {`${getDish(item, category.dailymenu).order_count} X${category.dailymenu ? '' : ` ${getDish(item, category.dailymenu).price.toFixed(2)} ${t(`common.currency.${currency[0]}`)}`}`} 
                        </Price>
                      </GroupName>
                    </GroupItem>
                  </GroupWrapper>
                ))}
              </CategoryWrapper>    
            ))}
            <Total>
              <TotalText>
                {`${t('common.total')}:`}
              </TotalText>
              <TotalSumm>
                {`${getTotal(order).toFixed(2)} ${t(`common.currency.${currency[0]}`)}`}
              </TotalSumm>
            </Total>
          </ReceiptWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Receipt;

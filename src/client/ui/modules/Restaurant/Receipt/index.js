import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronSvg, InfoCircleSvg } from 'client/assets/images';
import { getTotal, setUrlOrder } from 'client/utils/restaurant';
import QRCode from 'qrcode.react';
import moment from 'moment';
import { getDictionaryItem, getUrl } from 'client/utils/common';

import {
  Wrapper,
  Header, BackButton,
  QRCodeWrapper, Logo, AlertWrapper, AlertIcon,
  ReceiptWrapper,
  Info, DateTime, TableNumber,
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
      info: { key, currency, images },
      order,
      table_number,
      dictionary,
    },
  } = useSelector(store => store);
  const history = useHistory();
  const [t] = useTranslation();
  const [categoryOrder, setCategoryOrder] = useState(null);

  const logo = images ? `${getUrl()}/static/restaurants/logo/${images[0]}.png` : null;

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

  const getDish = (item, category) => {
    const data = checkDaily(category) ? item.dish : item;
    return {
      ...data,
      count: data.count || 1,
    };
  };

  const checkDaily = (category) => category.type === 'daily';

  const getQRCodeValue = () => {
    const encode = setUrlOrder(order);
    const url = `${getUrl()}/restaurant/${key}/order/receipt?params=${encode}&table_number=${table_number}`;
    console.log('url', url);
    return url;
  };

  const setOrder = () => {
    const categoryGroup = order.reduce((arr, category) => {
      const existCategory = arr.find(s => s.id === category.id);
      if (existCategory && checkDaily(existCategory)) {
        const editOrder = existCategory.order.reduce((arrDish, catDish) => {
          const existDish = category.order.find(f => f.dish.id === catDish.dish.id);
          if (existDish) {
            return [
              ...arrDish,
              {
                ...existDish,
                dish: {
                  ...existDish.dish,
                  count: existDish.dish.count ? existDish.dish.count + 1 : 2,
                },
              },
            ];
          }
          return [...arrDish, { ...catDish, dish: { ...catDish.dish, count: 1 } }];
        }, []);
        return [
          ...arr.filter(f => f.id !== category.id),
          { ...category, order: editOrder, count: category.count ? category.count + 1 : 2 },
        ];
      }
      return [...arr, category];
    }, []);
    setCategoryOrder(categoryGroup);
  };

  const getTitle = (arr, category, index) => (
    <NameWrapper>
      {!checkDaily(category) && ((arr[index - 1] && checkDaily(arr[index - 1])) || index === 0) && (
        <>
          <Name>
            {t('restaurant.common.menu')}
          </Name>
          <br />
        </>
      )}
      <NameCategory>
        <Name>
          {category.name}
        </Name>
        {checkDaily(category) && (
          <Price>
            {`${category.count ? category.count : 1} X ${category.options.price} ${getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol')}`} 
          </Price>
        )}
      </NameCategory>
    </NameWrapper>
  );

  useEffect(() => {
    window.prerenderReady = true;

    if (order) {
      setOrder();
    }
  }, []);

  return order && (
    <Wrapper>
      <Header>
        <BackButton onClick={handleRouteOrder}>
          <ChevronSvg />
          {`${t('restaurant.common.my')} ${t('restaurant.common.order')}`}
        </BackButton>
      </Header>
      {categoryOrder && (
        <>
          <QRCodeWrapper>
            {logo && (
              <Logo
                src={logo}
                onClick={() => handleRoute('information')}
              />
            )}
            <QRCode value={getQRCodeValue()} />
            <AlertWrapper>
              <AlertIcon>
                <InfoCircleSvg />
              </AlertIcon>
              {t('restaurant.pageReceipt.ask_waiter')}
            </AlertWrapper>
          </QRCodeWrapper>
          <ReceiptWrapper>
            <Info>
              <DateTime>
                {getDateTime(lng)}
              </DateTime>
              <TableNumber>
                {`#${table_number || 0}`}
              </TableNumber>
            </Info>
            
            {categoryOrder.map((category, c) => (
              <CategoryWrapper key={`_category_${c + 1}`}>
                {getTitle(categoryOrder, category, c)}
                {category.order.map((item, k) => (
                  <GroupWrapper key={`_group_${k + 1}`}>
                    {checkDaily(category) && (
                      <GroupTitle>
                        {item.name}
                      </GroupTitle>
                    )}
                    <GroupItem>
                      <GroupName>
                        <DishNumber>
                          {getDish(item, category).number}
                        </DishNumber>
                        <DishName>
                          {getDish(item, category).name}
                        </DishName>
                        <Price>
                          {`${getDish(item, category).count} X${checkDaily(category) ? '' : ` ${getDish(item, category).price[0].cost} ${getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol')}`}`} 
                        </Price>
                      </GroupName>
                    </GroupItem>
                  </GroupWrapper>
                ))}
              </CategoryWrapper>    
            ))}
            <Total>
              <TotalText>
                {`${t('restaurant.common.total')}:`}
              </TotalText>
              <TotalSumm>
                {`${getTotal(order).toFixed(2)} ${getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol')}`}
              </TotalSumm>
            </Total>
          </ReceiptWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Receipt;

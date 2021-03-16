import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronSvg, InfoCircleSvg, RestaurantLogoTempPng } from 'client/assets/images';
import { getTotal } from 'client/utils/restaurant';
import { replaceOrder } from 'client/store/restaurant';
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
      info: { key, currency, logo },
      order,
      categories,
      dishes,
    },
  } = useSelector(store => store);
  const history = useHistory();
  const location = useLocation();
  const rootDispatch = useDispatch();
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

  const getQRCodeValue = () => {
    const trimOrder = order.map(item => ({
      id: item.id,
      order_id: item.order_id,
      order: item.order.map(cat => {
        if (!item.dailymenu) {
          return {
            id: cat.id,
            order_count: cat.order_count,
          };
        }
        return {
          id: cat.id,
          dish: cat.dish.id,
        };
      }),
    }));
    let str = JSON.stringify(trimOrder);
    str = str.replace(/ /g, '');
    const encode = encodeURIComponent(str);
    const url = `https://dev.digital-carte.com/restaurant/${key}/order/receipt?params=${encode}`;
    return url;
  };

  const setOrder = () => {
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
  };

  const getOrderParams = () => {
    // check url params, if exist get order and reload page
    try {
      if (location.search.indexOf('params') > -1) {
        const params = location.search.replace('?params=', '');
        const trimOrder = JSON.parse(decodeURIComponent(params));
        const newOrder = trimOrder.reduce((arr, item) => {
          const catExist = categories.find(f => f.id === item.id);
          if (catExist) {
            if (!catExist.dailymenu || (!catExist.dailymenu && !catExist.group)) {
              return [
                ...arr,
                {
                  ...catExist,
                  ...item,
                  order: item.order.reduce((arrDish, dish) => {
                    const dishExist = dishes.find(f => f.id === dish.id);
                    if (dishExist) {
                      return [...arrDish, { ...dishExist, ...dish }];
                    }
                    return arrDish;
                  }, []),
                },
              ];
            }
            return [
              ...arr,
              {
                ...catExist,
                order: item.order.reduce((arrDish, cat) => {
                  const group = catExist.groups.find(f => f.id === cat.id);
                  const dishExist = dishes.find(f => f.id === cat.dish);
                  if (group) {
                    return [...arrDish, {
                      ...group,
                      dish: dishExist,
                    }];
                  }
                  return arrDish;
                }, []),
              },
            ];
          }
          return arr;
        }, []);
        rootDispatch(replaceOrder(newOrder));
      }
    } catch (error) {
      handleRouteOrder();
    }
  };

  const getTitle = (arr, category, index) => (
    <NameWrapper>
      {!category.dailymenu && ((arr[index - 1] && arr[index - 1].dailymenu) || index === 0) && (
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
        {category.dailymenu && (
          <Price>
            {`${category.order_count ? category.order_count : 1} X ${category.options.price.toFixed(2)} ${t(`restaurant.common.currency.${currency[0]}`)}`} 
          </Price>
        )}
      </NameCategory>
    </NameWrapper>
  );

  useEffect(() => {
    window.prerenderReady = true;
    getOrderParams();

    if (order) {
      setOrder();
    }
  }, [order]);

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
            <Logo
              src={logo || RestaurantLogoTempPng}
              onClick={() => handleRoute('information')}
            />
            <QRCode value={getQRCodeValue()} />
            <AlertWrapper>
              <InfoCircleSvg />
              {t('restaurant.pageReceipt.ask_waiter')}
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
                          {`${getDish(item, category.dailymenu).order_count} X${category.dailymenu ? '' : ` ${getDish(item, category.dailymenu).price.toFixed(2)} ${t(`restaurant.common.currency.${currency[0]}`)}`}`} 
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
                {`${getTotal(order).toFixed(2)} ${t(`restaurant.common.currency.${currency[0]}`)}`}
              </TotalSumm>
            </Total>
          </ReceiptWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Receipt;

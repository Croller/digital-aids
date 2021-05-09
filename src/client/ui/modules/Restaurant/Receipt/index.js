import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronSvg, InfoCircleSvg } from 'client/assets/images';
import { getTotal } from 'client/utils/restaurant';
import { update } from 'client/store/restaurant';
import QRCode from 'qrcode.react';
import moment from 'moment';
import { getDictionaryItem, getUrl } from 'client/utils/common';
import {
  Wrapper,
  Header, BackButton,
  QRCodeWrapper, Logo, AlertWrapper, AlertIcon,
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
      info: { key, currency, images },
      order,
      categories,
      dishes,
      dictionary,
    },
  } = useSelector(store => store);
  const history = useHistory();
  const location = useLocation();
  const rootDispatch = useDispatch();
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
      order_count: data.order_count || 1,
    };
  };

  const checkDaily = (category) => category.type === 'daily';

  const getQRCodeValue = () => {
    const trimOrder = order.map(item => ({
      id: item.id,
      order_id: item.order_id,
      order: item.order.map(cat => {
        if (!checkDaily(item)) {
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
    console.log(categoryGroup, order);
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
            if (!checkDaily(catExist) || (!checkDaily(catExist) && !catExist.children)) {
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
                  const group = catExist.children.find(f => f.id === cat.id);
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
        rootDispatch(update({ order: newOrder }));
      }
    } catch (error) {
      handleRouteOrder();
    }
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
            {`${category.order_count ? category.order_count : 1} X ${category.options.price} ${getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol')}`} 
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
            <DateTime>
              {getDateTime(lng)}
            </DateTime>
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
                          {`${getDish(item, category).order_count} X${checkDaily(category) ? '' : ` ${getDish(item, category).price[0].cost} ${getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol')}`}`} 
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

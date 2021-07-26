import React, { memo, useState } from 'react';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { DishBlock } from 'client/ui/modules/Restaurant/components/DishBlock';
import { getDictionaryItem } from 'client/utils/common';
import {
  ShoppingBagSvg,
  MapMarkerSvg,
  CalendarSvg,
  PlusSvg,
  CloseSvg,
} from 'client/assets/images';
import { 
  Wrapper,
  Head,
  Order,
  Table,
  Date,
  Status,
  DropdownStyled,
  MenuStyled,
  Controls,
  Control,

  Details,
  TitleWrapper,
  Title,
  DishList,
  DailyCard,
  DailyHeader,
  Price,
  DailyWrapper,
  TitleGroup,
  Hr,
} from './styled';

const STATUS_CONF = [
  'waiting',
  'cooking',
  'delivery',
  'payment',
  'paid',
  'canceled',
];

export const OrderInfo = memo(({
  id,
  order_decode = null,
  order_number,
  table_number,
  status,
  create_at,
  delivered_at,
  paid_at,
  className,
  restaurant = null,
  dictionary = null,
  onEvent = () => {},
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [t] = useTranslation();

  const menu = (
    <MenuStyled>
      {STATUS_CONF.filter(f => f !== status).map(key => (
        <MenuStyled.Item key={key} onClick={() => onEvent({ id, status: key })}>
          {t(`restaurant.pageOrder.status.${key}`)}
        </MenuStyled.Item>
      ))}
    </MenuStyled>
  );

  const getTitle = (arr, category, index) => (
    <>
      {!category.type === 'daily' && ((arr[index - 1] && arr[index - 1].dailymenu) || index === 0) && (
        <>
          <Title>
            {t('restaurant.common.menu')}
          </Title>
          <br />
        </>
      )}
      <Title>
        {category.name}
      </Title>
    </>
  );

  return (
    <>
      <Wrapper className={className}>
        <Head>
          <Order
            icon={<ShoppingBagSvg />}
            text={order_number}
          />
          <Table
            icon={<MapMarkerSvg />}
            text={table_number || 0}
          />
          <Date
            icon={<CalendarSvg />}
            text={(
              <>
                {moment(create_at).format('DD.MM.YYYY HH:mm')}
                {moment(delivered_at).isValid() && (
                <>
                  <br />
                  {moment(delivered_at).format('DD.MM.YYYY HH:mm')}
                </>
                )}
                {moment(paid_at).isValid() && (
                <>
                  <br />
                  {moment(paid_at).format('DD.MM.YYYY HH:mm')}
                </>
                )}
              </>
            )}
          />
          <DropdownStyled overlay={menu} placement="bottomCenter" arrow>
            <Status>
              {t(`restaurant.pageOrder.status.${status}`)}
            </Status>
          </DropdownStyled>
          <Controls>
            <Tooltip placement="top" title={t('common.words.more')}>
              <Control
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <CloseSvg /> : <PlusSvg />}
              </Control>
            </Tooltip>
          </Controls>
        </Head>
      
      </Wrapper>
      <Details>
        {collapsed && order_decode && order_decode.map((category, c) => (
          <React.Fragment key={`_${category.key}_${category.order_id}`}>
            <TitleWrapper>
              {getTitle(order_decode, category, c)}
            </TitleWrapper>
            <DishList dailymenu={category.type === 'daily'}>
              {category.type === 'daily' && (
                <DailyHeader>
                  <Price>
                    {`${category.options.price}${getDictionaryItem(restaurant.currency[0], 'id', dictionary.currency, 'symbol')}`}
                  </Price>
                </DailyHeader>
              )}
              {category.type === 'daily' ? category.order.map((item) => (
                <DailyCard key={`${item.key}_${item.id}`}>
                  <DailyWrapper>
                    <TitleGroup>
                      {item.name}
                    </TitleGroup>
                    {DishBlock({
                      dictionary,
                      dish: item.dish,
                      order: category.order,
                      group: item,
                      dailymenu: true,
                      currency: getDictionaryItem(restaurant.currency[0], 'id', dictionary.currency, 'symbol'),
                    })}
                  </DailyWrapper>
                </DailyCard>
              )) : category.order.map(dish => DishBlock({
                dictionary,
                dish,
                order: category.order,
                currency: getDictionaryItem(restaurant.currency[0], 'id', dictionary.currency, 'symbol'),
              }))} 
            </DishList>
          </React.Fragment>
        ))}
      </Details>
    </>
  );
});

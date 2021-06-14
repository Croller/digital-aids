import React, { memo, useState } from 'react';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
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
  order_number,
  table_number,
  options,
  status,
  create_at,
  delivered_at,
  paid_at,
  className,
  onEvent = () => {},
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [t] = useTranslation();
  console.log('options', options);

  const menu = (
    <MenuStyled>
      {STATUS_CONF.filter(f => f !== status).map(key => (
        <MenuStyled.Item key={key} onClick={() => onEvent({ id, status: key })}>
          {t(`restaurant.pageOrder.status.${key}`)}
        </MenuStyled.Item>
      ))}
    </MenuStyled>
  );

  return (
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
      {collapsed && (
        <>
          <Hr />
        </>
      )}
    </Wrapper>
  );
});

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import { useTranslation } from 'react-i18next';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import { initSocket, subscribeChange } from 'client/providers/socket';
import { set } from 'client/store/backOffice';
import {
  ArchiveSvg,
  EditSvg,
  MapMarkerSvg,
  PhoneCallSvg,
  RestaurantSvg,
  TrashSvg,
  PlusSvg,
  QRCodeSvg,
  ClockSvg,
  StarHalfDashedSvg,
  ShoppingBagSvg,
  BellSvg,
  MenuSvg,
  InfoCircleSvg,
  ChefHeadSvg,
} from 'client/assets/images';
import { 
  RestaurantInfoWrapper,
  InfoWrapper,
  Header,
  Name,
  Controls,
  Control,
  Hr,
  Content,
  Contacts,
  Phone,
  Address,
  NavItemStyled,
  Bandage,
  DashboardWrapper,
  DashItem,
  DashItemName,
} from './styled';

const CONTROL_CONFIG = [
  {
    key: 'menu',
    icon: (<MenuSvg />),
    path: '/back-office/restaurant/:restaurant/language/:language/menu',
    part: '/menu',
  },
  {
    key: 'specialDeals',
    icon: <InfoCircleSvg />,
    path: '/back-office/restaurant/:restaurant/language/:language/special-deals',
  },
  {
    key: 'foodtips',
    icon: <ChefHeadSvg />,
    path: '/back-office/restaurant/:restaurant/language/:language/foodtips',
  },
  {
    key: 'orders',
    icon: <ShoppingBagSvg />,
    path: '/back-office/restaurant/:restaurant/orders',
  },
  {
    key: 'notify',
    icon: <BellSvg />,
    path: '/back-office/restaurant/:restaurant/notify',
  },
  {
    key: 'opinions',
    icon: <StarHalfDashedSvg />,
    path: '/back-office/restaurant/:restaurant/opinions',
  },
  {
    key: 'reserve',
    icon: <ClockSvg />,
    path: '/back-office/restaurant/:restaurant/reserve',
  },
  {
    key: 'flyer',
    icon: <QRCodeSvg />,
    path: '/back-office/restaurant/:restaurant/flyer',
  },
  {
    key: 'archive',
    icon: <ArchiveSvg />,
    path: null,
  },
  {
    key: 'edit',
    icon: <EditSvg />,
    path: '/back-office/restaurant/:restaurant',
  },
  {
    key: 'restore',
    icon: <PlusSvg />,
    path: null,
  },
  {
    key: 'delete',
    icon: <TrashSvg />,
    path: null,
  },
];

export const RestaurantInfo = ({
  id,
  name,
  address,
  phone,
  className,
  onEvent = () => {},
}) => {
  const [t] = useTranslation();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const { backOffice: { alert } } = useSelector(s => s);
  const params = useParams();
  const { pathname } = useLocation();
  const [event, setEvent] = useState(null);
  const [showConfirm, hideConfirm] = useModal(() => (
    <ConfirmChange
      title={t(`backOffice.confirmModal.restaurant.${event.key}`)}
      textOk={t(`common.words.${event.key}`)}
      textCancel={t('common.words.cancel')}
      onCancel={hideConfirm}
      onClose={hideConfirm}
      onOk={() => {
        hideConfirm();
        onEvent(event.params);
      }}
    />
  ), [event]);

  const handleRoute = (key, path) => {
    const param = { id };

    if (alert[key]) {
      rootDispatch(set({ alert: { ...alert, [key]: false } }));
    }
    
    if (path) {
      let ePath = path.replace(':restaurant', id);
      if (ePath.indexOf(':language') > -1) {
        ePath = ePath.replace(':language', params.language);
      }
      history.push(ePath);
      return;
    }

    if (key === 'restore') param.is_archived = false;
    if (key === 'delete') param.is_deleted = true;
    if (key === 'archive') param.is_archived = true;

    setEvent({ key, params: param });
    showConfirm();
  };

  const getControl = () => {
    const arr = [...CONTROL_CONFIG];
    if (pathname.indexOf('/restaurants') > -1 || (pathname.indexOf('/restaurant/') > -1 && pathname.indexOf('/language') > -1)) {
      if (pathname.indexOf('/restaurants/archive') > -1) {
        return arr.filter(({ key }) => ['restore', 'delete'].includes(key));
      }
      return arr.filter(({ key }) => ['archive', 'edit'].includes(key));
    }
    return [];
  };

  const getDashItem = () => {
    const arr = [...CONTROL_CONFIG];
    return arr.filter(({ key }) => ['flyer', 'reserve', 'opinions', 'orders', 'notify', 'menu', 'specialDeals', 'foodtips'].includes(key));
  };

  useEffect(() => {
    if (pathname.indexOf('/restaurant/') > -1 && pathname.indexOf('/language') > -1) {
      initSocket(id);
      subscribeChange((err, result) => {
        if (err) return;
        const { type, table } = result;
        const nameTable = table.split('_')[1];
        rootDispatch(set({
          alert: {
            ...alert,
            [nameTable]: type === 'create',
          },
        }));
      });
    }
  }, [pathname]);

  return (
    <RestaurantInfoWrapper className={className}>
      <InfoWrapper>
        <Header>
          <Name
            icon={<RestaurantSvg />}
            text={name}
          />
          <Controls>
            {getControl().map(({ key, icon, path }) => (
              <Tooltip key={key} placement="top" title={t(`common.words.${key}`)}>
                <Control onClick={() => handleRoute(key, path)}>
                  {icon}
                </Control>
              </Tooltip>
            ))}
          </Controls>
        </Header>
        <Hr />
        <Content>
          <Contacts>
            <Phone
              icon={<PhoneCallSvg />}
              text={phone ? phone[0] : ''}
            />
            <Address
              icon={<MapMarkerSvg />}
              text={address}
            />
          </Contacts>
          {pathname.indexOf('/dashboard') === -1 && (
            <NavItemStyled id={id} onClick={(path) => handleRoute('restaurant', path)} />
          )}
        </Content>
      </InfoWrapper>
      {pathname.indexOf('/dashboard') > -1 && (
        <DashboardWrapper>
          {getDashItem().map(({ key, icon, path }) => (
            <DashItem key={key} onClick={() => handleRoute(key, path)}>
              {icon}
              {alert[key] && (<Bandage />)}
              <DashItemName>
                {t(`common.words.${key}`)}
              </DashItemName>
            </DashItem>
          ))}
        </DashboardWrapper>
      )}
    </RestaurantInfoWrapper>
  );
};

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import moment from 'moment';
import { rules, collectError } from 'client/utils/validations';
import { updateRow } from 'client/store/restaurant';
import { useModal } from 'react-modal-hook';
import { ReserveSend } from 'client/ui/components/_block/Modal/ReserveSend';
import { getUrl } from 'client/utils/common';
import {
  CloseSvg,
  ClockSvg,
  CalendarSvg,
  UsersSvg,
} from 'client/assets/images';
import { 
  ReservationWrapper,
  CloseButton,
  ImgWrapper, Img,
  Content,
  Restaurant, Title,
  Tab, TabButton, TabIconText,
  TabTitle,
  SquareWrapper, Square,
  CalendarStyled,
  SubButton,
  FormStyled, FormItemStyled,
  InputStyled, CheckBoxStyled,
  ViewStyled, ViewItem,
  LinkText,
} from './styled';
import { localeArray } from './constants';

const TAB_CONFIG = [
  {
    key: 'day',
    icon: <CalendarSvg />,
  },
  {
    key: 'time',
    icon: <ClockSvg />,
  },
  {
    key: 'persons',
    icon: <UsersSvg />,
  },
];

const Reservation = () => {
  const { 
    user: {
      info: {
        language,
      },
    },
    restaurant: {
      info: {
        id,
        name,
        images,
        at_work,
      },
    },
  } = useSelector(store => store);
  const rootDispatch = useDispatch();
  const history = useHistory();
  const [t] = useTranslation();
  const [form] = FormStyled.useForm();
  const [selectedTab, setSelectedTab] = useState('day');
  const [isChange, setIsChange] = useState(false);
  const [reserve, setReserve] = useState({
    day: new Date(),
    time: null,
    persons: null,
    name: null,
    email: null,
    policy: true,
  });
  const rule = rules(t);
  const getPathImage = (uuid) => `${getUrl()}/static/restaurants/photos/${uuid}.png`;
  const [showConfirm, hideConfirm] = useModal(() => (
    <ReserveSend
      title={t('restaurant.compModal.reserve_send')}
      textOk={t('common.words.ok')}
      onClose={hideConfirm}
      onOk={() => {
        hideConfirm();
        handleRoute('information');
      }}
    />
  ));

  const getTimeRange = () => {
    let time = { ...at_work };
    delete time.description;
    time = Object.keys(time).reduce((arr, key) => ([...arr, ...time[key]]), []);
    time = time.sort((a, b) => moment(a).diff(moment(b)));
    const minutes = moment(time[time.length - 1]).diff(moment(time[0]), 'minutes');
    const count = Math.floor(minutes / 30);
    return new Array(count).fill().map((d, i) => moment(time[0]).add(i * 30, 'minutes').format('HH:mm'));
  };  

  const handleRoute = (path = 'categories', external = false) => {
    if (external) {
      if (path.indexOf('tel') > -1) {
        document.location.href = path;
        return;
      }
      window.open(path, '_blank').focus();
      return;
    }
    if (history.action !== 'POP' && path === 'back') {
      history.goBack();
      return;
    }
    history.push(path === 'back' ? 'categories' : path);
  };

  const handleNextSet = () => {
    const index = TAB_CONFIG.findIndex(f => f.key === selectedTab);
    setSelectedTab(index + 1 >= 0 && index + 1 <= 2 ? TAB_CONFIG[index + 1].key : null);
  };

  const handleFinishFailed = ({ errorFields }) => {
    if (isChange) {
      collectError(errorFields);
    }
  };

  const handleValuesChange = () => {
    setIsChange(true);
  };

  const handleFinish = (values = {}) => {
    setIsChange(false);
    const data = {
      ...reserve,
      ...values,
    };
    if (data.policy) {
      const {
        day,
        time,
        persons,
        email,
      } = data;
      const reserve_at = `${moment(day).format('YYYY-MM-DD')} ${moment(time, 'HH:mm').format('HH:mm:ss')}`;
      rootDispatch(updateRow({
        name: 'data_reserve',
        data: {
          restaurant: id,
          reserve_at,
          persons,
          email,
          name: data.name,
        },
      }));
      showConfirm();
    }
  };

  return (
    <ReservationWrapper>
      <CloseButton onClick={() => handleRoute('back')}>
        <CloseSvg />
      </CloseButton>
      <ImgWrapper>
        {images && images[1] && (
          <Img src={getPathImage(images[1])} />
        )}
      </ImgWrapper>
      <Content>
        <Restaurant>
          {name}
        </Restaurant>
        <Title>
          {t('restaurant.common.reservation')} 
        </Title>
        <Tab>
          {TAB_CONFIG.map(({ key, icon }) => (
            <TabButton
              key={`_tab_${key}`}
              active={selectedTab === key}
              onClick={() => reserve[key] && setSelectedTab(key)}
            >
              <TabIconText
                icon={icon}
                text={t(`restaurant.common.${key}`)}
              />
            </TabButton>
          ))}
        </Tab>
        {selectedTab ? (
          <>
            {selectedTab === 'day' ? (
              <CalendarStyled
                view="month"
                minDate={new Date()}
                minDetail="decade"
                showNeighboringMonth={false}
                locale={localeArray.find(f => f.indexOf(language) > -1)}
                value={reserve.day}
                onChange={(value) => setReserve({ ...reserve, day: value })}
              />
            ) : (
              <TabTitle>
                {t(`restaurant.common.${selectedTab}`)}
              </TabTitle>
            )}
            {selectedTab === 'time' && (
              <SquareWrapper key={selectedTab}>
                {getTimeRange().map((d, i) => (
                  <Square
                    key={`_time_${i + 1}`}
                    active={reserve && reserve.time === d}
                    onClick={() => setReserve({ ...reserve, time: d })}
                  >
                    {d}
                  </Square>
                ))}
              </SquareWrapper>
            )}
            {selectedTab === 'persons' && (
              <SquareWrapper key={selectedTab}>
                {new Array(10).fill().map((d, i) => (
                  <Square
                    key={`_persons_${i + 1}`}
                    active={reserve.persons === i + 1}
                    onClick={() => setReserve({ ...reserve, persons: i + 1 })}
                  >
                    {i + 1}
                  </Square>
                ))}
              </SquareWrapper>
            )}
            <SubButton onClick={handleNextSet} disabled={!reserve[selectedTab]}>
              {t('restaurant.common.next')}
            </SubButton>
          </>
        ) : (
          <>
            <ViewStyled layout="vertical">
              <ViewItem label={t('restaurant.common.day')}>
                {moment(reserve.day).format('DD.MM.YYYY')}
              </ViewItem>
              <ViewItem label={t('restaurant.common.time')}>
                {reserve.time}
              </ViewItem>
              <ViewItem label={t('restaurant.common.persons')}>
                {reserve.persons}
              </ViewItem>
            </ViewStyled>
            <FormStyled
              form={form}
              layout="vertical"
              initialValues={reserve}
              onFinish={handleFinish}
              onValuesChange={handleValuesChange}
              onFinishFailed={handleFinishFailed}
            >
              <FormItemStyled
                label={t('common.words.name')}
                name="name"
                required
                rules={rule.text}
              >
                <InputStyled />
              </FormItemStyled>
              <FormItemStyled
                label={t('common.words.email')}
                name="email"
                required
                rules={rule.email}
              >
                <InputStyled />
              </FormItemStyled>
              <FormItemStyled
                name="policy"
                rules={rule.bool}
                valuePropName="checked"
              >
                <CheckBoxStyled>
                  {t('restaurant.pageReserve.accept')}
                  &nbsp;
                  <LinkText onClick={() => handleRoute(`${getUrl()}/privacy-policy`, true)}>
                    {t('restaurant.pageReserve.policy')}
                  </LinkText>
                </CheckBoxStyled>
              </FormItemStyled>
              <SubButton
                active
                onClick={() => form.submit()}
                disabled={!isChange}
              >
                {t('restaurant.common.reserving')}
              </SubButton>
            </FormStyled>
          </>
        )}
      </Content>
      <ThankYou />
    </ReservationWrapper>
  );
};

export default Reservation;

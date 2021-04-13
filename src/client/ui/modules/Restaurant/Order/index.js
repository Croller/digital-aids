import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from 'react-modal-hook';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TrashSvg } from 'client/assets/images';
import { clearOrder, updateOrder } from 'client/store/restaurant';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import { DishBlock } from 'client/ui/components/_block/DishBlock';
import { getTotal } from 'client/utils/restaurant';
import { AllergensModal } from 'client/ui/components/_block/Modal/Allergens';
import { RemoveOrderModal } from 'client/ui/components/_block/Modal/RemoveOrder';
import {
  Wrapper,
  HeaderWrapper,
  TitleWrapper,
  Title,
  TrashButton,
  Container,
  DishList,
  DailyCard,
  DailyHeader,
  DeleteButton,
  Price,
  DailyWrapper,
  TitleGroup,
  ScrollHideBlockStyled,
  TotalWrapper,
  Total,
  TotalText,
  TotalSumm,
  CreateButton,
  HintsBlockStyled,
} from './styled';

const Order = () => {
  const {
    info: { currency },
    order,
  } = useSelector(store => store.restaurant);
  const rootDispatch = useDispatch();
  const history = useHistory();
  const [allergens, setAllergens] = useState(null);
  const [t] = useTranslation();

  const [showAllergens, hideAllergens] = useModal(() => (
    <AllergensModal
      source={allergens}
      onClose={() => {
        setAllergens(null);
        hideAllergens();
      }}
    />
  ), [allergens]);

  const [showConfirmDelete, hideConfirmDelete] = useModal(() => (
    <RemoveOrderModal
      onCancel={hideConfirmDelete}
      onClose={hideConfirmDelete}
      onOk={() => {
        rootDispatch(clearOrder());
        hideConfirmDelete();
      }}
    />
  ));

  const handleCreateReceipt = () => {
    history.push('order/receipt');
  };

  const handleRouteMenu = () => {
    history.push('categories');
  };

  const handleToggleModalAllergens = (arr) => {
    setAllergens(allergens ? null : arr);
    showAllergens();
  };

  const handleSetOrder = ({ obj, category }) => {
    let data = [];
    if (category.dailymenu) {
      data = [...category.order.filter(f => f.dish.id !== obj.id)];
    } else {
      data = category.order.reduce((arr, item) => {
        if (item.id === obj.id) {
          if (obj.order_count !== 0) {
            return [...arr, obj];
          }
          return arr;
        }
        return [...arr, item];
      }, []);
    }

    const newOrder = {
      ...category,
      order: data,
    };
    rootDispatch(updateOrder(newOrder));
  };

  const handleDeleteDaily = (obj) => {
    rootDispatch(updateOrder({ ...obj, order: [] }));
  };

  const getTitle = (arr, category, index) => (
    <>
      {!category.dailymenu && ((arr[index - 1] && arr[index - 1].dailymenu) || index === 0) && (
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

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      <Wrapper>
        <HeaderWrapper>
          <Title>
            {`${t('restaurant.common.my')} ${t('restaurant.common.order')}`}
          </Title>
          {order && (
            <TrashButton onClick={showConfirmDelete}>
              <TrashSvg />
            </TrashButton>
          )}
        </HeaderWrapper>
        {order ? (
          <>
            <Container>
              {order.map((category, c) => (
                <React.Fragment key={`_${category.key}_${category.order_id}`}>
                  <TitleWrapper>
                    {getTitle(order, category, c)}
                  </TitleWrapper>
                  <DishList dailymenu={category.dailymenu}>
                    {category.dailymenu && (
                      <DailyHeader>
                        <DeleteButton onClick={() => handleDeleteDaily(category)}>
                          <TrashSvg />
                        </DeleteButton>
                        <Price>
                          {`${category.options.price.toFixed(2)}${t(`restaurant.common.currency.${currency[0]}`)}`}
                        </Price>
                      </DailyHeader>
                    )}
                    {category.dailymenu ? category.order.map((item) => (
                      <DailyCard key={`${item.key}_${item.id}`}>
                        <DailyWrapper>
                          <TitleGroup>
                            {item.name}
                          </TitleGroup>
                          {DishBlock({
                            dish: item.dish,
                            order: category.order,
                            group: item,
                            dailymenu: true,
                            currency: t(`restaurant.common.currency.${currency[0]}`),
                          }, handleToggleModalAllergens, () => handleSetOrder({ obj: item.dish, category }))}
                        </DailyWrapper>
                      </DailyCard>
                    )) : category.order.map(dish => DishBlock({
                      dish,
                      order: category.order,
                      currency: t(`restaurant.common.currency.${currency[0]}`),
                    }, handleToggleModalAllergens, (obj) => handleSetOrder({ obj, category })))} 
                  </DishList>
                </React.Fragment>
              ))}
            </Container>
            <ScrollHideBlockStyled>
              <TotalWrapper>
                <Total>
                  <TotalText>
                    {`${t('restaurant.common.total')}:`}
                  </TotalText>
                  <TotalSumm>
                    {`${getTotal(order).toFixed(2)} ${t(`restaurant.common.currency.${currency[0]}`)}`}
                  </TotalSumm>
                </Total>
                <CreateButton onClick={handleCreateReceipt}>
                  {`${t('restaurant.common.create')} ${t('restaurant.common.an')} ${t('restaurant.common.order')}`}
                </CreateButton>
              </TotalWrapper>
            </ScrollHideBlockStyled>
          </>
        ) : (
          <HintsBlockStyled
            onClick={handleRouteMenu}
            btn={t('restaurant.common.menu')}
            text={t('restaurant.pageOrder.empty_order')}
          />
        )}
      </Wrapper>
      {!order && (<ThankYou />)}
    </>
  );
};

export default Order;

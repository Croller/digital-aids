import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { update, deleteFiles } from 'client/store/backOffice';
import { getCategoryTemp } from 'client/utils/restaurant';
import {
  AlertCircleSvg,
  ArchiveSvg,
  MenuSvg,
  PlusSvg,
} from 'client/assets/images';
import { 
  // CategoryEdit,
  // NavBarStyled,
  // RestaurantInfoStyled,
  CategoryEdit,
  NavBarStyled,
  RestaurantInfoStyled,
  ListMenu,
  MenuControl,
  ListControls,
  MenuBtn,
  CreateDaily,
  ListLng,
  Lng,
  ListCategory,
  Caterory,
  NewCaterory,
  DishControls,
  NewDish,
  ArchiveBtn,
  DishList, DishStyled,
} from './styled';

const Category = () => {
  const [t] = useTranslation();
  const params = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [restInfo, setRestInfo] = useState(null);
  const [restCategory, setRestCategory] = useState(null);
  const [dishCategory, setDishCategory] = useState([]);
  const {
    restaurants,
    categories,
    dishes,
    dictionary,
    status,
    loading,
  } = useSelector(state => state.backOffice);

  console.log(restaurants,
    categories,
    dishes,
    dictionary,
    status,
    loading);

  const init = () => {
    let categoryFilter = null;
    let dishesFilter = [];

    if (restaurants) {
      const rest = restaurants.find(f => f.id === params.restaurant);
      rest.languages = ['en', ...rest.languages.filter(f => f !== 'en')];

      if (categories) {
        categoryFilter = categories.filter(f => f.parent === params.restaurant);
        
        if (dishes) {
          const categoryCurrent = categoryFilter.filter(f => f.id === params.category);
          dishesFilter = dishes.filter(f => categoryCurrent.dishes.includes(f.id));
        }
      } else {
        console.log(getCategoryTemp());
        categoryFilter = getCategoryTemp();
      }

      setDishCategory(dishesFilter);
      setRestCategory(categoryFilter);
      setRestInfo(rest);
    }
  };

  const handleEvent = (obj) => {
    rootDispatch(update({ name: 'data_category', data: obj }));
  };

  const isTipsDeals = ['/special-deals', '/foodtips'].some(f => pathname.indexOf(f) > -1);
  const isArchive = ['/archive'].some(f => pathname.indexOf(f) > -1);

  const getItemDictionary = (id) => {
    const item = dictionary.languages.find(f => f.id === id);
    if (item) {
      return item.name;
    }
    return 'error';
  };

  const handleRoute = (key, id) => {
    let path = `${pathname}/${key}`;
    if (id) {
      const paths = pathname.split('/');
      const index = paths.findIndex(f => f === key);
      paths[index + 1] = id;
      path = paths.join('/');
    }
    console.log(key, id);
    console.log(path);
    history.push(path);
  };

  const handleEditCategory = (options = null) => {
    // if (options)
    setCategoryNew(options || {
      id: null,
      parent: null,
      restaurant: restInfo.id,
      key: '',
      name: 'New category',
      description: '',
    });
    handleRoute('lng', 'en');
  };

  const handleCreateDish = () => {
    setDishCategory([null, ...dishCategory]);
  };

  const handleChangeDish = (data) => {
    if (!data.id && data.is_deleted) {
      setDishCategory(dishCategory.shift());
      return;
    }
    rootDispatch(update({ name: 'data_dishes', data }));
  };

  const handleChangeFiles = (data = null) => {
    data && rootDispatch(deleteFiles({ data }));
  };

  useEffect(() => {
    init();
  }, [restaurants, categories, pathname]);

  useEffect(() => {
    window.prerenderReady = true;
    init();
  }, []);

  return restInfo && restCategory && (
    <CategoryEdit>
      {['/dishes/archive', '/special-deals', '/foodtips'].some(f => pathname.indexOf(f) > -1) && (
        <NavBarStyled />
      )}
      {!isArchive && (
        <>
          <RestaurantInfoStyled {...restInfo} />
          {!isTipsDeals && (
            <MenuControl>
              <ListMenu>
                <MenuBtn
                  active={params.category === 'default'}
                  onClick={() => handleRoute('category', 'default')}
                >
                  <MenuSvg />
                  {t('common.words.menu')}
                </MenuBtn>
                {restCategory.filter(f => f.dailymenu).map(({ id, name }) => (
                  <MenuBtn
                    key={`_category_${id}`}
                    active={id === params.category}
                    onClick={() => handleRoute('category', id)}
                  >
                    {name}
                  </MenuBtn>
                ))}
              </ListMenu>
              <ListControls>
                <CreateDaily>
                  {t('common.words.dailyTempCreate')}
                  <PlusSvg />
                </CreateDaily>
              </ListControls>
            </MenuControl>
          )}
        </>
      )}
      <ListLng>
        {restInfo.languages.map(lng => (
          <Lng
            key={`_lng_${lng}`}
            active={lng === params.language}
            onClick={() => handleRoute('language', lng)}
          >
            {lng === 'en' && (<AlertCircleSvg />)}
            {getItemDictionary(lng)}
          </Lng>
        ))}
      </ListLng>
      {!isTipsDeals && (
        <ListCategory>
          {restCategory.map(({ id, name }) => (
            <Caterory
              key={`_category_${id}`}
              active={id === params.category}
              onClick={() => handleRoute('category', id)}
            >
              {name}
            </Caterory>
          ))}
          {!isArchive && (
            <NewCaterory onClick={handleEditCategory}>
              {t('common.words.newCategory')}
              <PlusSvg />
            </NewCaterory>
          )}
        </ListCategory>
      )}
      {/* {isTipsDeals ? (
        <InfoSystem>
          {t('backOffice.info.menu')}
        </InfoSystem>
      ) : (
        <InfoMenu />
      )} */}
      {!isArchive && (
        <DishControls>
          <NewDish onClick={handleCreateDish}>
            {t('common.words.newAdd')}
            <PlusSvg />
          </NewDish>
          <ArchiveBtn onClick={() => handleRoute('archive')}>
            <ArchiveSvg />
            {/* {`${t('common.words.dish')} ${t('common.words.archive')}`} */}
            {t('common.words.archive')}
          </ArchiveBtn>
        </DishControls>
      )}
      <DishList>
        {dishCategory && dishCategory.map((dish) => (
          <DishStyled
            key={`_dish_${dish ? dish.id : 'new'}`}
            dish={dish}
            loading={loading}
            dictionary={dictionary}
            onChangeDish={handleChangeDish}
            onChangeFiles={handleChangeFiles}
          />
        ))}
      </DishList>
    </CategoryEdit>
  );
};

export default Category;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { update, deleteFiles } from 'client/store/backOffice';
import { categoryType } from 'client/utils/constants';
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
  const [restSubCategory, setRestSubCategory] = useState(null);
  const [restSubCategoryActive, setRestSubCategoryActive] = useState(null);
  const [dishCategory, setDishCategory] = useState(null);
  const {
    restaurants,
    categories,
    dishes,
    dictionary,
    status,
    loading,
  } = useSelector(state => state.backOffice);

  // console.log(restaurants,
  //   categories,
  //   dishes,
  //   dictionary,
  //   status,
  //   loading);

  const init = () => {
    let categoryFilter = null;
    let categorySubFilter = null;
    let categoryDishFilter = null;

    if (restaurants) {
      const rest = restaurants.find(f => f.id === params.restaurant);
      rest.languages = ['en', ...rest.languages.filter(f => f !== 'en')];

      const categoryGroup = [...(categories ? categories.filter(f => f.parent === params.restaurant) : getCategoryTemp())].filter(f => !['foodtips', 'specialDeals'].includes(f.type));
      categoryFilter = [
        {
          id: 'menu',
          name: 'Menu',
          key: 'menu',
          type: 'menu',
          children: categoryGroup.filter(f => f.type !== 'daily'),
        },
        ...categoryGroup.filter(f => f.type === 'daily'),
      ];

      categorySubFilter = categoryFilter[0].children;
      categoryDishFilter = [...(dishes || [])].filter(f => f.parent === categoryFilter[0].id);

      setDishCategory(categoryDishFilter);
      setRestSubCategoryActive(categorySubFilter[0].id);
      setRestSubCategory(categorySubFilter);
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
    history.push(path);
  };

  const handleFilterCategory = (id) => {
    const category = restCategory.find(f => f.id === id);
    const children = category ? category.children : null;
    setRestSubCategory(children);
    setRestSubCategoryActive(children ? children[0].id : null);
    handleRoute('category', id);
  };

  const handleFilterDishes = (id) => {
    setRestSubCategoryActive(id);
    // setDishCategory(restSubCategory.filter(f => f.id === id));
  };

  const handleEditCategory = (options = null) => {
    // if (options)
    // setCategoryNew(options || {
    //   id: null,
    //   parent: null,
    //   restaurant: restInfo.id,
    //   key: '',
    //   name: 'New category',
    //   description: '',
    // });
    // handleRoute('lng', 'en');
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
    if (!restInfo || !restCategory || !dishCategory) {
      init();
    }
  }, [restaurants, categories, pathname, dictionary]);

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
                {restCategory && restCategory.map(({ id, name, key }) => (
                  <MenuBtn
                    key={`_category_${id}`}
                    active={id === params.category}
                    onClick={() => handleFilterCategory(id)}
                  >
                    {key === 'menu' && (<MenuSvg />)}
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
          {restSubCategory && restSubCategory.map(({ id, name }) => (
            <Caterory
              key={`_category_${id}`}
              active={id === restSubCategoryActive}
              onClick={() => handleFilterDishes(id)}
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

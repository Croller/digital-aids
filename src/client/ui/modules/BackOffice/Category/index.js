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
  EditSvg,
  PlusSvg,
} from 'client/assets/images';
import { 
  CategoryEditWrapper,
  NavBarStyled,
  RestaurantInfoStyled,
  MenuControl,
  ListControls,
  Control,
  ListLng,
  Lng,
  CategoryWrapper,
  ListCategory,
  CategoryEdit,
  Caterory,
  CateroryFormStyled,
  DishControls,
  NewDish,
  ArchiveBtn,
  DishList, DishFormStyled,
} from './styled';

const Category = () => {
  const [t] = useTranslation();
  const params = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [restInfo, setRestInfo] = useState(null);
  const [restCategory, setRestCategory] = useState(null);
  const [restCategoryActive, setRestCategoryActive] = useState(null);
  const [restCategoryEdit, setRestCategoryEdit] = useState(false);
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
    let categoryDishFilter = null;

    if (restaurants) {
      const rest = restaurants.find(f => f.id === params.restaurant);
      rest.languages = ['en', ...rest.languages.filter(f => f !== 'en')];

      categoryFilter = [...(categories ? categories.filter(f => f.parent === params.restaurant) : getCategoryTemp())].filter(f => !['foodtips', 'specialDeals'].includes(f.type));
      categoryDishFilter = [...(dishes || [])].filter(f => f.parent === categoryFilter[0].id);

      setDishCategory(categoryDishFilter);
      setRestCategoryActive(categoryFilter[0]);
      setRestCategory(categoryFilter);
      setRestInfo(rest);
      console.log('categoryFilter', categoryFilter);
    }
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

  const handleFilterCategory = (obj = null) => {
    if (!obj) return [];
    let arr = obj.children ? obj.children.reduce((items, category) => [...items, ...category.dishes], []) : [];
    if (obj.dishes) {
      arr = obj.dishes;
    }
    setDishCategory(arr);
    setRestCategoryActive(obj);
  };

  const handleAddCategory = () => {
    setDishCategory(null);
    setRestCategoryEdit(true);
    setRestCategoryActive(null);
    setRestCategory([...restCategory, null]);
    handleRoute('language', 'en');
  };
  
  const handleChangeCategory = (data = null) => {
    let arr = [...restCategory.filter(f => f && f)];
    setRestCategory(arr);
    setRestCategoryEdit(false);

    if (!data) return;
    if (!data.id) {
      setRestCategoryActive(data);
      arr = [...restCategory.slice(0, restCategory.length - 1), { ...data }];
    } else {
      arr = arr.map((category) => {
        if (category.id === data.id) {
          return {
            ...category,
            ...data,
          };
        }
        return category;
      });
    }
    console.log('category change:', data, arr);
    setRestCategory(arr);
  };

  const handleAddDish = () => {
    setRestCategoryEdit(false);
    if (dishCategory[0] || dishCategory.length === 0) {
      setDishCategory([null, ...dishCategory]);
    }
  };

  const handleChangeDish = (data = null) => {
    console.log('dish change:', data);
    if (!data) return;
    const obj = { ...data };
    if (obj.group) {
      // TODO delete group, add dish id to category
      delete obj.group;
    }
    if (!data || (data && !data.id)) {
      const edited = dishCategory.length === 1 ? [] : dishCategory.shift();
      setDishCategory(edited);
    }
    // rootDispatch(update({ name: 'data_dishes', obj }));
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
    <CategoryEditWrapper>
      {['/dishes/archive', '/special-deals', '/foodtips'].some(f => pathname.indexOf(f) > -1) && (
        <NavBarStyled />
      )}
      {!isArchive && (
        <>
          <RestaurantInfoStyled {...restInfo} />
          {!isTipsDeals && (
            <MenuControl>
              <ListControls>
                <Control>
                  {t('common.words.dailyTempCreate')}
                  <PlusSvg />
                </Control>
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
        <CategoryWrapper>
          <ListCategory>
            {restCategory && restCategory.map((item, i) => item && (
              <Caterory
                key={`_category_${item.key}_${i + 1}`}
                active={restCategoryActive && item.id === restCategoryActive.id}
                onClick={() => handleFilterCategory(item)}
              >
                {item.name}
              </Caterory>
            ))}
            {!isArchive && restCategory.slice(-1)[0] && !restCategoryEdit && (
              <Caterory new onClick={handleAddCategory}>
                {t('common.words.newCategory')}
                <PlusSvg />
              </Caterory>
            )}
          </ListCategory>
          <CategoryEdit
            onClick={() => setRestCategoryEdit(true)}
            disabled={restCategoryEdit}
          >
            <EditSvg />
          </CategoryEdit>
        </CategoryWrapper>
      )}
      {restCategoryEdit && (
        <CateroryFormStyled 
          source={restCategoryActive}
          onChange={handleChangeCategory}
        />
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
          {dishCategory && (
            <NewDish onClick={handleAddDish}>
              {t('common.words.newAdd')}
              <PlusSvg />
            </NewDish>
          )}
          <ArchiveBtn onClick={() => handleRoute('archive')}>
            <ArchiveSvg />
            {t('common.words.archive')}
          </ArchiveBtn>
        </DishControls>
      )}
      <DishList>
        {dishCategory && dishCategory.map((dish) => (
          <DishFormStyled
            key={`_dish_${dish ? dish.id : 'new'}`}
            dish={dish}
            group={restCategoryActive.children}
            dictionary={dictionary}
            currency={restInfo.currency[0]}
            loading={loading}
            archive={isArchive}
            onChange={handleChangeDish}
            onChangeFiles={handleChangeFiles}
          />
        ))}
      </DishList>
    </CategoryEditWrapper>
  );
};

export default Category;

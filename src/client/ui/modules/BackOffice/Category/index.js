import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { init, update, deleteFiles } from 'client/store/backOffice';
import { dataToApi, dataApiToList } from 'client/store/backOffice/mapper/category';
import { getDictionaryItem } from 'client/utils/common';
import {
  AlertCircleSvg,
  ArchiveSvg,
  EditSvg,
  PlusSvg,
} from 'client/assets/images';
import { 
  CategoryEditWrapper,
  LoaderStyled,
  NavBarStyled,
  RestaurantInfoStyled,
  // MenuControl,
  // ListControls,
  // Control,
  ListLng,
  Lng,
  CategoryWrapper,
  ListCategory,
  CategoryEdit,
  Caterory,
  CateroryFormStyled,
  InfoStyled,
  DishControls,
  NewDish,
  ArchiveBtn,
  DishList, DishFormStyled,
  EmptyBlockStyled,
} from './styled';

const Category = () => {
  const [t] = useTranslation();
  const params = useParams();
  const { restaurant, language } = params;
  const { pathname } = useLocation();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [restInfo, setRestInfo] = useState(null);
  const [restCategory, setRestCategory] = useState([]);
  const [restCategoryActive, setRestCategoryActive] = useState(null);
  const [restCategoryEdit, setRestCategoryEdit] = useState(false);
  const [dishCategory, setDishCategory] = useState([]);
  const { user: { roles }, backOffice } = useSelector(s => s);
  const pageSpec = ['foodtips', 'special-deals'];
  const pageSpecActive = pageSpec.find(s => pathname.indexOf(`/${s}`) > -1 && s) || null;
  const isArchive = pathname.indexOf('/archive') > -1;
  const {
    restaurants,
    categories,
    dishes,
    dictionary,
    status,
    loading,
  } = backOffice;

  const initCategory = () => {
    let categoryFilter = [];
    let categoryActive = null;

    const rest = restaurants.find(f => f.id === restaurant);
    if (rest) {
      rest.languages = ['en', ...rest.languages.filter(f => f !== 'en')];

      const restCategories = [...(categories
        ? dataApiToList(categories.filter(f => f.restaurant === restaurant))
        : [])];
      
      if (pageSpecActive === null) {
        categoryFilter = restCategories.filter(f => !pageSpec.includes(f.key) && !f.is_deleted && (isArchive === false ? f.is_archived === isArchive : f));
      }
  
      categoryActive = categoryFilter.length > 0 ? categoryFilter[0] : null;
      if (restCategoryActive && categoryFilter.length > 0) {
        categoryActive = categoryFilter.find(f => f.key === restCategoryActive.key) || categoryFilter[0];
      }

      if (pageSpecActive) {
        categoryActive = categories.find(f => f.key === pageSpecActive && f.restaurant === restaurant);
      }

      setRestCategoryActive(categoryActive);
      setRestCategory(categoryFilter);
      setRestInfo(rest);
    }
  };

  const initDish = () => {
    let dishesFilter = [];
    if (restCategoryActive) {
      dishesFilter = dishes.filter(f => f.category === restCategoryActive.id && !f.is_deleted && f.is_archived === isArchive);
      if (restCategoryActive.children) {
        dishesFilter = dishes.filter(f => restCategoryActive.children.some(s => s.id === f.category) && !f.is_deleted && f.is_archived === isArchive);
      }
    }
    if (pageSpecActive) {
      const categorySpec = categories.find(f => f.restaurant === restaurant && f.key === pageSpecActive);
      dishesFilter = categorySpec ? dishes.filter(f => f.category === categorySpec.id && !f.is_deleted && f.is_archived === isArchive) : [];
    }
    setDishCategory(dishesFilter);
  };

  const getRules = (obj = null) => {
    if (!obj) return false;
    if (pageSpecActive && obj.options && obj.options.rules && dishCategory && obj.options.rules.info.maxLength <= dishCategory.filter(f => f && !f.is_archived).length) {
      return true;
    }
    return false;
  };

  const getRestDishes = () => {
    const defCategory = categories.filter(f => f.restaurant === restaurant && !f.is_archived && !pageSpec.includes(f.key));
    return dishes.filter(f => f.restaurant === restaurant && !f.is_archived && defCategory.some(s => s.id === f.category));
  };

  const getRestDisheCategories = () => {
    if (restCategoryActive.children) {
      return restCategoryActive.children;
    }
    if (!restCategoryActive.children || ['specialDeals', 'foodtips'].includes(restCategoryActive.type)) {
      return restCategoryActive;
    }
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

  const handleAddCategory = () => {
    setDishCategory([]);
    setRestCategoryEdit(true);
    setRestCategoryActive(null);
    setRestCategory([...restCategory, null]);
    handleRoute('language', 'en');
  };
  
  const handleChangeCategory = (data = null) => {
    setRestCategoryEdit(false);
    if (!data && !restCategory[restCategory.length - 1]) {
      const withoutLast = restCategory.slice(0, restCategory.length - 1);
      setRestCategory(withoutLast);
      setRestCategoryActive(withoutLast[0]);
      return;
    }
    if (!data) {
      return;
    }
    if (restCategoryActive && (restCategoryActive.is_archived !== data.is_archived || restCategoryActive.is_deleted !== data.is_deleted)) {
      setTimeout(() => {
        rootDispatch(update({
          name: 'data_dishes',
          data: dishCategory.map(dish => ({
            id: dish.id,
            is_archived: data.is_archived,
            is_deleted: data.is_deleted,
          })), 
        }));
      }, 1500);
    }
    setRestCategoryActive({
      ...data,
      children: data.children ? data.children.filter(f => !f.is_deleted) : null,
    });

    rootDispatch(update({ name: 'data_categories', data: dataToApi(data, restInfo), language }));
  };

  const handleAddDish = () => {
    setRestCategoryEdit(false);
    setDishCategory([null, ...dishCategory]);
    handleRoute('language', 'en');
  };

  const handleChangeDish = (data = null) => {
    if (!data) return;
    rootDispatch(update({ name: 'data_dishes', data, language }));
  };

  const handleChangeFiles = (data = null) => {
    data && rootDispatch(deleteFiles({ data }));
  };

  useEffect(() => {
    if (restaurants && categories && dictionary) {
      initCategory();
    }
  }, [restaurants, categories, dictionary, pathname]);

  useEffect(() => {
    if (dishes) {
      initDish();
    }
  }, [dishes, restCategoryActive, pathname]);

  useEffect(() => {
    rootDispatch(init({ ids: [restaurant], language }));
  }, [params.language]);

  useEffect(() => {
    if (status) {
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);

  useEffect(() => {
    setRestCategoryEdit(false);
    setDishCategory(dishCategory.map(m => m));
  }, [pathname]);

  return (
    <>
      {loading && (<LoaderStyled />)}
      {restInfo && restCategory && (
        <CategoryEditWrapper>
          {['/menu/archive', '/special-deals', '/foodtips'].some(f => pathname.indexOf(f) > -1) && (
            <NavBarStyled />
          )}
          {!isArchive && (
            <>
              <RestaurantInfoStyled {...restInfo} />
              {/* {!pageSpecActive && (
                <MenuControl>
                  <ListControls>
                    <Control>
                      {t('common.words.dailyTempCreate')}
                      <PlusSvg />
                    </Control>
                  </ListControls>
                </MenuControl>
              )} */}
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
                {getDictionaryItem(lng, 'id', dictionary.languages, 'name')}
              </Lng>
            ))}
          </ListLng>
          {!pageSpecActive && restCategory && (
            <CategoryWrapper>
              <ListCategory>
                {restCategory.map((item, i) => item && (
                  <Caterory
                    key={`_category_${item.key}_${i + 1}`}
                    active={restCategoryActive && item.key === restCategoryActive.key}
                    onClick={() => setRestCategoryActive(item)}
                  >
                    {item.name}
                  </Caterory>
                ))}
                {!isArchive && (restCategory.slice(-1)[0] || restCategory.length === 0) && !restCategoryEdit && roles.some(f => f.manager || f.manager_back) && (
                  <Caterory new onClick={handleAddCategory}>
                    {t('common.words.newCategory')}
                    <PlusSvg />
                  </Caterory>
                )}
              </ListCategory>
              {restCategory.length > 0 && !restCategoryEdit && roles.some(f => f.manager || f.manager_back) && (
                <CategoryEdit
                  onClick={() => { 
                    setDishCategory([]);
                    setRestCategoryEdit(true);
                  }}
                >
                  <EditSvg />
                </CategoryEdit>
              )}
            </CategoryWrapper>
          )}
          {restCategoryEdit && (
            <CateroryFormStyled 
              source={restCategoryActive}
              dictionary={dictionary}
              currency={restInfo.currency[0]}
              language={language}
              loading={loading}
              archive={isArchive}
              onChange={handleChangeCategory}
            />
          )}
          {pageSpecActive && restCategoryActive && (
            <InfoStyled
              page={pageSpecActive}
              options={restCategoryActive.options}
            />
          )}
          {!isArchive && restCategoryActive && roles.some(f => f.manager || f.manager_back) && (
            <DishControls>
              <NewDish
                onClick={handleAddDish}
                disabled={getRules(restCategoryActive)}
              >
                {t('common.words.newAdd')}
                <PlusSvg />
              </NewDish>
              <ArchiveBtn
                onClick={() => handleRoute('archive')}
                disabled={categories.length === 0}
              >
                <ArchiveSvg />
                {t('common.words.archive')}
              </ArchiveBtn>
            </DishControls>
          )}
          {dishCategory.length > 0 ? (
            <DishList>
              {dishCategory.map((dish) => (
                <DishFormStyled
                  key={`_dish_${dish ? dish.id : 'new'}`}
                  source={dish}
                  roles={roles}
                  type={restCategoryActive.type}
                  controls={!restCategoryActive.is_archived}
                  dishes={getRestDishes()}
                  categories={getRestDisheCategories()}
                  resaurant={restInfo}
                  dictionary={dictionary}
                  currency={restInfo.currency[0]}
                  loading={loading}
                  archive={isArchive}
                  language={params.language}
                  onChange={handleChangeDish}
                  onChangeFiles={handleChangeFiles}
                />
              ))}
            </DishList>
          ) : (
            <EmptyBlockStyled />
          )}
        </CategoryEditWrapper>
      )}
    </>
  );
};

export default Category;

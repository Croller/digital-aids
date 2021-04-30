import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { update, deleteFiles } from 'client/store/backOffice';
import { dataToApi, dataApiToList } from 'client/store/backOffice/mapper/category';
import { dataToApi as dataToApiDish } from 'client/store/backOffice/mapper/dish';
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
  InfoStyled,
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
  const [restCategory, setRestCategory] = useState([]);
  const [restCategoryActive, setRestCategoryActive] = useState(null);
  const [restCategoryEdit, setRestCategoryEdit] = useState(false);
  const [restDishEdit, setRestDishEdit] = useState(null);
  const [dishCategory, setDishCategory] = useState([]);
  const {
    restaurants,
    categories,
    dishes,
    dictionary,
    status,
    loading,
  } = useSelector(state => state.backOffice);

  const page = ['foodtips', 'special-deals'];
  const pageActive = page.find(s => pathname.indexOf(`/${s}`) > -1 && s) || null;
  const isArchive = pathname.indexOf('/archive') > -1;

  // console.log(restaurants,
  //   categories,
  //   dishes,
  //   dictionary,
  //   status,
  //   loading);

  const init = () => {
    let categoryFilter = null;
    const rest = restaurants.find(f => f.id === params.restaurant);
    if (rest) {
      rest.languages = ['en', ...rest.languages.filter(f => f !== 'en')];

      const restCategories = [...(categories
        ? dataApiToList(categories.filter(f => f.restaurant === params.restaurant && f.is_archived === isArchive))
        : [])];
      
      if (pageActive === null) {
        categoryFilter = restCategories.filter(f => !page.includes(f.key));
        categoryFilter.length > 0 && setRestCategoryActive(categoryFilter[0]);

        setRestCategory(categoryFilter);
      }

      if (pageActive) {
        categoryFilter = restCategories.filter(s => s.key === pageActive); 
        if (categoryFilter.length > 0) {
          setRestCategoryActive(categoryFilter[0]);
          setDishCategory(...[(dishes || [])].filter(f => f.parent === categoryFilter[0].id));
        }
      }
      setRestInfo(rest);
    }
  };

  const initDish = () => {
    let categoryDishFilter = null;

    categoryDishFilter = [...(dishes || [])].filter(f => f.parent === restCategory[0].id);
    setDishCategory(categoryDishFilter);

    if (restDishEdit) {
      const dish = dishes.find(f => f.name === restDishEdit.name);
      const category = categories.find(item => item.name === restDishEdit.group);
      if (dish.id) {
        rootDispatch(update({
          name: 'data_categories',
          data: {
            ...category,
            dishes: [...category.dishes, dish.id], 
          }, 
        }));
      }
    }
  };

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

  const handleAddCategory = () => {
    setDishCategory(null);
    setRestCategoryEdit(true);
    setRestCategoryActive(null);
    setRestCategory([...restCategory, null]);
    handleRoute('language', 'en');
  };
  
  const handleChangeCategory = (data = null) => {
    setRestCategoryEdit(false);
    if (!data) return;
    setRestCategoryActive(restCategory[0]);
    rootDispatch(update({ name: 'data_categories', data: dataToApi(data, restInfo) }));
  };

  const handleAddDish = () => {
    setRestCategoryEdit(false);
    if (dishCategory[0] || dishCategory.length === 0) {
      setDishCategory([null, ...dishCategory]);
    }
  };

  const handleChangeDish = (data = null, currency) => {
    if (!data) return;
    const obj = { ...data };
    let category = null;
    setRestDishEdit(obj);
    if (obj.id && obj.group) {
      // TODO delete group, add dish id to category
      category = categories.find(item => item.name === obj.group);
    }
    delete obj.group;
    if (data && !data.id) {
      const edited = dishCategory.length === 1 ? [] : dishCategory.shift();
      setDishCategory(edited);
    }
    rootDispatch(update({ name: 'data_dishes', data: dataToApiDish(obj, currency) }));
    const exist = category.dishes.find(f => f.id === obj.id);
    if (obj.id) {
      rootDispatch(update({
        name: 'data_categories',
        data: {
          ...category,
          dishes: (exist ? [category.dishes.map(dish => {
            if (dish.id === obj.id) {
              return obj;
            }
            return dish;
          })] : [...category.dishes, obj.id]), 
        }, 
      }));
      setRestDishEdit(null);
    }
  };

  const handleChangeFiles = (data = null) => {
    data && rootDispatch(deleteFiles({ data }));
  };

  useEffect(() => {
    if (restaurants && categories && dictionary) {
      init();
    }
  }, [restaurants, categories, dictionary, pathname]);

  useEffect(() => {
    if (dishes) {
      initDish();
    }
  }, [dishes, restCategory]);

  useEffect(() => {
    if (status) {
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);

  console.log('restCategoryActive', restCategoryActive, restCategory);

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
              {!pageActive && (
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
          {!pageActive && (
            <CategoryWrapper>
              <ListCategory>
                {restCategory && restCategory.filter(item => item && item.key).map((item, i) => item && (
                  <Caterory
                    key={`_category_${item.key}_${i + 1}`}
                    active={restCategoryActive && item.key === restCategoryActive.key}
                    onClick={() => setRestCategoryActive(item)}
                  >
                    {item.name}
                  </Caterory>
                ))}
                {!isArchive && (restCategory.slice(-1)[0] || restCategory.length === 0) && !restCategoryEdit && (
                  <Caterory new onClick={handleAddCategory}>
                    {t('common.words.newCategory')}
                    <PlusSvg />
                  </Caterory>
                )}
              </ListCategory>
              <CategoryEdit
                onClick={() => setRestCategoryEdit(true)}
                disabled={restCategoryEdit || restCategoryActive === null}
              >
                <EditSvg />
              </CategoryEdit>
            </CategoryWrapper>
          )}
          {restCategoryEdit && (
            <CateroryFormStyled 
              source={restCategoryActive}
              dictionary={dictionary}
              currency={restInfo.currency[0]}
              loading={loading}
              archive={isArchive}
              onChange={handleChangeCategory}
            />
          )}
          {pageActive && restCategoryActive && (
            <InfoStyled
              page={pageActive}
              options={restCategoryActive.options}
            />
          )}
          {!isArchive && (
            <DishControls>
              <NewDish
                onClick={handleAddDish}
                disabled={restCategoryActive === null}
              >
                {t('common.words.newAdd')}
                <PlusSvg />
              </NewDish>
              <ArchiveBtn
                onClick={() => handleRoute('archive')}
                disabled={restCategoryActive === null}
              >
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
                group={restCategoryActive.children || null}
                dictionary={dictionary}
                currency={restInfo.currency[0]}
                loading={loading}
                archive={isArchive}
                onChange={(data) => handleChangeDish(data, dish)}
                onChangeFiles={handleChangeFiles}
              />
            ))}
          </DishList>
        </CategoryEditWrapper>
      )}
    </>
  );
};

export default Category;

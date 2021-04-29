import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { update, deleteFiles } from 'client/store/backOffice';
import { dataToApi, dataApiToList } from 'client/store/backOffice/mapper/category';
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
  const [dishCategory, setDishCategory] = useState([]);
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

      categoryFilter = [...(categories
        ? dataApiToList(categories.filter(f => f.restaurant === params.restaurant && !f.is_archived))
        : [])];
      categoryDishFilter = [...(dishes || [])].filter(f => f.parent === categoryFilter[0].id);

      console.log('data loaded', rest, categoryFilter, categoryDishFilter);
      setDishCategory(categoryDishFilter);
      categoryFilter.length > 0 && setRestCategoryActive(categoryFilter[0]);
      setRestCategory(categoryFilter);
      setRestInfo(rest);
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
    // if (!obj) return [];
    // let arr = obj.children ? obj.children.reduce((items, category) => [...items, ...category.dishes], []) : [];
    // if (obj.dishes) {
    //   arr = obj.dishes;
    // }
    // setDishCategory(arr);
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
    const arr = [...restCategory.filter(f => f && f)];

    setRestCategory(arr);
    setRestCategoryEdit(false);
    if (!data) {
      setRestCategoryActive(restCategory[0]);
      return;
    }
    setRestCategoryActive(data);
    rootDispatch(update({ name: 'data_categories', data: dataToApi(data, restInfo) }));
    console.log('category change:', arr, dataToApi(data, restInfo));
  };

  const handleAddDish = () => {
    setRestCategoryEdit(false);
    if (dishCategory[0] || dishCategory.length === 0) {
      setDishCategory([null, ...dishCategory]);
    }
  };

  const handleChangeDish = (data = null) => {
    if (!data) return;
    const obj = { ...data };
    if (obj.group) {
      // TODO delete group, add dish id to category
      delete obj.group;
    }
    if (!data || (data && !data.id)) {
      const edited = dishCategory.length === 1 ? [] : dishCategory.shift();
      setDishCategory(edited);
      console.log('dish change:', edited);
    }
    // rootDispatch(update({ name: 'data_dishes', obj }));
  };

  const handleChangeFiles = (data = null) => {
    data && rootDispatch(deleteFiles({ data }));
  };

  useEffect(() => {
    window.prerenderReady = true;
    init();
  }, [restaurants, categories, dishes, pathname, dictionary]);

  useEffect(() => {
    if (status) {
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);

  return (
    <>
      {loading && (<LoaderStyled />)}
      {restInfo && restCategory && (
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
                {restCategory && restCategory.filter(item => item && item.key).map((item, i) => item && (
                  <Caterory
                    key={`_category_${item.key}_${i + 1}`}
                    active={restCategoryActive && item.key === restCategoryActive.key}
                    onClick={() => handleFilterCategory(item)}
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
      )}
    </>
  );
};

export default Category;

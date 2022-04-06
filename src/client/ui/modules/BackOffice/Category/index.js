import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { init, update, deleteFiles } from 'client/store/backOffice';
import { getAccess, getDictionaryItem } from 'client/utils/common';
import {
  AlertCircleSvg,
  ArchiveSvg,
  PlusSvg,
} from 'client/assets/images';
import { CategoryList } from './CategoryList';
import { 
  CategoryEditWrapper,
  LoaderStyled,
  NavBarStyled,
  RestaurantInfoStyled,
  ListLng,
  Lng,
  InfoStyled,
  DishControls,
  NewDish,
  ArchiveBtn,
  DishList, DishFormStyled,
  EmptyBlockStyled,
} from './styled';

const PA = ['foodtips', 'special-deals'];

const Category = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const params = useParams();
  const rootDispatch = useDispatch();
  const { pathname } = useLocation();
  const { restaurant, language } = params;
  const { user: { roles, info: { token } }, backOffice } = useSelector(s => s);
  const [restInfo, setRestInfo] = useState(null);
  const [restCategory, setRestCategory] = useState([]);
  const [dishCategory, setDishCategory] = useState([]);
  const pageSpecActive = PA.find(s => pathname.indexOf(`/${s}`) > -1 && s) || null;
  const isArchive = pathname.indexOf('/archive') > -1;
  const root = getAccess({ role: 'root', roles });
  const access = getAccess({
    roles,
    role: 'owner',
    project: 'data_restaurants',
    project_id: restaurant,
  });
  const {
    restaurants,
    categories,
    dishes,
    dictionary,
    status,
    loading,
  } = backOffice;

  const initDish = () => {
    let dishesFilter = [];
    if (restCategoryActive) {
      dishesFilter = dishes.filter(f => !f.is_deleted && f.is_archived === isArchive && f.category === restCategoryActive.id);
    }
    if (pageSpecActive) {
      const categorySpec = categories.find(f => f.restaurant === restaurant && f.key === pageSpecActive);
      dishesFilter = categorySpec ? dishes.filter(f => !f.is_deleted && f.is_archived === isArchive && f.category === categorySpec.id) : [];
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
    const defCategory = categories.filter(f => f.restaurant === restaurant && !f.is_archived && !PA.includes(f.key));
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
  
  const handleOnSave = async (name = 'data_categories', data = null, lng = language) => {
    const { languages } = restaurants.find(f => f.id === restaurant);
    data && languages && rootDispatch(update({
      name,
      data,
      language: lng,
      languages,
    }));
  };

  const handleAddDish = () => {
    setDishCategory([null, ...dishCategory]);
  };

  const handleChangeDish = (data = null, lng = language) => {
    if (!data) return;
    rootDispatch(update({ name: 'data_dishes', data, language: lng }));
  };

  const handleChangeFiles = (data = null) => {
    data && rootDispatch(deleteFiles({ data }));
  };

  useEffect(() => {
    if (restaurants) {
      const rest = restaurants.find(f => f.id === restaurant);
      setRestInfo(rest || null);
    }
  }, [restaurants]);

  useEffect(() => {
    if (categories) {
      
      setRestCategory();
    }
  }, [restInfo, categories, pathname]);

  useEffect(() => {
    rootDispatch(init({ id: restaurant, language }));
  }, [language]);

  useEffect(() => {
    if (status) {
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);

  useEffect(() => {
    setDishCategory(dishCategory.map(m => m));
  }, [pathname]);

  return (
    <>
      {loading && (<LoaderStyled />)}
      {restInfo && restCategory && (
        <CategoryEditWrapper>
          <NavBarStyled />
          {!isArchive && (
            <RestaurantInfoStyled {...restInfo} />
          )}
          {pathname.indexOf('/dashboard') === -1 && (
            <>
              <ListLng>
                {restInfo.languages.map((lng, l) => (
                  <Lng
                    key={`_lng_${lng}`}
                    active={lng === params.language}
                    onClick={() => handleRoute('language', lng)}
                  >
                    {l === 0 && (<AlertCircleSvg />)}
                    {getDictionaryItem(lng, 'id', dictionary.languages, 'name')}
                  </Lng>
                ))}
              </ListLng>
              <CategoryList
                categories={categories}
                onSave={handleOnSave} />
              {/* {pageSpecActive && restCategoryActive && (
                <InfoStyled
                  page={pageSpecActive}
                  options={restCategoryActive.options}
                />
              )} */}
              {!isArchive && restCategoryActive && (access || root) && (
                <DishControls>
                  <NewDish
                    onClick={handleAddDish}
                    disabled={getRules(restCategoryActive)}
                  >
                    {`${t('common.words.newPlate')} `}
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
                      token={token}
                      source={dish}
                      roles={roles}
                      type={restCategoryActive.type}
                      controls={!restCategoryActive.is_archived}
                      dishes={getRestDishes()}
                      categories={getRestDisheCategories()}
                      dictionary={dictionary}
                      restaurant={restInfo}
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
            </>
          )}
        </CategoryEditWrapper>
      )}
    </>
  );
};

export default Category;

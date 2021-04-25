import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { update, deleteFiles } from 'client/store/backOffice';
import { getCategoryTemp } from 'client/utils/restaurant';
import { v4 as uuidv4 } from 'uuid';
import {
  AlertCircleSvg,
  ArchiveSvg,
  EditSvg,
  PlusSvg,
} from 'client/assets/images';
import { 
  // CategoryEdit,
  // NavBarStyled,
  // RestaurantInfoStyled,
  CategoryEditWrapper,
  NavBarStyled,
  RestaurantInfoStyled,
  ListMenu,
  MenuControl,
  ListControls,
  MenuBtn,
  Control,
  ListLng,
  Lng,
  CategoryWrapper,
  ListCategory,
  CategoryEdit,
  Caterory,
  NewCaterory,
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
  const [restCategoryNew, setRestCategoryNew] = useState(null);
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

      categoryFilter = [...(categories ? categories.filter(f => f.parent === params.restaurant) : getCategoryTemp())].filter(f => !['foodtips', 'specialDeals'].includes(f.type));
      
      categorySubFilter = categoryFilter[0].children;
      categoryDishFilter = [...(dishes || [])].filter(f => f.parent === categoryFilter[0].id);

      setDishCategory(categoryDishFilter);
      setRestSubCategoryActive(categorySubFilter[0].id);
      setRestSubCategory(categorySubFilter);

      setRestCategoryActive(categoryFilter[0]);
      setRestCategory(categoryFilter);
      setRestInfo(rest);
      console.log('categoryFilter', categoryFilter);
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

  const handleFilterCategory = (obj) => {
    setRestCategoryActive(obj);
    setRestSubCategory(obj.children);
  };

  const handleEditCategory = () => {
    setDishCategory(dishCategory.filter(f => f));
    setRestCategoryNew({});
    handleRoute('language', 'en');
  };
  
  const handleChangeCategory = (obj = null) => {
    let arr = restCategory;
    if (!obj) return;
    if (!obj.id) {
      arr = [...restCategory, { ...obj, id: uuidv4() }];
    } else {
      arr = restCategory.map((category) => {
        if (category.id === obj.id) {
          return {
            ...category,
            ...obj,
          };
        }
        return category;
      });
    }
    console.log(arr);
    setRestCategory(arr);
    setRestCategoryNew(null);
  };

  const handleDeleteCategory = (obj = null) => {
    if (obj) {
      const filtred = restCategory.filter(f => f.id !== obj.id);
      setRestCategory(filtred);
      setRestCategoryActive(filtred[0] || null);
    }
    setRestCategoryNew(null);
  };

  const handleCreateDish = () => {
    setRestCategoryNew(null);
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
    <CategoryEditWrapper>
      {['/dishes/archive', '/special-deals', '/foodtips'].some(f => pathname.indexOf(f) > -1) && (
        <NavBarStyled />
      )}
      {!isArchive && (
        <>
          <RestaurantInfoStyled {...restInfo} />
          {!isTipsDeals && (
            <MenuControl>
              {/* <ListMenu>
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
              </ListMenu> */}
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
            {restCategory && restCategory.map((item) => (
              <Caterory
                key={`_category_${item.id}`}
                active={!restCategoryNew && restCategoryActive && item.id === restCategoryActive.id}
                onClick={() => !restCategoryNew && handleFilterCategory(item)}
              >
                {item.name}
              </Caterory>
            ))}
            {!isArchive && !restCategoryNew && (
              <NewCaterory onClick={handleEditCategory}>
                {t('common.words.newCategory')}
                <PlusSvg />
              </NewCaterory>
            )}
          </ListCategory>
          {!restCategoryNew && (
            <CategoryEdit onClick={() => setRestCategoryNew(restCategoryActive)}>
              <EditSvg />
            </CategoryEdit>
          )}
        </CategoryWrapper>
      )}
      {restCategoryNew && (
        <CateroryFormStyled 
          source={restCategoryNew}
          onSave={handleChangeCategory}
          onDelete={handleDeleteCategory}
          onClose={() => setRestCategoryNew(null)}
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
          <DishFormStyled
            key={`_dish_${dish ? dish.id : 'new'}`}
            dish={dish}
            loading={loading}
            dictionary={dictionary}
            onChangeDish={handleChangeDish}
            onChangeFiles={handleChangeFiles}
          />
        ))}
      </DishList>
    </CategoryEditWrapper>
  );
};

export default Category;

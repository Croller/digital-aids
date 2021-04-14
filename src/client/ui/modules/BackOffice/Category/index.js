import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { update } from 'client/store/backOffice';
import {
  ArchiveSvg,
  MenuSvg,
  PlusSvg,
} from 'client/assets/images';
import { 
  // CategoryEdit,
  // NavbarStyled,
  // RestaurantInfoStyled,
  CategoryEdit,
  NavbarStyled,
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
  AddDish,
  ArchiveBtn,
} from './styled';

const Category = () => {
  const obj = useSelector(state => state.restaurant.categories);


  const [t] = useTranslation();
  const params = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [restaurant, setRestaurant] = useState(null);
  const [categoryRest, setCategoryRest] = useState(obj.map(item => ({ ...item, id: item.id.toString() })));
  const [categoryNew, setCategoryNew] = useState(null);
  const [dishCat, setDishsCat] = useState([]);
  const {
    restaurants,
    categories,
    dishes,
    dictionary,
    status,
    loading,
  } = useSelector(state => state.backOffice);

  const handleEvent = (obj) => {
    rootDispatch(update({ name: 'data_category', data: obj }));
  };

  const isTipsDeals = ['/special-deals', '/foodtips'].some(f => pathname.indexOf(f) > -1);
  const isArchive = ['/archive'].some(f => pathname.indexOf(f) > -1);

  const getItemDictionary = (id) => {
    const item = dictionary.language.find(f => f.id === id);
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
      name: 'New category',
    });
    handleRoute('lng', 'en');
  };

  useEffect(() => {
    window.prerenderReady = true;
    if (restaurants) {
      const rest = restaurants.find(f => f.id === params.restaurant);
      rest.languages = ['en', ...rest.languages.filter(f => f !== 'en')];
      
      if (categories) {
        const categoryFilter = categories.filter(f => f.parent === params.restaurant);

        if (dishes) {
          const categoryCurrent = categoryFilter.filter(f => f.id === params.category);
          const dishesFilter = dishes.filter(f => categoryCurrent.dishes.includes(f.id));
          setDishsCat(dishesFilter);
        }
        setCategoryRest(categoryFilter);
      }
      setRestaurant(rest);
    }
  }, [restaurants, categories, pathname]);

  return restaurant && categoryRest && (
    <CategoryEdit>
      {['/dishes/archive', '/special-deals', '/foodtips'].some(f => pathname.indexOf(f) > -1) && (
        <NavbarStyled />
      )}
      {!isArchive && (
        <>
          <RestaurantInfoStyled {...restaurant} />
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
                {categoryRest.filter(f => f.dailymenu).map(({ id, name }) => (
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
        {restaurant.languages.map(lng => (
          <Lng
            key={`_lng_${lng}`}
            active={lng === params.language}
            onClick={() => handleRoute('language', lng)}
          >
            {getItemDictionary(lng)}
          </Lng>
        ))}
      </ListLng>
      {!isTipsDeals && (
        <ListCategory>
          {categoryRest.map(({ id, name }) => (
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
          <AddDish>
            {t('common.words.addPlate')}
            <PlusSvg />
          </AddDish>
          <ArchiveBtn onClick={() => handleRoute('archive')}>
            <ArchiveSvg />
            {t('common.words.archive')}
          </ArchiveBtn>
        </DishControls>
      )}
      {/* <DishList>
        efee
      </DishList> */}
    </CategoryEdit>
  );
};

export default Category;

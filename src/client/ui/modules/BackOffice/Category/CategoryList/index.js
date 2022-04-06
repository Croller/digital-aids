import React, { useState, useEffect } from 'react';
import {
  EditSvg,
  PlusSvg,
} from 'client/assets/images';
import {
  CategoryWrapper,
  ListCategory,
  CategoryEdit,
  Caterory,
} from './styled';

export const CategoryList = (categories = null, onAddonSelect = () => {}) => {
  const initCategory = async () => {
    let categoryFilter = [];
    let categoryActive = null;

    const rest = restaurants.find(f => f.id === restaurant);
    if (rest) {
      categoryFilter = categories.filter(f => !f.is_deleted && f.is_archived === isArchive);
  
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

  const getCategoryArray = () => {
    let arr = [null];
    if (!pageSpecActive && restCategory && restCategoryActive && (restCategoryActive.type === 'daily-menu' || restCategoryActive.parent)) {
      arr = [...arr, restCategoryActive.id];
    }
    return arr;
  };

  const handleSetRestCategoryActive = (item = null) => {
    let categoryFilter = categories.filter(f => !f.is_deleted && f.is_archived === isArchive);
    if (item) {
      categoryFilter = categoryFilter.filter(f => f.id === item.id || f.id === item.parent);
    }
    setRestCategoryActive(categoryFilter);
    console.log('categoryFilter', categoryFilter);
  };

  const handleAddCategory = (parent) => {
    const newCategory = { id: null, parent };
    setDishCategory([]);
    setRestCategoryEdit(true);
    setRestCategoryActive(newCategory);
    setRestCategory([...restCategory, newCategory]);
  };

  const getHightlightActive = (item = null) => {
    if (!restCategoryActive || !item) return false;
    const { id, parent } = restCategoryActive;
    return item.id === id || item.id === parent;
  };


  useEffect(() => {
    if (restaurants && categories && dictionary) {
      initCategory();
    }
  }, [restaurants, dictionary, pathname]);


  return categories && getCategoryArray().map((parent, p) => (
    <>
      <CategoryWrapper key={`_category_${parent}_${p + 1}`}>
        <ListCategory>
          {restCategory.filter(f => !f || f.parent === parent).map((item, i) => item && (
            <Caterory
              key={`_category_${item.key}_${i + 1}`}
              active={getHightlightActive()}
              onClick={() => handleSetRestCategoryActive(item)}
            >
              {item.name}
            </Caterory>
          ))}
          {!isArchive && (restCategory.slice(-1)[0] || restCategory.length === 0) && !restCategoryEdit && (access || root) && (
            <Caterory new onClick={() => handleAddCategory(parent)}>
              {t('common.words.newCategory')}
              <PlusSvg />
            </Caterory>
          )}
        </ListCategory>
        {restCategory.length > 0 && !restCategoryEdit && (access || root) && (
          <CategoryEdit
            onClick={() => { 
              setRestCategoryEdit(true);
            }}
          >
            <EditSvg />
          </CategoryEdit>
        )}
      </CategoryWrapper>

      {restCategoryEdit && (
        <CategoryFormStyled
          source={restCategoryActive}
          dictionary={dictionary}
          restaurant={restInfo}
          currency={restInfo.currency[0]}
          language={language}
          loading={loading}
          archive={isArchive}
          onSave={handleOnSaveCategory}
          onClose={handleOnCloseCategory}
        />
      )}
    </>
  ));
};

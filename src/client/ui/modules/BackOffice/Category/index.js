import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { update } from 'client/store/backOffice';
import { 
  CategoryEdit,
  NavbarStyled,
  RestaurantInfoStyled,
} from './styled';

const Category = () => {
  const [t] = useTranslation();
  const params = useParams();
  const rootDispatch = useDispatch();
  const { restaurants, status, loading } = useSelector(state => state.backOffice);

  const constCheckRest = () => restaurants && restaurants.find(f => f.id === params.restaurant);

  const handleChange = (obj) => {
    rootDispatch(update({ name: 'data_category', data: obj }));
  };

  useEffect(() => {
    window.prerenderReady = true;
    !constCheckRest() && history.push('/restaurns');
  }, []);

  return (
    <CategoryEdit>
      <NavbarStyled />
      <RestaurantInfoStyled
        t={t}
        onClick={handleChange}
        {...constCheckRest()}
      />
    </CategoryEdit>
  );
};

export default Category;

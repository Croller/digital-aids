import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OfferRestaurantModal } from 'client/ui/components/_block/Modal/Offer/Restaurant';

export const Modal = () => {
  const {
    offers,
  } = useSelector(store => store.restaurant);
  const params = useParams();
  const [offerRestaurant, setOfferRestaurant] = useState(false);

  console.log(params);

  const handleToggleOfferRestaurant = () => {
    setOfferRestaurant(!offerRestaurant);
  };

  useEffect(() => {
    handleToggleOfferRestaurant();
  }, []);

  // TODO replace here modal offers
  return (
    <>
      {offerRestaurant && (
        <OfferRestaurantModal
          source={offers[0]}
          onClose={handleToggleOfferRestaurant}
        />
      )}
    </>
  );
};

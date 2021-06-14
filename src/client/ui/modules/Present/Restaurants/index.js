import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { init } from 'client/store/company';
import { Loader } from 'client/ui/components/_block/Loader';
import { getLayerObj } from 'client/ui/components/_ui/MapBox/utils/create';
import * as turf from '@turf/turf';
import { QRCode } from 'react-qrcode-logo';
import { getUrl } from 'client/utils/common';
import { detect } from 'detect-browser';
import OutSideClick from 'react-outside-click-handler';

import {
  LoupeSvg,
  RestaurantSvg,
  MapMarkerSvg,
} from 'client/assets/images';
import {
  RestaurantsWrapper,
  Search,
  Content,
  ListWrapper, List,
  Restaurant,
  Header,
  Name,
  // Controls,
  // Control,
  Hr,
  Contacts,
  Address,
  QRCodeWrapper,
  MapBoxStyled,
} from './styled';

const SEARCH_FIELDS = ['name', 'address', 'phone'];

const Restaurants = () => {
  const rootDispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const [active, setActive] = useState(null);
  const { user, company } = useSelector(s => s);
  const { token } = user.info;
  const { restaurants } = company;

  const isMobile = () => {
    const mobile = ['iOS', 'Android OS', 'BlackBerry OS', 'Windows Mobile'];
    const browser = detect();

    if (browser) {
      return mobile.some(f => f === browser.os);
    }
    return true;
  };

  const getLayer = (arr) => {
    const { geojson } = getLayerObj({
      id: 'restaurants',
      features: arr.map(restaurant => turf.flip(restaurant)),
      options: {},
    });
    return [geojson];
  };

  const handleSearch = (str = null) => {
    let result = null;
    if (str && str.length > 0) { 
      const lower = str.toLowerCase();
      result = restaurants.filter(item => SEARCH_FIELDS.some(field => {
        let value = item.properties[field];
        if (!value) return false;
        if (Array.isArray(value)) {
          return value.some(val => val.toLowerCase().indexOf(lower) > -1);
        }
        value = value.toString();
        return value.toLowerCase().indexOf(lower) > -1;
      }));
    }
    setSearch(result);
  };

  const handleRoute = (key = null) => {
    if (!key) return null;
    window.open(`${getUrl()}/restaurant/${key}/information`, '_blank').focus();
  };

  const handleClickMap = (obj = null) => {
    if (obj.layers) {
      setActive(obj.layers[0].properties.id);
      return;
    }
    setActive(null);
  };

  useEffect(() => {
    if (token) {
      rootDispatch(init());
    }
  }, [token]);

  return (
    <RestaurantsWrapper>
      {!restaurants ? (
        <Loader />
      ) : (
        <Content>
          <ListWrapper>
            <Search
              allowClear
              prefix={<LoupeSvg />}
              onChange={handleSearch}
            /> 
            <List>
              {(search || restaurants).map(({
                properties: {
                  id,
                  key,
                  name,
                  address,
                },
              }) => (
                <Restaurant
                  key={`_rest_${key}`}
                  active={active === id}
                  onClick={() => (isMobile() ? handleRoute(key) : setActive(id))}
                >
                  <Header>
                    <Name
                      icon={<RestaurantSvg />}
                      text={name}
                    />
                    {/* <Controls>
                        {getControl().map(({ key, icon, path }) => (
                          <Tooltip key={key} placement="top" title={t(`common.words.${key}`)}>
                            <Control onClick={() => handleRoute(key, path)}>
                              {icon}
                            </Control>
                          </Tooltip>
                        ))}
                      </Controls> */}
                  </Header>
                  <Hr />
                  <Contacts>
                    <Address
                      icon={<MapMarkerSvg />}
                      text={address}
                    />
                  </Contacts>
                  {!isMobile() && active === id && (
                    <QRCodeWrapper>
                      <OutSideClick onOutsideClick={() => setActive(null)}>
                        <QRCode size={90} value={`${getUrl()}/restaurant/${key}/information`} />
                      </OutSideClick>
                    </QRCodeWrapper>
                  )}
                </Restaurant>
              ))}
            </List>
          </ListWrapper>
          <MapBoxStyled
            layers={getLayer(search || restaurants)}
            onClick={handleClickMap}
          />
        </Content>
      )}
    </RestaurantsWrapper>
  );
};

export default Restaurants;

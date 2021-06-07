import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { init } from 'client/store/company';
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
  MapBoxStyled,
} from './styled';

const SEARCH_FIELDS = ['name', 'address', 'phone'];

const Restaurants = () => {
  const rootDispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState(null);
  const { user, company } = useSelector(s => s);
  const { token } = user.info;
  const { restaurants } = company;

  const handleSearch = (str = null) => {
    let result = null;
    if (str && str.length > 0) { 
      result = restaurants.filter(item => SEARCH_FIELDS.some(field => {
        let value = item.properties[field];
        if (!value) return false;
        value = value.toString();
        if (Array.isArray(value)) {
          return value.some(val => val.toLowerCase().indexOf(str) > -1);
        }
        return value.toLowerCase().indexOf(str) > -1;
      }));
    }
    setSearch(result);
  };

  const handleRoute = (key = null) => {
    if (!key) return null;
    history.push(`/restaurant/${key}/information`);
  };

  useEffect(() => {
    if (token) {
      rootDispatch(init());
    }
  }, [token]);

  return (
    <RestaurantsWrapper>
      <Content>
        {restaurants && (
          <ListWrapper>
            <Search
              allowClear
              prefix={<LoupeSvg />}
              onChange={handleSearch}
            /> 
            <List>
              {(search || restaurants).map(({
                properties: {
                  key,
                  name,
                  address,
                },
              }) => (
                <Restaurant key={`_rest_${key}`} onClick={() => handleRoute(key)}>
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
                </Restaurant>
              ))}
            </List>
          </ListWrapper>
        )}
        <MapBoxStyled />
      </Content>
    </RestaurantsWrapper>
  );
};

export default Restaurants;

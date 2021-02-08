import React from 'react';
import './menu.scss';
import { connect } from 'react-redux';
import {
  CircularProgress, Container, Grid, Select, MenuItem, Button, 
} from '@material-ui/core';
import A from '../../redux/actionTypes';
import Service from '../../services/restaurants';
import Spinner from '../../template/common/Spinner';
import ErrorPage from '../../template/common/error-loading';

class Menu extends React.Component {
    state ={
      restaurant: null,
    }

    componentDidMount() {
      this.fetchData();
    }
    
    componentDidUpdate(prevProps) {
      if (prevProps.language !== this.props.language) {
        this.fetchData();
      }
    }

    async fetchData() {
      console.log('Fetching data');
      const { slug } = this.props.computedMatch.params;
      const { language } = this.props;
      const restaurant = await Service.getRestaurant(slug, language);
      this.setState({ restaurant });
    }

    render() {
      const { restaurant } = this.state;
        
      const { language } = this.props;
      const { slug } = this.props.computedMatch.params;

      return (
        restaurant 
          ? (
            <Container key={slug}>
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h1>{restaurant.title}</h1>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Select
                    value={language}
                    onChange={(ev, newVal, a) => this.props.lang(newVal.props.value)}
                  >
                    {restaurant.languages.split(',').map(l => <MenuItem value={l}>{l}</MenuItem>)}
                        
                  </Select>
                </Grid>
              </Grid>
              <div>
                Cuisine: 
                {' '}
                {restaurant.cuisines.join(', ')}
              </div>
              <div>
                Address: 
                {' '}
                {restaurant.address}
              </div>
              <div className="categories">
                {restaurant.categories.map(cat => (
                  <Button variant="contained">{cat.title}</Button>
                ))}
              </div>
              <Grid container spacing={4}>
                {restaurant.categories.map(cat => (
                  <Grid item xs={12}>
                    <h3>{cat.title}</h3>
                    <Grid container spacing={2}>
                      {restaurant.menu.filter(d => d.dishcategoryid === cat.id).map(
                        dish => (
                          <Grid item xs={12}>
                            {dish.dishtitle}
                            {dish.dishprice && `: $${dish.dishprice}`}
                          </Grid>
                        ),
                      ) }
                    </Grid>
                  </Grid>
                ))
                }
              </Grid>
                        
            </Container>
          )
          : restaurant === null ? <Spinner /> : <ErrorPage />
      );
    }
}

export default connect(
  state => state.app,
  dispatch => ({
    lang: payload => dispatch({ type: A.SET_LANGUAGE, payload }),
  }),
)(Menu);

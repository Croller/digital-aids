import React from 'react';
import './restaurant.scss';
import { connect } from 'react-redux';
// import Service from '../../services/restaurants'
// import Footer from '../template/footer'
// import { CircularProgress, Container, Grid, Select, MenuItem, Button, Paper, AppBar } from '@material-ui/core'
// import {
//     LocationOnOutlined as Location, 
//     FastfoodOutlined as Food,
//     PhoneInTalkOutlined as Phone,
//     AccessTimeOutlined as Time
// } from '@material-ui/icons'

import { Redirect } from 'react-router-dom';
import A from '../../redux/actionTypes';

import Menu from './menu';
// import Menu from './menu/index2'

// import Topbar from './topbar'
import Spinner from '../template/common/Spinner';
// import Lang from '../restaurant/language'
// import Social from './social'
import ErrorPage from '../template/common/error-loading';

class RestaurantComponent extends React.Component {
    state ={
      restaurant: null,
    }

    // componentDidMount(){

    //     this.fetchData()
    // }
    
    // componentDidUpdate( prevProps ){
    //     if( prevProps.language !== this.props.language 
    //         || this.props.match.slug !== prevProps.match.slug ){
    //         this.fetchData()
    //     }
    // }

    // async fetchData(){
    //     console.log("Fetching data")
    //     const {slug} = this.props.match.params
    //     const {language} = this.props
    //     const restaurant = await Service.getRestaurant( slug, language )
    //     this.setState({restaurant})
    // }

    render() {
      // const {restaurant} = this.state
        
      const {
        language, lang, restaurant, restState = {}, 
      } = this.props;
        
      // if( !language ) return <Lang {...{restaurant}} />
      // const {slug} = this.props.match.params
      const { slug, menu, category } = this.props.match.params;
      console.debug('Match: ', this.props.match);
        
      if (!language) {
        // redirect to language selector
        // return <Redirect to={`/${slug}/language`} />
        // this.props.setOverlay({slug, overlay:"language"})
      }

      return (
        restaurant 
          ? (
            <>
              {/* <Topbar {...{restaurant, language, lang}} /> */}
              {/* <div key={slug} className="flex-grow"> */}
              <Menu
                key={slug}
                className="flex-grow"
                {...{
                  slug, menu, restaurant, category, restState, 
                }}
              />
              {/* </div> */}
              {/* <Social {...restaurant} /> */}
              {/* <Footer {...restaurant} /> */}
            </>
          )
          : restaurant === null ? <Spinner /> : <ErrorPage {...{ slug, language }} /> // <h2>Error loading data</h2>
      );
    }
}

export default connect(
  state => state.app,
  dispatch => ({
    lang: payload => dispatch({ type: A.SET_LANGUAGE, payload }),
    setOverlay: payload => dispatch({ type: A.SET_OVERLAY, payload }),
  }),
)(RestaurantComponent);

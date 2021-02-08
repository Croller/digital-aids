import { Button } from '@material-ui/core';
import React from 'react';
import { RefreshOutlined } from '@material-ui/icons';
import './error-loading.scss';
import { connect } from 'react-redux';
import { ChefHead } from '../icons';
import Service, { _T, tr } from '../../../../services/translations';
// import {getRestaurant} from '../../../../redux/reducers'
import Spinner from '../Spinner';

const defaultErrorText = 'Oops! It seems that something went wrong, but we are here to help you! Press the button to retry.';
const defaultButtonText = 'Try again';
const { REACT_APP_MEDIA: MEDIA } = process.env; 

class ErrorPage extends React.Component {
    state = {
      translations: null,
      reloading: false,
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
      Service.getByKeys(
        [
          'errorText', 
          'tryAgain',
        ],
        this.props.language,
      );

      // this.setState({translations})
    }

    reloadPage() {
      this.setState({ reloading: true });
      window.location.reload();
    }

    render() {
      const {
        language = 'en', 
        defaultlanguage = 'en', 
        slug, 
        restaurant, 
        image, 
        title,
        translations,
      } = this.props;
      // const restaurant = getRestaurant(this.props, slug)
      console.log('Error restaurant:', restaurant);
        
      const { reloading } = this.state;
      const _tt = (key, defaultValue) => tr(key, language, translations, defaultValue);
        
      // if( translations )    {
      return (
        <div className="error-page flex column align-items-center">
          <div className="panel flex column align-items-center justify-center m4 p3">
            <div className="round-icon">
              <ChefHead />
            </div>
            {image && (
              <img
                className="logo"
                alt={title} 
                title={title} 
                src={`${MEDIA}/images/restaurants/${slug}/${image}`}
              />
            )}
            <div className="error-text">{ _tt('errorText', defaultErrorText) }</div>
            {/* <div className="error-text">{defaultErrorText}</div> */}
            <div>
              {reloading 
                ? <Spinner />
                : (
                  <Button onClick={() => this.reloadPage()}>
                    <RefreshOutlined /> 
                    {' '}
                    { _tt('tryAgain', defaultButtonText) }
                  </Button>
                )
              }
            </div>
          </div>
        </div>
      );
    }
}

export default connect(
  state => ({ ...state.app, translations: state.translation }), null,
)(ErrorPage);

import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import DefaultComponent, { connect } from '../../DefaultComponent';
import { ChefHead } from '../common/icons';
import './style.scss';

const MEDIA = process.env.REACT_APP_MEDIA;

class P404 extends DefaultComponent {
  constructor(props) {
    super(props);

    this.setTranslations(
      [
        'Menu',
        'The page cannot be found',
        'Hmm, you\'ve got lost',
      ],
    );
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
        
    const _tt = (key) => this._tr(key, language, translations);
        
    // if( translations )    {
    return (
      <div className="error-page page404 flex column align-items-center">
        {image && (
          <img
            className="logo"
            alt={title} 
            title={title} 
            src={`${MEDIA}/images/restaurants/${slug}/${image}`}
          />
        )}
        <div className="panel flex column align-items-center justify-center m4 p3">
          <div className="round-icon">
            <ChefHead />
          </div>
          <div className="h404">404</div>
          { !restaurant 
                        && <div className="error-text">{ _tt('Hmm, you\'ve got lost') }</div>
          }
          {/* <div className="error-text">{defaultErrorText}</div> */}
          {restaurant && restaurant.slug 
                        && (
                          <>
                            <div className="error-text">{ _tt('The page cannot be found') }</div>
                            <Button className="button" component={Link} to={`/${restaurant.slug}`}>{ _tt('Menu') }</Button>
                            
                          </>
                        )
          }
        </div>
      </div>
    );
  }
}

export default connect(P404);

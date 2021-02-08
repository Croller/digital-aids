import React from 'react';
import './style.scss';
import {
  Paper, Grid, 
  // Container, Button, 
  Modal,
} from '@material-ui/core';
import {
  ChevronLeft, ChevronRight, Close,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {
  InstagramIcon, 
  FacebookIcon, 
  // TheForkIcon
  TripadvisorIcon,
} from '../../template/common/icons';
// import Social from '../social'
// import Service from '../../../services/restaurants'
// import TagsService from '../../../services/tags'
// import A from '../../../redux/actionTypes'
// import {connect} from 'react-redux'
import Spinner from '../../template/common/Spinner';
// import TopBar from '../topbar'
import ErrorPage from '../../template/common/error-loading';
// import Footer from '../../template/footer'
import CSSCarousel from '../../template/common/css-carousel';
import DefaultComponent, { connect } from '../../DefaultComponent';

const { REACT_APP_MEDIA: MEDIA } = process.env; 

const ALink = props => <a rel="noreferrer" target="_blank" href={props.to}>{props.children}</a>;

const txt = {
  reglament_1169: 'Reglament (EU) №1169/2011',

};

const _t = key => txt[key] || key;

// class Insider extends React.Component{
class Insider extends DefaultComponent {
    _Carousel = React.createRef();

    constructor(props) {
      super(props);

      this.setTranslations([
        'Total',
      ]);
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
    //     if( restaurant ){
    //         const tags = await TagsService.getAll(slug, language, restaurant.defaultlanguage )
    //         this.setState({restaurant, tags})
    //     }
    // }

    prevSlide = () => {
      if (this._Carousel.current.prevSlide) this._Carousel.current.prevSlide();
      else console.error('Not found prevSlide in carousel: ', this._Carousel.current);
    }

    nextSlide = () => {
      if (this._Carousel.current.nextSlide) this._Carousel.current.nextSlide();
      else console.error('Not found nextSlide in carousel: ', this._Carousel.current);
    }

    render() {
      let {
        language, restaurant, prevPage, translations, 
      } = this.props;

      const { slug } = this.props; // .computedMatch.params
      prevPage = prevPage || `/${slug}`;
        
      const {
        insiders = [],
        instagram, 
        facebook, 
        tripadvisor,
        // thefork
      } = restaurant;
      console.debug('insiders:', insiders);
      console.debug('insider restaurant:', restaurant);
    
      // tranlsate
      const _t = key => this._tr(key, language, translations);
        
      // if( !language){
      //     // redirect to language selector
      //     // return <Redirect to={`/${slug}/language`} />
      //     // this.props.setOverlay({overlay:"language", slug})
      // }

      return (
        restaurant
          ? (
            <Modal 
              open  
              className="insider-modal"
            >
              <Paper className="insider panel rectangular"> 
                
                <Link className="close-button" to={prevPage}><Close /></Link>
                
                <CSSCarousel 
                  ref={this._Carousel}
                  useJs
                  slidesCssClass="disable-scrollbars"
                >
                  {insiders.map((insider, ind) => {
                    console.debug('insider item:', insider);
                    const {
                      insiderid, text, imagetext, image, dish, price, 
                    } = insider;

                    return (
                      <div className="insider-item" key={`insider-${insiderid}`}>
                        <div className="insider-container">
                          {/* <Grid item xs={12} md={6} */}
                          <div
                            className="image-holder"
                            style={{
                              backgroundImage: `url(${MEDIA}/images/restaurants/${slug}/dishes/${image})`,
                            }}
                          >
                            {/* <img src={`${MEDIA}/images/restaurants/${slug}/dishes/${image}`} 
                                        title={imagetext} 
                                        alt={imagetext}/> */}
                            {/* </Grid> */}
                          </div>
                          {/* <Grid item xs={12} md={6}> */}
                          <div>
                            <div className="text-block">

                              <h2>{imagetext}</h2>
                              <div className="main-text">
                                <span onClick={this.prevSlide} className="arrow left"><ChevronLeft /></span>
                                <div>
                                  <p>
                                  {text}
                                </p>
                                  { dish 
                                                        && (
                                                          <div className="price-block">
                                                            <span>
                                                              {_t('Total')}
                                                              :
                                                            </span>
                                                            <span>
                                                              { (dish.dishprice * 1).toFixed(2) }
                                                              &euro;
                                                            </span>
                                                          </div>
                                                        )
                                  }
                                </div>
                                <span onClick={this.nextSlide} className="arrow right"><ChevronRight /></span>
                              </div>
                              <div className="social-insider">
                                <div className="text">
                                  Don’t waste your time,
                                  <br /> 
                                  Taste the world every day!
                                </div>
                                <div className="foodfans-signature">
                                  Foodfans Insider
                                </div>
                                <div className="social-icons">
                                  { instagram && <ALink to={instagram}><InstagramIcon /></ALink> }
                                  {/* { thefork && <ALink to={thefork}><TheForkIcon /></ALink> } */}
                                  { tripadvisor && <ALink to={tripadvisor}><TripadvisorIcon /></ALink> }
                                  { facebook && <ALink to={facebook}><FacebookIcon /></ALink> }
                                  {/* <InstagramIcon component={Link} to="#!" />
                                                    <FacebookIcon component={Link} to="#!" /> */}
                                </div>
                              </div>
                            </div>
                            {/* </Grid> */}
                          </div>
                        </div>
                                
                      </div>
                    );
                  })}
                </CSSCarousel>
              </Paper>
            </Modal>
          )
          : restaurant === false ? <ErrorPage /> : <Spinner />
        
      );
    }
}

export default connect(Insider);

// export default connect(
//     state => state.app,
//     dispatch => ({
//         lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
//         setOverlay: payload => dispatch( {type: A.SET_OVERLAY, payload })
//     })
// )(Insider)

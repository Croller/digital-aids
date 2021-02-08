import React from 'react';
import './style.scss';
import {
  // Paper, Grid, 
  Container, 
  // Button
} from '@material-ui/core';
// import {
//     LocationOnOutlined as Location, 
//     FastfoodOutlined as Food,
//     PhoneInTalkOutlined as Phone,
//     AccessTimeOutlined as Time
// } from '@material-ui/icons'
// import {PhoneCall, Chef} from '../../template/common/icons'
import Social from '../social';
// import {Redirect} from 'react-router-dom'
// import Service from '../../../services/restaurants'
// import TagsService from '../../../services/tags'
import 
// TranslService, 
{ tr } from '../../../services/translations';
// import A from '../../../redux/actionTypes'
// import {connect} from 'react-redux'
import Spinner from '../../template/common/Spinner';
// import TopBar from '../topbar'
import ErrorPage from '../../template/common/error-loading';
import DefaultComponent, { connect } from '../../DefaultComponent';
import { updateScroll } from '../../../utils/functions';

const { REACT_APP_MEDIA: MEDIA } = process.env; 

const txt = {
  reglament_1169: 'Reglament (EU) №1169/2011',

};

// scroll top tracker
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
// root element
const root = document.getElementById('root');

// const _t = key => txt[key] || key

class Reglament extends DefaultComponent {
  // state ={

  // }

  // componentDidMount(){

  //     this.fetchData()
  // }
    
  // componentDidUpdate( prevProps ){
  //     if( prevProps.language !== this.props.language 
  //         || this.props.slug !== prevProps.slug ){
  //         this.fetchData()
  //     }
  // }

  // async fetchData(){
  //     console.log("Fetching data")
        
  //     const {slug, language, restaurant } = this.props
        
  //     TranslService.getByKeys([
  //         "reglament_text_1",
  //         "reglament_text_2",
  //         "reglament_1169"
  //     ], language, restaurant ? restaurant.defaultlanguage : null )

  //     // const restaurant = await Service.getRestaurant( slug, language )
        
  //     const tags = await TagsService.getAll(slug, language, restaurant ? restaurant.defaultlanguage : "en" );
  //     this.setState({tags})
  //     //     const translations = await TranslService.getByKeys(
  //     //         [
  //     //             "reglament_text_1", 
  //     //             "reglament_text_2",
  //     //             "reglament_1169"
  //     //         ]    
  //     //         , language, restaurant.defaultlanguage )
                
  //     //         this.setState({restaurant, tags, translations})
  //     //     }
        
  // }

  constructor(props) {
    super(props);

    this.setTranslations(
      [
        'reglament_text_1', 
        'reglament_text_2',
        'reglament_text_3',
        'reglament_1169',
      ],  
    );
  }

  render() {
    const {
      restaurant, language, translations, restState, 
    } = this.props;
        
    const { translationLoaded } = this.state;

    console.debug('reglament translationLoaded:', translationLoaded);
    if (translationLoaded === null) return <Spinner />;
    if (translationLoaded === false) return <ErrorPage image={restaurant ? restaurant.logo : false} />;
        
    // const _t = key => translations[key] ? translations[key][language] || key : key
    // const _t1 = key => translations[key] ? translations[key][restaurant.defaultlanguage] || key : key

    const _t = (key) => tr(key, language, translations); 
    const _t1 = (key) => tr(key, restaurant.defaultlanguage, translations); 
    const { slug } = this.props; // .computedMatch.params
        
    // if( !language){
    //     // redirect to language selector
    //     // return <Redirect to={`/${slug}/language`} />
    //     // this.props.setOverlay({overlay: "language", slug})
    // }

    const secondTranslationNeeded = language !== restaurant.defaultlanguage;

    return (
      restaurant && restaurant.tags && translations
        ? (
          <div className="reglament-wrapper"> 
            <Container
              className="reglament"
              onScroll={({ target }) => {
                lastScrollTop = updateScroll(target, root, lastScrollTop);
              }}
            >
              {/* <TopBar 
                restaurant={restaurant} 
                showSearch={false} 
                showHamburger={false}
                showMenuButton={true}
                closeButtonLink={`/${restaurant.slug}`}
                restState={restState}
                />
             */}
              <h1 className="flex column">
                <span>{_t('reglament_1169')}</span>
                { secondTranslationNeeded 
                        && <span>{_t1('reglament_1169')}</span>
                }
              </h1>

              <div className="reglament-text">
                <p>{_t('reglament_text_1')}</p>
              </div>

              <div className="allergen-list flex column">
                {restaurant.tags.map(t => (
                  t.type === 'allergen' ? (
                    <div className="item flex row align-items-center">
                      <img src={`${MEDIA}/images/tags/${t.id}.png`} alt={t.title} title={t.title} />
                      <div className="flex column">
                        <span>{t.title}</span>
                        {
                          secondTranslationNeeded
                                && <span className="default-title">{t.default_title}</span>
                        }
                      </div>
                    </div>
                  )
                    : ''
                )) }
              </div>

              <div className="reglament-text">
                <p>{_t('reglament_text_2')}</p>
                <p>{_t('reglament_text_3')}</p>
              </div>
                
              <Social {...{ ...restaurant }} />
            </Container>
            
          </div>
        )
        : restaurant === false || restaurant.tags === false || translations === false ? <ErrorPage /> : <Spinner />
        
    );
  }
}
export default connect(Reglament);

// export default connect(
//     state => ({...state.app, translations: state.translation }),
//     dispatch => ({
//         lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
//         setOverlay: payload => dispatch( {type: A.SET_OVERLAY, payload })
//     })
// )(Reglament)

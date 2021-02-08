import React from 'react';
import { connect as cn } from 'react-redux';
import TranslService, { tr } from '../../services/translations';
import A from '../../redux/actionTypes';

/**
 * Default component incalpsulates translations.
 * It allows to set an array of translation ids in constructor, 
 * and then have the translations available through TR and TRD functions of _tr helper.
 */
class DefaultComponent extends React.Component {
    _translations = [

    ]

    _afterTranslation = null;

    state = {
      translationLoaded: null,
    }

    constructor(props) {
      super(props);

      this._tr = tr;
    }

    /**
     * Sets the words to be tranlsated and passes the optional callback to be called afterwards
     * @param {*} words 
     * @param {*} callback 
     */
    setTranslations(words, callback) { 
      this._translations = words; 
      // this._afterTranslation = callback || ( () => this.setState({translationLoaded:true} ) )
      this._afterTranslation = callback; 
    }

    componentDidMount() {
      console.debug('DefaultComponent.componentDidMount');
      this.fetchTranslations().then( 
        // call the callback, if any
        result => {
          this.setState({ translationLoaded: result });
                
          // console.debug("DefaultComponent.fetchTranslations callback:" , this._afterTranslation)
          // 
          if (this._afterTranslation) {
            console.debug('DefaultComponent.fetchTranslations callback is called');
            this._afterTranslation(); 
          }
        },
      );
    }
        
    componentDidUpdate(prevProps) {
      console.debug('DefaultComponent.componentDidUpdate', prevProps);
      if (prevProps.language !== this.props.language) {
        this.setState({ translationLoaded: false });
        this.fetchTranslations().then( 
          // call the callback, if any
          result => {
            this.setState({ translationLoaded: result });
                        
            // console.debug("DefaultComponent.fetchTranslations callback:" , this._afterTranslation)
            // 
            if (this._afterTranslation) {
              console.debug('DefaultComponent.fetchTranslations callback is called');
              this._afterTranslation(); 
            }
          },
        );
      }
    }

    async fetchTranslations() {
      console.debug('DefaultComponent.fetchTranslations is called', this._translations);
      const { language, restaurant } = this.props;

      const default_lang = restaurant ? restaurant.defaultlanguage : 'en';

      if (this._translations.length > 0) {
        console.debug(`DefaultComponent.fetchTranslations found ${this._translations.length} translations`);
        return await TranslService.getByKeys(
          this._translations,
          language, default_lang,
        );
      } 
      return false;
    }

    /**
     * # Translation
     * Translates the passed translation id into current language
     * @param {*} key 
     */
    TR = (key) => {
      const { translations, language } = this.props;
      return this._tr(key, language, translations);
    }

    /**
     * # Translation default
     * Translates the passed translation id into restaurant's default language
     * @param {*} key 
     */
    TRD = (key) => {
      const { translations, language, restaurant } = this.props;
      const { defaultlanguage } = restaurant ? restaurant.defaultlanguage : language;
      return this._tr(key, defaultlanguage, translations);
    }
}

/**
 * Redux connector.
 * ### Usage 
 * `
 * import DefaultComponent, {connect} from DefaultComponent;
 * class Ancestor extends DefaultComponent{...};
 * export default connect(Ancestor);`
 * - Or, if you need to pass other actions: 
 * `connect( SomeClass, { showModal: (dispatch, payload) => dispatch({type: "SHOWMODAL", payload }) })`
 * ### Params:
 * @param {*} C 
 * @param {object|null} otherActions - object holding named action dispatchers 
 * that receive  dispatch as first argument: 
 * `(dispatch, arg1, arg2, ...argn ) => { 
 * // payoad preparations here, if needed
 * // then return 
 *  return dispatch({type, payload})
 * }`
 * 
 */
export const connect = (C, otherActions = {}) => {
  const dispatchAction = (dispatch, actions) => Object.keys(actions).reduce(
    (res, key) => (
      // returning an object
      {
        ...res, 
        // hashed by original key from otherActions
        [key]: (...args) => 
        // result: action dispatcher that passes dispatch as first argument
        // and all passed arguments sends afterwards
          actions[key](dispatch, ...args),
                    
      }
    ), 
    // empty object to build on
    {},
  );

  return cn(
    state => ({ ...state.app, translations: state.translation }),
    dispatch => ({
      setFilter: (slug, value) => dispatch({ type: A.SET_FILTER, payload: { slug, type: 'category', value } }),
      setOverlay: payload => dispatch({ type: A.SET_OVERLAY, payload }),
      // call dispatch creator
      ...dispatchAction(dispatch, otherActions),
    }),
  )(C);
};

export default DefaultComponent;

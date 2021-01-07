import React from 'react';
import {connect as cn } from 'react-redux';
import TranslService, {tr} from '../../services/translations'
import A from '../../redux/actionTypes'

class DefaultComponent extends React.Component{


    _translations = [

    ]
    _afterTranslation = null;

    state = {
        translationLoaded: false
    }

    constructor(props){

        super(props);

        this._tr = tr;
    }

    /**
     * Sets the words to be tranlsated and passes the optional callback to be called afterwards
     * @param {*} words 
     * @param {*} callback 
     */
    setTranslations( words, callback ){ 
        this._translations = words; 
        this._afterTranslation = callback || ( () => this.setState({translationLoaded:true} ) )
    }


    componentDidMount(){
        console.debug("DefaultComponent.componentDidMount")
        this.fetchTranslations().then( 
            // call the callback, if any
            () => {

                this.setState({translationLoaded: true })
                
                console.debug("DefaultComponent.fetchTranslations callback:" , this._afterTranslation)
                // 
                if( this._afterTranslation ){
                    
                    console.debug("DefaultComponent.fetchTranslations callback is called")
                    this._afterTranslation() 
                }
            }
            )
        }
        
        componentDidUpdate( prevProps ){
            console.debug("DefaultComponent.componentDidUpdate", prevProps)
            if( prevProps.language !== this.props.language ){
                this.setState({translationLoaded: false })
                this.fetchTranslations().then( 
                    // call the callback, if any
                    () => {
        
                        this.setState({translationLoaded: true })
                        
                        console.debug("DefaultComponent.fetchTranslations callback:" , this._afterTranslation)
                        // 
                        if( this._afterTranslation ){
                            
                            console.debug("DefaultComponent.fetchTranslations callback is called")
                            this._afterTranslation() 
                        }
                    }
                )
        }
    }

    async fetchTranslations( ){
        console.debug("DefaultComponent.fetchTranslations is called", this._translations)
        const { language, restaurant } = this.props

        const default_lang = restaurant ? restaurant.defaultlanguage : "en"

        if( this._translations.length > 0 ){
            console.debug("DefaultComponent.fetchTranslations found translations")
            return await TranslService.getByKeys(
                this._translations,
                language, default_lang
            )
        } else {
            return false;
        }
    }


}

/**
 * Redux connector.
 * @usage 
 * import DefaultComponent, {connect} from DefaultComponent; 
 * class Ancestor extends DefaultComponent{...} 
 * export default connect(Ancestor)
 * @param {*} C 
 */
export const connect = (C, otherActions = {} ) => 
cn(
    state => ({ ...state.app, translations: state.translation }),
    dispatch => ({
        setFilter: (slug, value) => dispatch({ type: A.SET_FILTER, payload: { slug, type: "category", value } }),
        setOverlay: payload => dispatch( {type: A.SET_OVERLAY, payload }),
        ...otherActions
    })
)(C);

export default DefaultComponent;
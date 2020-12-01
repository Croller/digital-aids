import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import {RefreshOutlined} from '@material-ui/icons'
import "./error-loading.scss"
import {ChefHead} from  "../icons"
import Service, {_T} from '../../../../services/translations'
import {connect} from 'react-redux'
import {getRestaurant} from '../../../../redux/reducers'
import Spinner from '../Spinner'


const defaultErrorText = "Oops! It seems that something went wrong, but we are here to help you! Press the button to retry.";
const defaultButtonText = "Try again";
const {REACT_APP_MEDIA : MEDIA} = process.env 

class  ErrorPage extends React.Component {


    state = {
        translations: null,
        reloading: false
    }

    componentDidMount(){
        this.fetchData()
    
    }
    
    componentDidUpdate( prevProps ){
        if( prevProps.language !== this.props.language){
            this.fetchData()
        }    
    }
    
    async fetchData(){
        const translations = await Service.getByKeys(
            [
                "errorText"
            ]
        )

        this.setState({translations})
    }

    reloadPage(){
        this.setState({reloading: true})
        window.location.reload()
    }

    render(){

        const {language = "en", defaultlanguage = "en", slug, image, title } = this.props
        const restaurant = getRestaurant(this.props, slug)
        console.log( "Error restaurant:", restaurant )
        
        const {translations, reloading} = this.state
        
        const _t = translations ? _T(translations, language, restaurant.defaultlanguage ) : () => defaultErrorText
        // if( translations )    {
            return(
            <div className="error-page">
                <div className="panel flex column align-items-center justify-center m4 p3">
                    <div className="round-icon">
                        <ChefHead/>
                    </div>
                    {image && <img className="logo" alt={title} 
                                title={title} 
                                src={`${MEDIA}/images/restaurants/${slug}/${image}`} 
                                />}
                    <div className="error-text">{ _t("errorText", 1) }</div>
                    {/* <div className="error-text">{defaultErrorText}</div> */}
                    <div>
                        {reloading ? 
                        <Spinner />
                        :    
                        <Button onClick={() => this.reloadPage()}><RefreshOutlined/> { translations ? _t("tryAgain", 1) :  defaultButtonText}</Button>
                    }
                    </div>
                </div>
            </div>
            )
        
    }

}


export default connect(
    state => state, null
)( ErrorPage )
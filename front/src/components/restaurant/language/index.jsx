import React from 'react'
import Spinner from '../../template/common/Spinner';
import TopBar from '../topbar';
import {connect} from 'react-redux'
import Service from '../../../services/restaurants'
import A from '../../../redux/actionTypes'
import './language.scss'
import { Container } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {Button } from '@material-ui/core'


const LangItem = props => {
    const {nativeName, ...other} = props
    return (
        <Button className="lang-item" {...other}>
            {nativeName}
        </Button>
    )
}

class LanguageSelector extends React.Component{


    state ={
        restaurant: null,
        selected: false
    }

    componentDidMount(){
        this.fetchData()
    }
    
    componentDidUpdate( prevProps ){
        if( prevProps.language !== this.props.language 
            || this.props.match.slug !== prevProps.match.slug ){
            this.fetchData()
        }
    }

    async fetchData(){
        console.log("Fetching data")
        const {slug} = this.props.match.params
        const {language} = this.props
        const restaurant = await Service.getRestaurant( slug, language )
        this.setState({restaurant})
    }

    selectLanguage = language => {
        console.debug(" Selecting:", language)
        const {lang} = this.props
        lang(language)  
        this.setState({selected: true})      
    }

    render(){
        const {restaurant, selected } = this.state
        
        if( ! restaurant ) 
            return <Spinner />

        // can send back link via props, fallback to menu
        const back = this.props.location.state ? this.props.location.state.back  : `/${restaurant.slug}`;
        
        console.debug("Back:", back, this.props);

        if( selected ) 
            // if( this.props.history ){
            //     console.debug("history exists, going back")
            //     this.props.history.goBack()
            // }else
                return <Redirect to={ back }/>
        
        return(
            <div className="language-selector">
                <TopBar restaurant={restaurant} showSearch={false} showHamburger={false} />
                <Container>
                    <div className="panel lang-list">
                        {restaurant.languages.map( l => <LangItem {...l} onClick={() => this.selectLanguage(l.id) } /> )}
                    </div>
                </Container>
            </div>
        )
    }
}

export default connect(
    state => ({...state}),
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(LanguageSelector)
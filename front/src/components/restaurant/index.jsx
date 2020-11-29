import React from 'react'
import './menu.scss'
import A from '../../redux/actionTypes'
import {connect } from 'react-redux'
import Service from '../../services/restaurants'
import Footer from '../template/footer'
import { CircularProgress, Container, Grid, Select, MenuItem, Button, Paper, AppBar } from '@material-ui/core'
// import {
//     LocationOnOutlined as Location, 
//     FastfoodOutlined as Food,
//     PhoneInTalkOutlined as Phone,
//     AccessTimeOutlined as Time
// } from '@material-ui/icons'

import {Redirect} from 'react-router-dom'
import Menu from './menu'
import Topbar from './topbar'
import Spinner from '../template/common/Spinner'
import Lang from '../restaurant/language'
import Social from './social'
import ErrorPage from '../template/common/error-loading'


class RestaurantComponent extends React.Component{

    state ={
        restaurant: null
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


    render(){

        const {restaurant} = this.state
        
        const {language, lang} = this.props


        

        
        
        // if( !language ) return <Lang {...{restaurant}} />
        const {slug} = this.props.match.params
        
        
        if( !language){
            // redirect to language selector
            return <Redirect to={`/${slug}/language`} />
        }

        return(
            restaurant ? 
            <>
                <Topbar {...{restaurant, language, lang}} />
                <Container key={slug} className="flex-grow">
                    <Menu slug={slug} {...restaurant} />
                </Container>
                <Social {...restaurant} />
                <Footer {...restaurant} />
            </>
            : restaurant === null ? <Spinner/> : <ErrorPage /> // <h2>Error loading data</h2>
        )
    }
}


export default connect(
    state => state,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(RestaurantComponent)
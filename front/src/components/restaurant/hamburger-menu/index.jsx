import React from 'react'
import './style.scss'
import {Paper, Grid, Container, Button} from '@material-ui/core'
import {
    LocationOnOutlined as Location, 
    FastfoodOutlined as Food,
    PhoneInTalkOutlined as Phone,
    AccessTimeOutlined as Time
} from '@material-ui/icons'
import {Redirect} from 'react-router-dom'
import Service from '../../../services/restaurants'
import A from '../../../redux/actionTypes'
import {connect} from 'react-redux'
import Spinner from '../../template/common/Spinner'
import TopBar from '../topbar'

class HamburgerMenu extends React.Component{

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

        const {slug} = this.props.match.params
        
        
        if( !language){
            // redirect to language selector
            return <Redirect to={`/${slug}/language`} />
        }

        return(
            restaurant ? 
            <Container>
                <TopBar 
                restaurant={restaurant} 
                showSearch={false} 
                showHamburger={false}
                closeButtonLink={`/${restaurant.slug}`}
                />
                <Paper className="restaurant-details panel">
                    {restaurant.categories && restaurant.categories.map( c => {

                    return(
                    <Button >
                        <div className="title">{c.title}</div>
                        <div className="default-title">{c.titledefault}</div>
                    </Button>)
                    })}    
                </Paper>
                
            </Container>
            : restaurant === null ? <Spinner/> : <h2>Error loading data</h2>    
        
        )
    }
}

export default connect(
    state => state,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(HamburgerMenu)
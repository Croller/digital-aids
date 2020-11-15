import React from 'react'
import './menu.scss'
import A from '../../redux/actionTypes'
import {connect } from 'react-redux'
import Service from '../../services/restaurants'
import Footer from '../template/footer'
import { CircularProgress, Container, Grid, Select, MenuItem, Button, Paper, AppBar } from '@material-ui/core'
import {
    LocationOnOutlined as Location, 
    FastfoodOutlined as Food,
    PhoneInTalkOutlined as Phone,
    AccessTimeOutlined as Time
} from '@material-ui/icons'
import Menu from './menu'
import Topbar from './topbar'
import Spinner from '../template/common/Spinner'



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
        const {slug} = this.props.match.params

        return(
            restaurant ? 
            <>
                <Topbar {...{restaurant, language, lang}} />
                <Container key={slug}>
                    
                    <Paper className="restaurant-details panel">
                        <Grid container>
                            <Grid item xs={12} md={8} className="details-text">
                                <div>
                                    <Food/> {restaurant.cuisines.join(", ")}
                                </div>
                                <div>
                                    <Location/> {restaurant.address}
                                </div>
                                <div>
                                    <Time/> {restaurant.workinghours}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4} className="call-buttons">
                                <Button><Phone/> Reservation</Button>
                                <Button><Phone/> Delivery</Button>
                            </Grid>
                        </Grid>
                    </Paper> 
                    <Menu slug={slug} {...restaurant} />
                </Container>
                <Footer slug={slug} />
            </>
            : restaurant === null ? <Spinner/> : <h2>Error loading data</h2>
        )
    }
}


export default connect(
    state => state,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(RestaurantComponent)
import React from 'react'
import './style.scss'
import {Paper, Grid, Container, Button} from '@material-ui/core'
import {
    LocationOnOutlined as Location, 
    FastfoodOutlined as Food,
    PhoneInTalkOutlined as Phone,
    AccessTimeOutlined as Time
} from '@material-ui/icons'
import {PhoneCall, Chef} from '../../template/common/icons'
import ErrorPage from '../../template/common/error-loading'
import Social from '../social'
import {Redirect} from 'react-router-dom'
import Service from '../../../services/restaurants'
import A from '../../../redux/actionTypes'
import {connect} from 'react-redux'
import Spinner from '../../template/common/Spinner'
import TopBar from '../topbar'
import {Link as ALink} from 'react-dom'

class RestaurantDetails extends React.Component{

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
            <> 
            <Container className="flex column flex-grow">
                <TopBar 
                restaurant={restaurant} 
                showSearch={false} 
                showHamburger={false}
                showMenuButton={true}
                closeButtonLink={`/${restaurant.slug}`}
                />
               <Paper className="restaurant-details panel">
                    <Grid container>
                        <Grid item xs={12} className="details-text">
                            <div>
                                <Chef/> {restaurant.cuisines.join(", ")}
                            </div>
                            <div>
                                <Time/> {restaurant.workinghours}
                            </div>
                        </Grid>
                        {/* <Grid item xs={12} md={4} className="call-buttons">
                            <Button><Phone/> Reservation</Button>
                            <Button><Phone/> Delivery</Button>
                        </Grid> */}
                    </Grid>
                </Paper> 
                <div className="contact-buttons show-on-mobile">
                    {restaurant.phone && 
                    <Button 
                        className="contact-button" 
                        component={ALink} 
                        href={`tel:+${restaurant.phone}`}
                    ><PhoneCall/> Call us</Button> 
                    }
                </div>
                <Paper className="restaurant-details panel">
                    <div className="details-text">
                        <div className="restaurant-title">{restaurant.title}</div>
                        <div>
                            <Location/> {restaurant.address}
                        </div>
                    </div>
                    <div className="map"></div>
                </Paper>
            </Container>
            <Social {...{...restaurant}} />
            </>
            : restaurant === null ? <Spinner/> : <ErrorPage /> 
        
        )
    }
}

export default connect(
    state => state,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(RestaurantDetails)
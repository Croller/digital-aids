import React from 'react'
import './menu.scss'
import A from '../../redux/actionTypes'
import {connect } from 'react-redux'
import Service from '../../services/restaurants'
import { CircularProgress, Container } from '@material-ui/core'


class Menu extends React.Component{

    state ={
        restaurant: null
    }

    componentDidMount(){
        this.fetchData()
    }

    async fetchData(){
        console.log("Fetching data")
        const {slug} = this.props.match.params
        const restaurant = await Service.getRestaurant( slug  )
        this.setState({restaurant})
    }


    render(){

        const {restaurant} = this.state

        return(
            restaurant ? 
                <Container>
                    <h1>{restaurant.title}</h1>
                    <div>
                        Cuisine: {restaurant.cuisines.join(", ")}
                    </div>
                    <div>
                        Address: {restaurant.address}
                    </div>
                </Container>
            : restaurant === null ? <CircularProgress/> : <h2>Error loading data</h2>
        )
    }
}


export default connect(
    state => state,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(Menu)
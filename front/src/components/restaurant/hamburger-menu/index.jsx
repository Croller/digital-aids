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
import ErrorPage from '../../template/common/error-loading'
import TopBar from '../topbar'
import {Link} from 'react-router-dom'

const txt = {
    "reglament_1169": "Reglament (EU) №1169/2011",
}

const _t = key => txt[key] || key

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
        
        const {language, lang, setFilter } = this.props

        const {slug} = this.props.match.params
        
        
        if( !language){
            // redirect to language selector
            return <Redirect to={`/${slug}/language`} />
        }

        const selectCategory = cid => setFilter(slug, cid)

        return(
            restaurant ? 
            <Container>
                <TopBar 
                restaurant={restaurant} 
                showSearch={false} 
                showHamburger={false}
                showMenuButton={true}
                closeButtonLink={`/${restaurant.slug}`}
                />
                <div className="restaurant-details flex column">
                    {restaurant.categories && restaurant.categories.map( (c, ind) => {

                    return(
                    <Button className="cat-button panel flex column" key={`cat-btn-${ind}`} onClick={() => selectCategory(c.id)} >
                        <div className="title">{c.title}</div>
                        <div className="default-title">{c.titledefault}</div>
                    </Button>)
                    })}    
                    <div className="separator"></div>
                    <Button component={Link} to={`/${slug}/reglament-1169`} className="cat-button panel flex column" >
                        <div className="title">{_t("reglament_1169")}</div>
                        <div className="default-title">{_t("reglament_1169")}</div>
                    </Button>)
                </div>
                
            </Container>
            : restaurant === null ? <Spinner/> : <ErrorPage />
        
        )
    }
}

export default connect(
    state => state,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
        setFilter: (slug, value ) => dispatch( {type: A.SET_FILTER, payload: {slug , type: "category", value} } )
    })
)(HamburgerMenu)
import React from 'react'
import './style.scss'
import {Paper, Grid, Container, Button} from '@material-ui/core'
import {
    LocationOnOutlined as Location, 
    FastfoodOutlined as Food,
    PhoneInTalkOutlined as Phone,
    AccessTimeOutlined as Time,
    // WarningOutlined as Info
} from '@material-ui/icons'
import {Exclamation, World} from '../../template/common/icons'
import Redirect from '../../template/common/redirect'
import Service from '../../../services/restaurants'
import TranslService, {_T} from '../../../services/translations'
import A from '../../../redux/actionTypes'
import {connect} from 'react-redux'
import Spinner from '../../template/common/Spinner'
import ErrorPage from '../../template/common/error-loading'
import TopBar from '../topbar'
import {Link} from 'react-router-dom'

const txt = {
    "reglament_1169": "Reglament (EU) №1169/2011",
}

// const _t = key => txt[key] || key


class HamburgerMenu extends React.Component{

    state ={
        restaurant: null,
        selected: false,
        translations: null
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
        if( restaurant ){
            const translations = await TranslService.getByKeys(
                [
                    "Menu", "reglament_1169"
                ],
                language, restaurant.defaultlanguage
            )
            this.setState({restaurant, translations})
        } else {
            this.setState({restaurant})
        }
    }


    render(){

        const {restaurant, selected, translations } = this.state
        
        

        const {language, lang, setFilter } = this.props

        

        const {slug} = this.props.match.params
        
        if( selected ) 
            return <Redirect to={`/${slug}`} />
        
        if( !language){
            console.debug("No language. Location:", window.location.pathname);
            // redirect to language selector
            return <Redirect to={`/${slug}/language`} back={window.location.pathname} />
        }

        const selectCategory = cid => {
            setFilter(slug, cid)
            this.setState({selected: true})

        }

        if( restaurant ){
            const _t = _T(translations, language, restaurant.defaultlanguage )
            const langData = restaurant.languages.find( l => l.id === language )
            const langTitle = langData ? langData.nativeName : language

            console.debug("Translate", _t("Menu", 1))
            return(
                <Container className="hamburger-menu">
                    <TopBar 
                    restaurant={restaurant} 
                    showSearch={false} 
                    showHamburger={false}
                    showMenuButton={true}
                    closeButtonLink={`/${restaurant.slug}`}
                    />
                    <div className="flex column">
                        <div className="main-title">{_t("Menu", 1)}</div>
                        {restaurant.categories && restaurant.categories.map( (c, ind) => {
    
                        return(
                        <Button className="cat-button panel flex column py-1" key={`cat-btn-${ind}`} onClick={() => selectCategory(c.id)} >
                            <div className="title">{c.title}</div>
                            <div className="default-title">{c.titledefault}</div>
                        </Button>)
                        })}    
                        <div className="separator"></div>
                        <Button component={Link} to={`/${slug}/reglament-1169`} className="cat-button panel flex column py-1" >
                            <div className="flex row align-items-center flex-grow">
                                <Exclamation className="icon mr-1" />
                                <div>
                                    <div className="title">{_t("reglament_1169",1)}</div>
                                    <div className="default-title">{_t("reglament_1169")}</div>
                                </div>
                            </div>
                        </Button>
                        <Button className="cat-button panel flex column py-1 bg-light-gray-2" onClick={() => lang(null) }>
                            <div className="title flex row align-items-center"><World className="icon mr-1" />{langTitle}</div>                            
                        </Button>
                        <Button component={Link} to={`/${slug}/insider`} className="cat-button bg-green panel flex column py-1" >
                            <div className="title c-white">FOODFANS INSIDER</div>                            
                        </Button>
                    </div>
                    
                </Container>
            
            )
        } else {
            return restaurant === null ? <Spinner/> : <ErrorPage />
        }

        
    }
}

export default connect(
    state => state,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
        setFilter: (slug, value ) => dispatch( {type: A.SET_FILTER, payload: {slug , type: "category", value} } )
    })
)(HamburgerMenu)
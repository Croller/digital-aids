import React from 'react'
import './style.scss'
import {
    // Paper, Grid, 
    Container, Button} from '@material-ui/core'
// import {
//     LocationOnOutlined as Location, 
//     FastfoodOutlined as Food,
//     PhoneInTalkOutlined as Phone,
//     AccessTimeOutlined as Time,
//     // WarningOutlined as Info
// } from '@material-ui/icons'
import {Exclamation, World} from '../../template/common/icons'
import Redirect from '../../template/common/redirect'
import Service from '../../../services/restaurants'
import TranslService, {tr} from '../../../services/translations'
// import A from '../../../redux/actionTypes'
// import {connect} from 'react-redux'
import Spinner from '../../template/common/Spinner'
import ErrorPage from '../../template/common/error-loading'
import TopBar from '../topbar'
import {Link} from 'react-router-dom'
import DefaultComponent, {connect} from '../../DefaultComponent'

// const txt = {
//     "reglament_1169": "Reglament (EU) №1169/2011",
// }

// const _t = key => txt[key] || key


// class HamburgerMenu extends React.Component{
class HamburgerMenu extends DefaultComponent{

    state ={
        restaurant: null,
        selected: false,
        translations: null
    }

    // componentDidMount(){
       

        // this.fetchData()
    // }
    
    // componentDidUpdate( prevProps ){
    //     if( prevProps.language !== this.props.language 
    //         || this.props.computedMatch.slug !== prevProps.computedMatch.slug ){
    //         this.fetchData()
    //     }
    // }

    // async fetchData(){
        // console.log("Fetching data")
        // const {slug} = this.props.computedMatch.params
        // const {language} = this.props
        // const restaurant = await Service.getRestaurant( slug, language )
        // if( restaurant ){
        //     const translations = await TranslService.getByKeys(
        //         [
        //             "Menu", "reglament_1169", "Reservation"
        //         ],
        //         language, restaurant.defaultlanguage
        //     )
        //     this.setState({restaurant, translations})
        // } else {
        //     this.setState({restaurant})
        // }
    // }

    updateOverlay = overlay => this.props.setOverlay({overlay, slug: this.props.slug})

    render(){

        // const {restaurant, selected, translations } = this.state
        const {selected } = this.state
        const {slug, restaurant, translations, restState, language } = this.props
        
        

        // const {language, setCategory } = this.props

        

        // const {slug} = this.props.computedMatch.params
        
        if( selected ) 
            return <Redirect to={`/${slug}`} />
        
        if( !language){
            console.debug("No language. Location:", window.location.pathname);
            // redirect to language selector
            // return <Redirect to={`/${slug}/language`} back={window.location.pathname} />
            // this.props.setOverlay({overlay: "language", slug})
        }

        // const selectCategory = cid => {
        //     setCategory(slug, cid)
        //     this.setState({selected: true})

        // }

        const secondTranslationNeeded = language !== restaurant.defaultlanguage;

        if( restaurant ){
            const _t = key => tr(key, language, translations )
            const langData = restaurant.languages.find( l => l.id === language )
            const langTitle = langData ? langData.nativeName : language

            console.debug("Options: restaurant ", restaurant );
            
            return(
                <Container className="hamburger-menu">
                    <TopBar 
                    restaurant={restaurant} 
                    showSearch={false} 
                    showHamburger={false}
                    showMenuButton={true}
                    closeButtonLink={`/${restaurant.slug}`}
                    restState={restState}
                    />
                    <div className="flex column">
                        <h1 className="main-title">{_t("Menu")}</h1>
                        { 
                        restaurant.menus.map.length > 1 &&  
                        restaurant.menus.map( 
                            (menu, menuIndex) => 
                                <Button className="cat-button panel flex column py-1" 
                                component={Link} 
                                to={`/${slug}/${menuIndex + 1}`}
                                onClick={()=> this.updateOverlay(null)} // close overlay
                                >{`${menu.title}`}</Button>
                        )   
                        }
                        {restaurant.menus.map( (menu, menuIndex) => {
                            return <>
                            {/* <h2>{menu.title}</h2> */}
                            {menu.categories && menu.categories.map( (c, ind) => {
        
                            return(
                            <Button className="cat-button panel flex column py-1" 
                            key={`cat-btn-${ind}`} 
                            component={Link}
                            to={`/${slug}/${menuIndex + 1}/${c.id}` }
                            onClick={()=> this.updateOverlay(null)} // close overlay
                            >
                                <div className="title">{c.title}</div>
                                { secondTranslationNeeded && <div className="default-title">{c.titledefault}</div>}
                            </Button>)
                            })}    
                            </>
                        })}
                        <div className="separator"></div>
                        <Button component={Link} 
                        to={`/${slug}/reglament-1169`} 
                        className="cat-button panel flex column py-1"
                        onClick={()=> this.updateOverlay(null)} // close overlay
                         >
                            <div className="flex row align-items-center flex-grow">
                                <Exclamation className="icon mr-1" />
                                <div className="reglament-button">
                                    <div className="title">{_t("reglament_1169",1)}</div>
                                    { secondTranslationNeeded && <div className="default-title">{
                                    this._tr("reglament_1169", restaurant.defaultlanguage, translations )}</div>}
                                </div>
                            </div>
                        </Button>
                        {/* <Button className="cat-button panel flex column py-1 bg-light-gray-2" onClick={() => lang(null) }> */}
                        <Button 
                        className="cat-button big first panel flex column py-1 bg-light-gray-2" 
                        // component={Link} 
                        // to={`/${slug}/language`} 
                        onClick={()=> this.updateOverlay("language")}
                        >
                            <div className="title flex row align-items-center"><World className="icon mr-1" />{langTitle}</div>                            
                        </Button>
                        <Button 
                        className="cat-button big panel flex column py-1 bg-light-gray-2" 
                        component={Link} 
                        to={`/${slug}/details`}
                        onClick={()=> this.updateOverlay(null)} // close overlay
                        >
                            <div className="title flex row align-items-center">{_t("Reservation")}</div>                            
                        </Button>
                        <Button 
                        component={Link} 
                        to={`/${slug}/insider`} 
                        className="cat-button big bg-green panel flex column py-1" 
                        onClick={()=> this.updateOverlay(null)} // close overlay
                        >
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

// export default connect(
//     state => ({...state.app, translations: state.translation }),
//     dispatch => ({
//         lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
//         setCategory: (slug, value ) => dispatch( {type: A.SET_FILTER, payload: {slug , type: "category", value} } ),
//         setMenu: (slug, value ) => dispatch( {type: A.SET_FILTER, payload: {slug , type: "menu", value} } ),
//         setOverlay: payload => dispatch( {type: A.SET_OVERLAY, payload })
//     })
// )(HamburgerMenu)

export default connect(HamburgerMenu)
import React from 'react'
import {Redirect} from 'react-router-dom';
import DefaultComponent, {connect} from '../../DefaultComponent';
import ErrorLoading from '../../template/common/error-loading'
import Spinner from '../../template/common/Spinner';
import MenuBody from './MenuBodyStatic';
import "./menu.scss";


class Menu extends DefaultComponent{

    state = {
        ...super.state,
        menu: null
    }

    constructor(props){
        super(props);

        this.setTranslations([
            "Allergens", 
            "YourOpinionIs", 
            "PriceFor",
            "reglament_text_2",
            "ThankYou"
        ], () => this.setState({translationLoaded: true})
        )
    }

    componentDidMount(){
        super.componentDidMount();

        this.selectMenu( this.props.menu )
    }

    componentDidUpdate( prevProps ){
        super.componentDidUpdate( prevProps );

        // if( prevProps.language !== this.props.language ){
        //     this.setState({translationLoaded: false });
        //     super.fetchTranslations();
        // }

        if( prevProps.menu !== this.props.menu  || prevProps.restaurant !== this.props.restaurant ){
            this.selectMenu(this.props.menu);
        }
    }

    selectMenu( menu_id = 1 ){
        menu_id = parseInt(menu_id)
        console.debug("selectMenu: finding", menu_id, "in", this.props.restaurant)


        const menu = this.props.restaurant ? this.props.restaurant.menus.find( m => m.menuid === menu_id ) : false;

        this.setState({menu})
    }

    render(){

        const {
            menu: menu_id, 
            category: category_id,
            slug ,
            restState, 
            language, 
            restaurant,
            translations
        } = this.props
        
        const {menu, translationLoaded} = this.state
        let {category} = this.props

        

        
        console.debug("Menu index: menu:", menu, "translationLoaded:", translationLoaded)
        if( !translationLoaded )
            return <Spinner />

        if( !menu ){
            return menu === false ? <ErrorLoading /> : <Spinner />
        }

        console.debug("Menu: id and catid:", menu_id, category_id)
        if( !menu_id || !category_id  ){
            
            const tmpMenu = menu || restaurant.menus ? restaurant.menus[0] : false;
            if( !tmpMenu ){
                return <ErrorLoading />
            }
            <Redirect to={`/${slug}/${tmpMenu.menuid}/${tmpMenu.categories[0].id}`} />
        }

        if( !category ){
            // select category
            category = menu.categories[0].id;
        }

        const socialMessage = this._tr( "ThankYou", language, translations )

        return (
            <MenuBody  {...{menu, language, restState, restaurant, category, socialMessage}} />
        )
    }
}


export default connect(Menu);
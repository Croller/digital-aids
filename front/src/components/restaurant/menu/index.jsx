import React from 'react'
import {Grid, Button, Typography, Paper} from '@material-ui/core'
import './menu.scss'
import Item from './item'
import {connect} from 'react-redux'
import A from '../../../redux/actionTypes'
import {getRestaurant} from '../../../redux/reducers'

class RestaurantMenu extends React.Component{


    state = {
        categoryid: null,
        restState: null
    }

    componentDidMount(){
        this.getRestaurantState()
    }

    componentDidUpdate( prevProps ){
        console.debug("Updated!");
        const prev = getRestaurant(prevProps, this.props.slug);
        const now = getRestaurant(this.props, this.props.slug );
        
        console.debug("prev and now:", prev, now);

        /// THIS IS AWFUL (((((
        if( prev.filters.caterory !== now.filters.caterory ){
            this.getRestaurantState()
        }
        // )
    }

    getRestaurantState(){
        const {slug} = this.props 
        const restState = getRestaurant( this.props, slug )
        this.setState({restState})
    }

    toggleCategory = id => {
        const {slug} = this.props 
        const restState = getRestaurant( this.props, slug )

        const {category} = restState.filters 

        console.debug("toggling category", id )

        if( category === id )
            // this.setState({categoryid: null})
            this.props.setFilter( slug, null ) 
        else
            this.props.setFilter( slug, id )
            // this.setState({categoryid: id})
    }

    render(){
        const { slug, categories, menu, show_categories = true
            // , cart 
        } = this.props

        // const {categoryid: selectedCategory} = this.state 
        
        const {restState} = this.state // getRestaurant( this.props, slug )
        let { category: selectedCategory, search } = restState ?  restState.filters : {}
        search = search ? search.toLowerCase() : search
        
        
        console.debug("Render selectedCategory" ,selectedCategory)

        const filteredCategories = selectedCategory ? categories.filter( c => c.id === selectedCategory ) : categories

        return(
            categories ? 
            <>
            {   
                show_categories && 
                <div className="categories">
                {  categories.map ( (cat, ind) => (
                                <Button 
                                key={`cat-button-${ind}`} 
                                className={`category-button${ (cat.id === selectedCategory) ? " selected" : ""}`}
                                onClick = { () => this.toggleCategory(cat.id) }
                                >
                                    {
                                        cat.titledefault && 
                                    <div className="default-lang">
                                        {cat.titledefault}
                                    </div>
                                    }
                                    <div>
                                        {cat.title}
                                    </div>
                                </Button>
                                ))}
                </div>
            }
            <Grid container spacing={4}>
                {filteredCategories.map ( (cat, ind) => (
                    <Grid item xs={12} key={`cat-body-${ind}`} >
                        <h3 className="fw-600">{cat.title}</h3>
                        <Paper className="category-body panel" >
                            <Grid container spacing={0}>
                                {menu.filter(d=> d.dishcategoryid === cat.id && 
                                    (   
                                        // etiher search is empty
                                        !search
                                        // or 
                                        ||
                                        // title or default title include search term  
                                        ( 
                                            d.dishtitle.toLowerCase().includes(search) || 
                                            d.dishtitledefault.toLowerCase().includes(search)
                                        ) 
                                    )
                                ).map(
                                    (dish, index) => {
                                        // let cartItem = cart.find( i => i.dishid === dish.dishid )
                                        // cartItem = {...cartItem} //copy...
                                        // const quantity = cartItem ? cartItem.quantity : null;

                                        return(
                                            <Grid item xs={12}  key={`menuitem-${index}`} >
                                                <Item                                                
                                                index={index + 1} 
                                                // cartItem={cartItem}
                                                // quantity={quantity} 
                                                slug={slug}
                                                {...dish} 
                                                />
                                            </Grid>
                                        )
                                    }
                                ) }
                            </Grid>
                        </Paper>
                    </Grid>
                    ))
                }
            </Grid>
            </> : <Typography>No data obtained</Typography>
        )
    }
}

export default connect(
    state => ({...state}),
    dispatch => ({
        setFilter: (slug, value ) => dispatch( {type: A.SET_FILTER, payload: {slug , type: "category", value} } )
    })
)(RestaurantMenu)
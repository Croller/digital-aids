import React from 'react'
import {Grid, Button, Typography, Paper} from '@material-ui/core'
import './menu.scss'
import Item from './item'
import {connect} from 'react-redux'
import cart from '../../cart'

class RestaurantMenu extends React.Component{


    state = {
        categoryid: null
    }

    toggleCategory = id => {
        console.debug("toggling category", id )
        if( this.state.categoryid === id )
            this.setState({categoryid: null})
        else
            this.setState({categoryid: id})
    }

    render(){
        const { slug, categories, menu, show_categories = true
            // , cart 
        } = this.props

        const {categoryid: selectedCategory} = this.state 
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
                                {menu.filter(d=>d.dishcategoryid === cat.id).map(
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
    // state => ({restaurants: state.restaurants})
)(RestaurantMenu)
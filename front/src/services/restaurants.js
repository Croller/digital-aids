import Base from './baseClientService'
import rests from '../data/restaurants.json'
import cuisines_list from '../data/cuisines.json'
import dishes from '../data/dishes.json'
import categories from '../data/categories.json'

class RestaurantsService extends Base {

    static async getRestaurant( slug, lang ){
        let rest = rests.find( r => r.slug === slug )
        
        rest = {...rest} ///copy it...
        if( rest ){
            console.log( "Rest:", rest)
            // populate cuisines list
            const {cuisines } = rest
            console.log( "cuisines:", cuisines)

            rest.cuisines = cuisines.split(",").map ( 
                c => {

                    const cuisine = cuisines_list.find( c1=> c1.cuisineid === c )
                    return cuisine[lang] || cuisine["en"]
                }) 
            
            const menu = await this.getRestorauntMenu( rest.id, lang )
            rest = {...rest, menu }
        } 
        console.log("Rest:" , rest)
        return rest
    }

    static async getRestorauntMenu( id, lang ){
        let result = dishes.filter( d => d.dishrestaurtantid === id )
        .map( dish => { 
            const {
            dishid,
            dishprice,
            dishcategoryid
            } = dish
            return { dishid,
                dishprice,
                dishcategoryid,
                dishtitle: dish[`dishtitle${lang}`] || dish["dishtitleen"]
                }
            }
        )

        

        return result;
    }
    
}
Base.extend( RestaurantsService )


export default RestaurantsService
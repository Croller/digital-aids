import Base from './baseClientService'
import rests from '../data/restaurants.json'
import cuisines_list from '../data/cuisines.json'
import dishes from '../data/dishes.json'
import categories_list from '../data/categories.json'


class RestaurantsService extends Base {

    static async getRestaurant( slug, lang = "en" ){
        
        try{
            const rest = await this.GET(`/restaurants/${slug}/${lang}`, {}, "cache" )
            return rest
        }catch(e){
            if( e.response && e.response.data )
                this.Error(e.response.data)  
            else
                this.Error(e.message)
        }
        
        // let rest = rests.find( r => r.slug === slug )
        
        // rest = {...rest} ///copy it...
        // if( rest ){
        //     console.log( "Rest:", rest)
        //     // populate cuisines list
        //     const {cuisines } = rest
        //     console.log( "cuisines:", cuisines)

        //     rest.cuisines = cuisines.split(",").map ( 
        //         c => {

        //             const cuisine = cuisines_list.find( c1=> c1.cuisineid === c )
        //             return cuisine[lang] || cuisine["en"]
        //         }) 
            
        //     const menu = await this.getRestorauntMenu( rest.id, lang )

        //     /// gather the categories
        //     const uniqueCategories = menu.reduce( (cats, item) => {
        //         if( !cats.includes(item.dishcategoryid) )
        //             return [...cats, item.dishcategoryid ]
        //         else
        //             return cats
        //     }, [])

        //     const categories = uniqueCategories.map( 
        //         c => {
        //             const foundCat = categories_list.find( cc => cc.categoryid === c)
        //             let title
        //             if( foundCat ){
        //                 title = foundCat[`categorytitle${lang}`] || foundCat[`categorytitleen`]
        //             } else {
        //                 console.error("Category not found: ", c, ", using ID as title")
        //                 title = c
        //             }

        //             return {
        //                 id: c, 
        //                 title
        //             }
        //         }
        //         )

        //     rest = {...rest, menu, categories }
        // } 
        // console.log("Rest:" , rest)
        // return rest
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
const baseService = require("./baseService")
const _f = require("fetsch")

const defautlFields = "r.*"

qRestaurants = 
"SELECT %fields% FROM restaurants r \
%join% \
WHERE %where% \
%groupby% \
%limit%";

class RestService extends baseService{

    

    /**
     * Get single restaurant by slug
     * @param {*} slug 
     */
    static async get( slug ){
        const restid = `restaurant_${slug}`

        if( !this.cacheExists(restid)){

            try{
                const q = _f.strFormat(
                    qRestaurants, 
                    {
                        "%fields%" :  defaultFields,
                        "%where%": "active='1' AND deleted='0' AND r.slug=?",
                        "%limit%": "LIMIT 1",
                        "%groupby%": "GROUP BY u.id"
                    }
                )
    
                // console.debug(q)
                const [restaurants] = await this.DB.query(
                    q,
                    [slug]
                )
    
                if( Array.isArray(restaurants) && restaurants.length > 0){
                    // array is received, fetch first element and cache it
                    this.cache(restid, restaurants[0] )
                    // return cached
                    return this.getCached(restid) 

                } else {
                    // no array or empty array is received
                    this.Error("Restaurant not found")
                    return false
                }
            } catch(e){
                console.error("Error fetching single restaurant: ", e.message )
                this.Error("Database error")
                return false;
            }
        } else {
            return this.getCached(restid)
        }
    }

    
}

baseService.extend(RestService)


module.exports = RestService
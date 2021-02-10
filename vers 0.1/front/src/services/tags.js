import Base from './baseClientService'


class TagsService extends Base {

    static async getAll( slug, lang = "en", default_lang = "en" ){
        
        try{
            const rest = await this.GET(`/tags/all/${slug}/${lang}/${default_lang}`, {}, "cache" )
            return rest
        }catch(e){
            if( e.response && e.response.data )
                this.Error(e.response.data)  
            else
                this.Error(e.message)
        }
    }
    
}
Base.extend( TagsService )


export default TagsService
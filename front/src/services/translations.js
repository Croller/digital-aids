import Base from './baseClientService'


class TranslationsService extends Base {

    static async getByKeys( keys, lang = "en", default_lang = "en" ){
        
        try{
            const rest = await this.GET(`/translations/${lang}/${default_lang}`, 
            {
               params: {keys}
            }, 
            "cache" )
            return rest
        }catch(e){
            if( e.response && e.response.data )
                this.Error(e.response.data)  
            else
                this.Error(e.message)
        }
    }
    
}
Base.extend( TranslationsService )

export default TranslationsService


export const _T = (translations, language, def_language ) =>
            // returns a function that will transate based on given key and index
            (key, ind ) => 
            // if ind = 1 returns translation in current language
            ind === 1 ? translate(key, translations)[language] : 
            // otherwise returns translation in restaurant's default language
            translate(key, translations)[def_language] || translate(key, translations)[language]

const translate = (key, translations) => translations[key] ? translations[key] : key
// export const _T = (key, translations) => translations[key] ? translations[key] : key
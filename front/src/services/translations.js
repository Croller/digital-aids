/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-underscore-dangle */
import Base from './baseClientService';
import store from '../redux/store';
import { has, tkey } from '../utils/functions';

class TranslationsService extends Base {
  /**
     * Fetches the keys that still lack in redux state
     * @param {*} keys 
     * @param {*} language 
     */
  static keysThatLack(keys, language) {
    const { translation = {} } = store.getState(); 
    let isnt = [];
    console.log('keysThatLack: translation', translation, 'keys:', keys);
    isnt = keys.filter(key => {
      const _tk = tkey(key, language);
      return !has(translation, _tk);
    });
    // isnt = keys.reduce( (res, key) => {
    //     const _tk = tkey(key, language);
    //     console.debug("keysThatLack: tk:", _tk, key, language)
    //     if( !has(translation, _tk )){
    //         console.debug("keysThatLack: not present!", _tk)

    //         return [...res, key ];
    //     } else {
    //         console.debug("keysThatLack: present", _tk)
    //         return res;
    //     }
    // }, []  )

    console.log('keysThatLack: translation return', isnt);
    return isnt;
  }

  static async getByKeys(keys, lang = 'en', default_lang = 'en') {
    // gather keys that lack
    let keysLack = this.keysThatLack(keys, lang);
    if (lang !== default_lang) {
      keysLack = [...keysLack, ...this.keysThatLack(keys, default_lang)];
    }

    // remove duplicates
    keysLack = [...new Set(keysLack)];

    if (keysLack.length > 0) {
      console.debug('translation sending request', keysLack);
      try {
        const rest = await this.GET(`/translations/${lang}/${default_lang}`, 
          {
            params: { keys: keysLack },
            //    params: {keys}
          });

        // merge in fetched translations
        // mergeTranslations(translations, rest)
        // update redux state 
        store.dispatch({ type: 'ADD_TRANSLATION', payload: rest });

        return true;
        // return rest
      } catch (e) {
        if (e.response && e.response.data) this.Error(e.response.data);  
        else this.Error(e.message);
        return false;
      }
    } else {
      this.Error('All translations are present');
      return true;
    }
  }
}
Base.extend(TranslationsService);

export default TranslationsService;

let translations = {};

/**
 * One-level-deep merge for specific structure ( {key:object...})
 * @param {*} target 
 * @param {*} source 
 */
const mergeTranslations = (target, source) => {
  let result = { ...target };

  if (typeof target === 'object' && typeof source === 'object') {
    result = Object.keys(source).reduce((res, key) => (res.hasOwnProperty(key)             
    // if there is such translation already...
    // every field in translations is an object, so it's pretty much safe to do this:
            
      // merge values in it.
      ? { ...res, [key]: Object.assign(res[key], source[key]) } 

      // if there's no translation - add it
      : { ...res, [key]: source[key] }), 

    { ...result });
  } 
  // if( typeof target === "object" && typeof source === "object" ){
  //     Object.keys(source).map( key => {
  //         // every field in translations is an object, so it's pretty much safe to do this:
  //         result[key] = 
  //         // if there is such translation already...
  //         result.hasOwnProperty(key) ? 
  //         // merge values in it.
  //         Object.assign( result[key], source[key] ) 
  //         // if there's no translation - add it
  //         : source[key]
  //     })
      
  // } 
  return result;
};

export const addTranslations = (new_translations) => {
  translations = mergeTranslations(translations, new_translations);
};

const translate = (key) => (translations[key] ? translations[key] : {});


export const _T = (new_translations, language, def_language) => {
  console.debug('new translations:', new_translations);
  // mix in the new translations
  translations = mergeTranslations(translations, new_translations);
  console.debug('Updated translations to', translations);

  // returns a function that will transate based on given key and index
  return (key, ind) => 
    // if ind = 1 returns translation in current language
    (ind === 1 ? translate(key, translations)[language] 
    // ...or if not found - in english
    || translate(key, translations).en 
    // ...otherwise just returns the key
    || key 

    // if ind !=1,  returns translation in restaurant's default language
      : translate(key, translations)[def_language] 
    // ...or if not found - in english
    || translate(key, translations).en 
    // ...otherwise just returns the key
    || key);
};


export const transl = (key, language, default_lang = 'en') => translate(key)[language] 
        // returns translation in current language if found
        // ...or if not found - in default language
        || translate(key)[default_lang] 
        // ...or if not - in english
        || translate(key).en 
        // ...if not found anything - just return the key
        || key; 

/**
 *  Uses redux state translations to return translation for given key and given language
 * @param {*} key 
 * @param {*} lang 
 */
export const tr = (key, lang, _translations, defaultValue) => _translations[tkey(key, lang)] 
    // return tranlation for given language,
    // or for english
    || _translations[tkey(key, 'en')] 
    // ...or default value, or just the key
    || defaultValue || key;

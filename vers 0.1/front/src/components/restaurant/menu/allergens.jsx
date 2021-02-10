import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

const {REACT_APP_MEDIA : MEDIA} = process.env 

const Allergens = props => {

    const {
        open, // open flag
        tags, // the actual alergen items (aray of ids)
        _t, // translation tool of function(key):string
        onClose = console.debug, // onClose handler (should change the showDialog value outside)
        tags_list, // the list of tags data, [ {id, title, default_title, type}, ...]
        dishid, // int, id of the dish
        needSecondTranslation = true
    } = props
    return (

        <Dialog 
        open={open} 
        className="allergens-dialog" 
        fullWidth
        maxWidth="xs"
        onClose={ onClose }
        >
            {
                open &&
                <>
                    <DialogTitle>
                        {_t("Allergens")}
                        <Close 
                        className="close-allergens-button"
                        onClick={onClose}
                        />
                    </DialogTitle>
                    <DialogContent>
                            {Array.isArray(tags) && <ul className="allergens">
                                {tags.map( t => {

                                    const tag = tags_list ? tags_list.find( i => i.id === t ) : null;
                                    return (<li key={`${dishid}-tag-${t}`}>
                                        <img key={`tag-${dishid}-${t}`} src={`${MEDIA}/images/tags/${t}.png`} alt={ tags_list && tags_list[t] ? tags_list[t].title : t } />
                                        <div>
                                            {tag && tag.title ? <span>{tag.title}</span> : <span>{t}</span>}
                                            {/* {tag && tag.default_title !== tag.title  ?   */}
                                            {tag && needSecondTranslation  ?  
                                            <span>{tag.default_title}</span>
                                            : "" }
                                        </div>
                                    </li>)
                                }
                                )}
                            </ul>}
                            <p>{_t("reglament_text_2")}</p>
                            <p>{_t("reglament_text_3")}</p>
                    </DialogContent>
                </>
            }
        </Dialog>
    )
}

export default Allergens
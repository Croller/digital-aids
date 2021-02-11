import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react'
import './style.scss'

const MEDIA = process.env.REACT_APP_MEDIA



class Oferta extends React.Component{


    render(){
        const {
            slug,
            image,
            header,
            text1,
            text2,
            link,
            conditions,
            call_to_action,
            onClose
        } = this.props

        console.debug("oferta props:", this.props)

        const imageRoot = `${MEDIA}/images/restaurants/${slug}/ofertas/`;

        return(
            <div className="oferta">
                <div className="image-holder"
                style={{backgroundImage: `url(${imageRoot}${image})`}}
                >
                    <div className="close-button">
                        <Close onClick={onClose} />
                    </div>
                </div>
                <div className="content">        
                    {header && <div className="title">{header}</div>}
                    {text1 && <div className="text">{text1}</div>}
                    {/* {text2 && <div className="text">{text2}</div>} */}
                    {conditions && <div className="conditions">{conditions}</div>}
                    {call_to_action && !link && <Button className="call-to-action" onClick={onClose}>{call_to_action}</Button>}
                    {
                    // if call to action AND link are set, render an outside link 
                    call_to_action && link && <a className="call-to-action" 
                    onClick={onClose} href={link} 
                    rel="no-referrer"
                    target="_blank"><span>{call_to_action}</span></a>}
                </div>

            </div>
        )
    }
}

export default Oferta
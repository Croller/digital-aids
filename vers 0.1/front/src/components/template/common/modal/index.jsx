import React from 'react'
import { Modal, Paper, Box, Button, Typography } from '@material-ui/core'
import {Link } from 'react-router-dom'
import {Close} from '@material-ui/icons'
import "./modal.scss"
import Reveal from '../reveal'
import {Fade} from '@material-ui/core'


class CustomModalComponent extends React.Component{

    render(){
        
        const {open = true, elevation = 4, closeLink, onClose, duration=500 } = this.props

        return( 
            <Reveal>
                <Modal open={open} className="modal-overlay" onEscapeKeyDown={onClose} onBackdropClick={onClose}>
                    <Fade duration={duration} in={open} className="modal-reveal">
                    <Box display="flex" className="modal">
                        {closeLink ? 
                        <Button className="close-modal" component={Link} to={closeLink} variant="text"><Close/></Button> :
                        <Button className="close-modal" onClick={ 
                            () =>  {
                                if( typeof onClose === "function" )
                                    onClose()
                                else 
                                    console.log("onClose not set")
                            }}><Close/></Button>
                    }
                        <Paper elevation={elevation} className="panel">                             
                            { 
                            // the isValidElement check is needed because this code gave strange error on loading the site
                            // probably when modalContents value in localStorage got corrupted.
                            React.isValidElement (this.props.children) ? this.props.children : "" }
                        </Paper>
                    </Box>
                    </Fade>                
                </Modal>
            </Reveal>
        )
    }
}


export default CustomModalComponent;
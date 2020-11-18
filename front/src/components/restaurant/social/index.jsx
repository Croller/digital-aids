import React from 'react'
import './style.scss'
import {
    ThumbsUp,
    FacebookIcon,
    InstagramIcon,
    TripadvisorIcon,
    TheForkIcon } from '../../template/common/icons'
import { Container } from '@material-ui/core'
const txt = {
    "thank-you": "Thanks for your order!",
    "yopinion": "Your opinion is very important for us, please, let us know it!"
}
class Social extends React.Component{

    render(){
        const { facebook, instagram, tripadvisor, thefork } = this.props
        return(
            <div className="panel social-container">
                <Container className="social-footer">
                    <ThumbsUp className="thumbs-up" />
                    <div className="thank-you">
                        {txt["thank-you"]}
                    </div>
                    <div className="opinion">
                        {txt["yopinion"]}
                    </div>
                    <div className="icons">
                        {
                            instagram &&
                            <a href={instagram} target="_blank">
                                <InstagramIcon/>
                            </a>
                        }
                        {
                            facebook &&
                            <a href={facebook} target="_blank">
                                 <FacebookIcon/>
                            </a>
                        }
                        {
                            tripadvisor &&
                            <a href={tripadvisor} target="_blank">
                                <TripadvisorIcon/>
                            </a>
                        }
                        {
                            thefork &&
                            <a href={thefork} target="_blank">
                                <TheForkIcon/>
                            </a>
                        }
                       
                        
                        
                    </div>
                </Container>
            </div>
        )
    }
}

export default Social
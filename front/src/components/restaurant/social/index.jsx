import React from 'react'
import './style.scss'
import {
    ThumbsUp,
    FacebookIcon,
    InstagramIcon,
    TripadvisorIcon,
    TheForkIcon } from '../../template/common/icons'
import { Container } from '@material-ui/core'
import { _T } from '../../../services/translations'
import Spinner from '../../template/common/Spinner'
import Service from '../../../services/translations'
import {connect} from 'react-redux'

const txt = {
    "thank-you": "Thanks for your order!",
    "yopinion": "Your opinion is very important for us, please, let us know it!"
}
class Social extends React.Component{

    state = {
        translations: null
    }

    componentDidMount(){
        this.fetchData()
    
    }
    
    componentDidUpdate( prevProps ){
        if( prevProps.language !== this.props.language){
            this.fetchData()
        }    
    }
    
    async fetchData(){
        const translations = await Service.getByKeys(
            [
                "YourOpinionIs"
            ]
        )

        this.setState({translations})
    }
    
    render(){
        const { facebook, instagram, tripadvisor, thefork,
            language, defaultlanguage,
            message
         } = this.props

         console.debug("Social props:", this.props)

        const {translations } = this.state 

        if( !translations )
         return <Spinner />

        const _t = _T( translations , language, defaultlanguage);

        return(
            <div className="panel social-container">
                <Container className="social-footer">
                    <ThumbsUp className="thumbs-up" />
                    {message && 
                        <div className="thank-you">
                            {message}
                        </div>
                    }
                    <div className="opinion">
                        { _t("YourOpinionIs", 1) }
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

export default connect(
    state => ({ language: state.language })
)(Social)
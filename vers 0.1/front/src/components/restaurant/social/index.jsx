import React from 'react'
import './style.scss'
import {
    ThumbsUp,
    FacebookIcon,
    InstagramIcon,
    TripadvisorIcon,
    TheForkIcon } from '../../template/common/icons'
import { Container } from '@material-ui/core'
// import { 
//     // _T, 
//     tr } from '../../../services/translations'
import Spinner from '../../template/common/Spinner'
import Service from '../../../services/translations'
// import {connect} from 'react-redux'
import DefaultComponent, {connect} from '../../DefaultComponent'


const txt = {
    "thank-you": "Thanks for your order!",
    "yopinion": "Your opinion is very important for us, please, let us know it!"
}
class Social extends DefaultComponent {

    state ={
        translationsReady: false
    }

    constructor(props){
        super(props)

        this.setTranslations([
            "YourOpinionIs"
            // () => this.setState({translationsReady: true})
        ])
    }

    // componentDidMount(){
    //     this.fetchData()
    
    // }
    
    // componentDidUpdate( prevProps ){
    //     if( prevProps.language !== this.props.language){
    //         this.fetchData()
    //     }    
    // }
    
    // async fetchData(){
    //     // const translations = await Service.getByKeys(
    //     Service.getByKeys(
    //         [
    //             "YourOpinionIs",
    //             // "ThankForOrder"
    //         ],
    //         this.props.language
    //     )

    //     // this.setState({translations})
    // }
    
    render(){
        const {translationsReady} = this.state;

        const { facebook, instagram, tripadvisor, thefork,
            language, 
            message, translations
         } = this.props

        //  console.debug("Social props:", this.props)

        // const {translations } = this.state 

        // if( !translationsReady )
        //  return <Spinner />

        // const _t = _T( translations , language, defaultlanguage);

        // translate with current translations
        const _t = (key, lang) => this._tr(key, lang, translations)

        return(
            <div className="panel social-container rectangular">
                <Container className="social-footer">
                    <ThumbsUp className="thumbs-up" />
                    {message && 
                        <div className="thank-you">
                            {message}
                        </div>
                    }
                    <div className="opinion">
                        { _t("YourOpinionIs", language) }
                    </div>
                    <div className="icons">
                        {
                            instagram &&
                            <a href={instagram} target="_blank" rel="no-referrer">
                                <InstagramIcon/>
                            </a>
                        }
                        {
                            facebook &&
                            <a href={facebook} target="_blank" rel="no-referrer">
                                 <FacebookIcon/>
                            </a>
                        }
                        {
                            tripadvisor &&
                            <a href={tripadvisor} target="_blank" rel="no-referrer">
                                <TripadvisorIcon/>
                            </a>
                        }
                        {
                            thefork &&
                            <a href={thefork} target="_blank" rel="no-referrer">
                                <TheForkIcon/>
                            </a>
                        }
                       
                        
                        
                    </div>
                </Container>
            </div>
        )
    }
}

// export default connect(
//     state => ({ language: state.app.language, translations: state.translation})
// )(Social)

export default connect(Social)
import React from 'react'
import './style.scss'
import { Paper, Grid, Container, Button, Modal } from '@material-ui/core'
import {
    ChevronLeft, ChevronRight
//     LocationOnOutlined as Location,
//     // FastfoodOutlined as Food,
//     // PhoneInTalkOutlined as Phone,
//     AccessTimeOutlined as Time
} from '@material-ui/icons'
import ErrorPage from '../../template/common/error-loading'
import Social from '../social'
import { Link, Redirect } from 'react-router-dom'
import Service, {tr} from '../../../services/translations'
// import A from '../../../redux/actionTypes'
// import { connect } from 'react-redux'
import Spinner from '../../template/common/Spinner'
// import TopBar from '../topbar'
import { Link as ALink } from 'react-dom'
import CSSCarousel from '../../template/common/css-carousel';
import {
    PhoneCall as Phone, 
    Chef,
    TheForkIcon,
    TripadvisorIcon,
    Clock as Time,
    Tag,
    MapMarker as Location,
    TripadvisorRatingCheck, TripadvisorRatingEmpty,
    External
} from '../../template/common/icons'
import GoogleMaps from "simple-react-google-maps/lib/index-updated";  
import DefaultComponent, {connect} from '../../DefaultComponent'
// import GoogleMaps from "../../GoogleMap";  

const MEDIA = process.env.REACT_APP_MEDIA
const MAP_API = process.env.REACT_APP_GOOGLE_API


const TheForkWidget = ({ link, rating, comments, comments_text = "comments", reviews_text="Reviews"}) => {
    return (
    <div className="widget thefork">
        <div>
            <div className="rating-container" >
                <TheForkIcon className="c-green" />
                    {rating && <div className="rating"><span>{rating}</span>/10</div>}
            </div>
            <div className="comments">{comments} {comments_text}</div>
        </div>
        <div><a target="_blank" rel="no-referrer" href={link}>{reviews_text}</a></div>
    </div>
    )
}

const TripadvisorWidget = ({ link, rating, comments, comments_text="comments", reviews_text="Reviews"}) => {
    return (
    <div className="widget tripadvisor">
        <div>
            <div className="rating-container">
                <TripadvisorIcon className="c-green" />   
                {rating && <div className="rating">
                    {[1,2,3,4,5].map( ind => 
                        ind <= rating ? <TripadvisorRatingCheck/> : <TripadvisorRatingEmpty />
                        )}
                    </div>} 
            </div>
            <div className="comments">{comments} {comments_text}</div>
        </div>
        <div><a target="_blank" rel="no-referrer" href={link}>{reviews_text}</a></div>
    </div>
    )
}


// class RestaurantDetails extends React.Component {
class RestaurantDetails extends DefaultComponent {

    state = {
        restaurant: null
    }

    _carousel = React.createRef(); // top carousel

    constructor(props){
        super(props)

        this.setTranslations(
            [
                "CallUs",
                "comments",
                "Reviews",
                "average_price",
                "Menu"
            ]
        )
    }

    // componentDidMount() {


    //     this.fetchData()
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.language !== this.props.language
    //         || this.props.slug !== prevProps.slug) {
    //         this.fetchData()
    //     }
    // }

    // async fetchData() {
    //     Service.getByKeys([
    //         "CallUs", 
    //         "comments",
    //         "Reviews"
    //     ])
    // }

    nextSlide = () => {
        this._carousel && this._carousel.current && this._carousel.current.nextSlide() 
    }

    prevSlide = () => {
        this._carousel && this._carousel.current && this._carousel.current.prevSlide() 
    }

    render() {

        // const {restaurant} = this.state

        const { language, restaurant, slug, translations           
        } = this.props

        if (!language) {
            // redirect to language selector
            // return <Redirect to={`/${slug}/language`} />
            // this.props.setOverlay({overlay: "language", slug})
        }

        const _t = key => tr(key, language, translations)

        const {
            thefork, theforkrating, theforkcomments,  
            tripadvisor, tripadvisorrating, tripadvisorcomments,
            lat, lng,
            averageprice
        } = restaurant

        return (
            restaurant ?
                <Modal open className="details-modal">
                    <Paper elevation="3" className="wrapper  rectangular" >

                        <Container className="restaurant flex column flex-grow">
                            <h1 className="top-title">
                                {restaurant.title}                                
                                <div className="arrows">
                                    <ChevronLeft className="arrow left"  onClick={ this.prevSlide }/>
                                    <ChevronRight className="arrow right" onClick={ this.nextSlide } />
                                </div>
                            </h1>
                            <div className="share"
                                onClick={() => 

                                    navigator.share && navigator.share({
                                        title: restaurant.title,
                                        url: window.location
                                    }).then( () => {
                                        console.log('Thanks for sharing!');
                                    })
                                    .catch(console.error)
                                
                                }
                            >
                                <External />
                            </div>
                            <CSSCarousel
                                id={"restaurant-images"}
                                useJs={true}
                                slidesCssClass="disable-scrollbars"
                                ref={this._carousel}
                            >
                                {restaurant.photos.map((p, pInd) => {
                                    return (
                                        <div className="image-container"
                                            style={{ backgroundImage: `url(${MEDIA}/images/restaurants/${slug}/restaurant/${p})` }}
                                            key={`img-${pInd}`}
                                        ></div>
                                    )
                                })}
                            </CSSCarousel>
                            <Paper className="restaurant-details panel">
                                <Grid container>
                                    <Grid item xs={12} className="details-text">
                                        <div>
                                            <Chef className="details-icon"/> {restaurant.cuisines.join(", ")}
                                        </div>
                                        <div>
                                            <Time className="details-icon"/> {restaurant.workinghours}
                                        </div>
                                        <div>
                                            <Tag className="details-icon"/>{_t("average_price")} <span className="green">  ~{restaurant.averageprice}&euro;</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} className="call-buttons align-item-end hide-on-mobile">
                                        <Button component={Link} to={`/${slug}`} className="bg-light-gray">{_t("Menu")}</Button>
                                        <Button className="bg-green c-white"
                                        component={ALink}
                                        href={`tel:+${restaurant.phone}`}
                                        ><Phone className="c-white"/>{_t("CallUs")}</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                            {/* <div className="contact-buttons show-on-mobile">
                                {restaurant.phone &&
                                    <Button
                                        className="contact-button"
                                        component={ALink}
                                        href={`tel:+${restaurant.phone}`}
                                    ><PhoneCall /> Call us</Button>
                                }
                            </div> */}
                            <Paper className="restaurant-details panel">
                                <div className="details-text">
                                    <div className="restaurant-title">{restaurant.title}</div>
                                    <div>
                                        <Location className="details-icon" /> {restaurant.address}
                                    </div>
                                </div>
                                {/* <div className="map"></div> */}
                                <GoogleMaps
                                    apiKey={MAP_API}
                                    style={{height: "200px", width: "100%"}}
                                    zoom={15}
                                    center={{lat, lng}}
                                    markers={{lat, lng}}
                                    // disableDefaultUI={true}
                                    additionalProps={{
                                        disableDefaultUI:true
                                    }}
                                    />
                            </Paper>
                            
                            

                            <div className="widgets">
                                { thefork && 
                                <TheForkWidget
                                    link={thefork}
                                    rating={theforkrating}
                                    comments={theforkcomments}
                                    comments_text={_t("comments")}
                                    reviews_text={_t("Reviews")}
                                />}
                                { tripadvisor && 
                                <TripadvisorWidget
                                    link={tripadvisor}
                                    rating={tripadvisorrating}
                                    comments={tripadvisorcomments}
                                    comments_text={_t("comments")}
                                    reviews_text={_t("Reviews")}
                                />}
                            </div>
                        
                            <Social {...{ ...restaurant }} message=""/> 
                        </Container>                       
                    </Paper>
                </Modal>
                : restaurant === null ? <Spinner /> : <ErrorPage />

        )
    }
}
export default connect(RestaurantDetails)
// export default connect(
//     state => ({...state.app, translations: state.translation }),
//     dispatch => ({
//         lang: payload => dispatch({ type: A.SET_LANGUAGE, payload }),
//         setOverlay: payload => dispatch( {type: A.SET_OVERLAY, payload })
//     })
// )(RestaurantDetails)
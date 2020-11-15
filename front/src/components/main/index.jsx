import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import Footer from '../template/footer'
import Routes from '../routes'
import routes from '../../data/routes'
// import { connect } from 'react-redux'
// import A from '../../redux/actionTypes'
// import Actions from '../../redux/actions'
import "./main.scss"
// import CartWidget from '../cart/cart-widget'

// let usageDefer = Date.now()
// const deferUsageDelay = 1000 // ms

class Main extends React.Component {


    render() {
        const { location, showDrawer } = this.props
        return (
            <Router>
                <div className={`main ${showDrawer ? "drawer-open" : ""}`}>
                    <Routes routes={routes} />
                </div>
            </Router>
        )
    }
}

export default Main
// connect(
//     state => ({showDrawer: state.showDrawer, tokenTimestamp: state.tokenTimestamp }) ,
//     dispatch => ({
//         setUsageTime: () => dispatch({ type: A.SET_USAGE_TIMESTAMP })
//     })
// )(Main)
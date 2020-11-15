import React from 'react'
import {Container, Typography} from '@material-ui/core'
import './placeholder.scss'
class Home extends React.Component{

    render(){
        return(
            <div className="placeholder-container">
                <h1 className="title">Don't waste your time, <br/> taste the world every day!</h1>
                <div className="subtitle">We join you soon, Foodfans Team </div>
            </div>
        ) 
    }
}

export default Home
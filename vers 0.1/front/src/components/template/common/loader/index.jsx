import React from 'react'
import {CircularProgress, Container, Typography} from '@material-ui/core'
import "./loader.scss"

class Loader extends React.Component{

    render(){
        const { data,
             children,
             loadingText,
             errorText = "Error fetching data from server. Please, try reloading the page.",
             errorProps = { color: "error"}
            } = this.props
            console.log("Loader data:", data)
        return(
            // data === null ? 
            // <Container className="spinner-container"><CircularProgress/><span>{loadingText}</span></Container> : 
            // children(data)
            data === null ?
            <Container className="spinner-container"><CircularProgress/><span>{loadingText}</span></Container> :
            data === false || data === undefined ?
            <Typography {...errorProps} >{errorText}</Typography> :
            //typeof children === "function" ? 
            children(data)
        )
    }
}

export default Loader
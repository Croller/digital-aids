import { InputBase } from '@material-ui/core'
import React from 'react'
import './style.scss'
import {Close} from '@material-ui/icons';
import {Search as Icon } from '../../common/icons'
// import Service, {tr} from '../../../../services/translations'

let searchTimeout

class MobileSearch extends React.Component{

    state = { 
        value: "",
        open: false
    }

    componentDidMount(){
        const {value} = this.props 
        if( value !== this.state.value )
            this.setState({value})
        // this.fetchTranslation();
    }

    // fetchTranslation = () => {
    //     const {restaurant} = this.props 

    //     Service.getByKeys([
    //         "Search",
            
    //     ])
    // }

    componentDidUpdate(prevProps){
        if( prevProps.value !== this.props.value )
            this.setState({value: this.props.value })
    }

    doSearch = ev => {
        const {value} = ev.target
        console.debug("called onSearch with", value)
        const {onSearch = console.debug, debounceTime = 600 } = this.props

        this.setState({value})

        // debounce the search
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout( () => onSearch(value), debounceTime )
    }

    toggleOpen = (val) => {
        
        // if passed value not null and not equals current state value, change it. 
        
        this.setState( { open: !this.state.open } )
        // if( val === null )
        // this.setState( { open: !this.state.open } )
        // else {
        //     if( val !== this.state.open ){
        //         this.setState( { open: val } )
        //     }
        // }        
    }

    render(){
        const { 
            placeholderText = "Search",
            inputBaseProps = { className : "search-input", type: "search" },
            // inputBaseProps = { className : "search-input", placeholder: "Search", type: "search" },
            IconElement = Icon,
            iconProps = { className: "icon-btn" },
            onSearch, // cut it away from props
            ...other
        } = this.props

        let {
            className = "search-container mobile-search" 
        } = this.props

        inputBaseProps.placeholder = inputBaseProps.placeholder || placeholderText;

        const {value, open} = this.state

        const hasValue = value !== "";

        className = `${className} ${open ? "open" : "" } ${hasValue ? "has-value" : "no-value"}`
        
        return(
            <div className="mobile-search-wrapper">
                <div className={className} {...other} >
                    <IconElement {...iconProps} onClick={this.toggleOpen} />
                    <div className="background">
                        <InputBase {...inputBaseProps } onInput = {this.doSearch} value={value} />
                    </div>
                    <Close 
                        className="close-search-icon"
                        onClick={this.toggleOpen}
                    />
                </div>
            </div>
        )
    }
}

export default MobileSearch
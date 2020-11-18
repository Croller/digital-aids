import { InputBase } from '@material-ui/core'
import React from 'react'
import './style.scss'
// import {ReactComponent as Icon} from '../../../../assets/svg/magnif.svg'
import {Search as Icon } from '../../common/icons'

let searchTimeout

class Search extends React.Component{

    state = { value: null }

    componentDidMount(){
        const {value} = this.props 
        if( value !== this.state.value )
            this.setState({value})
    }

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

    render(){
        const { 
            className = "search-container" ,
            inputBaseProps = { className : "search-input", placeholder: "Search", type: "search" },
            IconElement = Icon,
            iconProps = { className: "search-icon" },
            ...other
        } = this.props

        const {value} = this.state
        return(
            <div className={className} {...other} >
                <IconElement {...iconProps} />
                <InputBase {...inputBaseProps } onInput = {this.doSearch} value={value} />
            </div>
        )
    }
}

export default Search
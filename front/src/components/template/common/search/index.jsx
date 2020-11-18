import { InputBase } from '@material-ui/core'
import React from 'react'
import './style.scss'
// import {ReactComponent as Icon} from '../../../../assets/svg/magnif.svg'
import {Search as Icon } from '../../common/icons'

let searchTimeout

class Search extends React.Component{

    doSearch = ev => {
        const {value} = ev.target
        console.debug("called onSearch with", value)
        const {onSearch = console.debug, debounceTime = 600 } = this.props

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
        return(
            <div className={className} {...other} >
                <IconElement {...iconProps} />
                <InputBase {...inputBaseProps } onInput = {this.doSearch} />
            </div>
        )
    }
}

export default Search
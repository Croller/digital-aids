import React from 'react'
import {Switch} from 'react-router-dom'
import Route from '../template/scrollToTop' // route with auto-scroll to top on navigation


const RoutesComponent = props => {

    const { routes= []} = props

    return (
        <Switch>            
            {routes.map( (route, ind) => <Route {...{...route, key: `route-${ind}`}} /> )}
        </Switch>
    )
}

export default RoutesComponent;
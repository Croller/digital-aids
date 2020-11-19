import { Button } from '@material-ui/core'
import React from 'react'
import {RefreshOutlined} from '@material-ui/icons'
import "./error-loading.scss"

export default props => (
    <>
        <h2>Error loading data</h2>
        <p>There was a problem loading data, please try reloadin the page</p>
        <div>
            <Button onClick={window.location.reload}><RefreshOutlined/> Reload page</Button>
        </div>
    </>
)
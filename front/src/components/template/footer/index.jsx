import React from 'react'
import { Box } from '@material-ui/core'


class Footer extends React.Component{

    render(){
        return(
            <Box className="footer" bgcolor="primary.main">
                &copy;&nbsp;Food & Fans, 2020
            </Box>
        )
    }
}

export default Footer
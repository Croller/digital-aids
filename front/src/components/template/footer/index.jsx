import React from 'react'
import { Box, Button } from '@material-ui/core'
import {LanguageOutlined as World, RoomServiceOutlined as Cloche, PhoneInTalkOutlined as Phone} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import './footer.scss'

class Footer extends React.Component{

    render(){
        const {slug} = this.props
        return(
            <Box className="footer" >
                {/* &copy;&nbsp;Food & Fans, 2020 */}
                <div className="mobile-footer">
                    <Button><World/></Button>
                    <Button component={Link} to={`/${slug}/cart`}><Cloche/></Button>
                    <Button><Phone/></Button>
                </div>
            </Box>
        )
    }
}

export default Footer
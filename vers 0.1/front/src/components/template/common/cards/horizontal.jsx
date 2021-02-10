import React from 'react'
import { Card, Grid, Typography, CardActionArea, CardContent } from '@material-ui/core'

import {Link} from  'react-router-dom'

class HorizontalCard extends React.Component{

    render(){
        const {
            className = "horizontal-card",
            title, link, description, image, ...other
        } = this.props
        return(
            <Card className={className} {...other}>
                <CardActionArea component={Link} to={link}> 
                    <Grid container>
                        <Grid item xs={12} sm={3}>
                            Image
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <CardContent>
                                <div className="card-header">{title}</div>    
                                <div className="card-description">{description}</div>    
                            </CardContent>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        )
    }
}

export default HorizontalCard
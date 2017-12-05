// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';


const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
};

function SimpleMediaCard(props) {
    const {classes, data} = props;
    return (
        <Grid item xs={12} sm={12} md={12}>
            <Card className={classes.card}>
                {/*<CardMedia*/}
                {/*className={classes.media}*/}
                {/*image="/static/images/cards/contemplative-reptile.jpg"*/}
                {/*title="Contemplative Reptile"*/}
                {/*/>*/}
                <CardContent>
                    <Typography type="headline" component="h2">
                        {data.name}
                    </Typography>
                    <Typography component="p">
                        {data.desc}
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href={data.url} style={{textDecoration: 'none'}}>
                        <Button dense color="primary">更多</Button>
                    </a>
                    {/*<Button dense color="primary">*/}
                    {/*Learn More*/}
                    {/*</Button>*/}
                </CardActions>
            </Card>
        </Grid>
    );
}

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
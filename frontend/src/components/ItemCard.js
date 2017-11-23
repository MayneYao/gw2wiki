import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent, CardMedia, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

const styles = theme => ({
    card: {
        display: 'flex',
        width: '100%'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        height: 128,
        width: 350,
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 64,
        height: 64,
    },
});

function MediaControlCard(props) {
    const {classes, theme, item} = props;

    return (
        <div className={item.rarity}>
            <Card className={classes.card} >
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography type="subheading" className={item.rarity}>{item.name}</Typography>
                        <Typography type="body2" color="secondary" noWrap>
                            {item.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button dense>查看详情</Button>
                    </CardActions>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={item.icon}
                    title={item.name}
                />

            </Card>
        </div>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MediaControlCard);
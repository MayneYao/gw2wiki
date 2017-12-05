import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent, CardMedia, CardActions} from 'material-ui/Card';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import classnames from 'classnames';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import FeedBackIcon from 'material-ui-icons/Feedback'
import ImportContactsIcon from 'material-ui-icons/ImportContacts'
import Collapse from 'material-ui/transitions/Collapse';
import Recipe from '../components/ItemRecipe'
import Grid from 'material-ui/Grid';
import {
    HashRouter as Router,
    Route,
    Link,
} from 'react-router-dom'

const styles = theme => ({
    card: {
        display: 'flex',
        // width: '414px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 64,
        height: 64,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    item: {
        // padding: 16,
        // width: 300
    }
});

const ItemAttr = (label, val) => {
    const div = (
        <Grid container spacing={24}>
            <Grid item xs={3}>
                <span>{label}</span>
            </Grid>
            <Grid item xs>
                <span>{val}</span>
            </Grid>
        </Grid>
    )
    return div
}


class MediaControlCard extends (React.Component) {
    constructor(props) {
        super(props)
        this.state = {expanded: false}
    }

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        const {classes, theme, item, recipe} = this.props;
        return (
            <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                    <div className={classes.details}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                <CardContent className={item.rarity}>
                                    <Grid container>
                                        <Grid item xs={3} sm={3} md={3}>
                                            <img src={item.icon} alt="" style={{width: '64px', height: '64px'}}/>
                                        </Grid>
                                        <Grid item xs={9} sm={9} md={9}>
                                            <Typography type="subheading"
                                                        className={item.rarity}>{item.name}({item.name_en})</Typography>
                                            <Typography type="body2" color="secondary">
                                                {item.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <CardActions>

                                    {
                                        recipe.length > 0 ?
                                            <Link to={`/recipe/${item.id}`}>
                                                <IconButton>
                                                    <ImportContactsIcon/>
                                                </IconButton>
                                            </Link>
                                            :
                                            <div></div>

                                    }
                                    <div className={classes.flexGrow}/>
                                    <IconButton
                                        className={classnames(classes.expand, {
                                            [classes.expandOpen]: this.state.expanded,
                                        })}
                                        onClick={this.handleExpandClick}
                                        aria-expanded={this.state.expanded}
                                        aria-label="Show more"
                                    >
                                        <ExpandMoreIcon/>
                                    </IconButton>
                                </CardActions>
                                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                                    <CardContent>
                                        <List>
                                            <ListItem>
                                                {
                                                    ItemAttr('描述', item.description)
                                                }
                                            </ListItem>
                                            <ListItem>
                                                {
                                                    ItemAttr('类型', item.type)
                                                }
                                            </ListItem>
                                            <ListItem>
                                                {
                                                    ItemAttr('聊天代码', item.chat_link)
                                                }
                                            </ListItem>
                                            <ListItem>
                                                {
                                                    ItemAttr('出售价格', item.vendor_value)
                                                }
                                            </ListItem>
                                            <ListItem>
                                                {
                                                    ItemAttr('游戏类型', item.game_types.map(gtype => {
                                                        return <Button>{gtype}</Button>
                                                    }))
                                                }
                                            </ListItem>
                                            <ListItem>
                                                {
                                                    ItemAttr('标签', item.flags.map(flag => {
                                                        return <Button>{flag}</Button>
                                                    }))
                                                }
                                            </ListItem>
                                            <ListItem>
                                                {
                                                    ItemAttr('限制', item.restrictions.map(item => {
                                                        return <Button>{item}</Button>
                                                    }))
                                                }
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Collapse>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </Grid>
        );
    }

}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MediaControlCard);
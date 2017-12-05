import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import {
    Link,
} from 'react-router-dom'

const mystyles = {
    root: {
        marginTop: 0,
        width: '100%',
        background: '#ffffff'
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    toolbar: {
        background: '#2196f3'
    },
    search: {
        flex: 1
    },
    btn: {
        flex: 1
    }
}


const styles = {
    list: {
        width: 250,
    },
    listFull: {
        width: 'auto',
    },
};

class TemporaryDrawer extends React.Component {
    state = {
        name: '',
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    handleChange = (e) => {
        if (e.target.value.length === 0) {
            this.setState({
                qword: false
            })
            this.props.setQword(false)
        }
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit = () => {
        // this.setState({
        //     qword: this.state.name
        // })

        this.props.setQword(this.state.name)
        // this.props.history.push({
        //     pathname: '/items',
        //     state: {
        //         qword: this.state.name
        //     }
        // })
    }

    handleEnter = (event) => {
        if (event.charCode == 13) {
            event.preventDefault();
            event.stopPropagation();
            this.handleSubmit()
        }
    }

    render() {
        const {classes} = this.props;

        const sideList = (
            <div className={classes.list}>

                <Divider/>

            </div>
        );

        return (
            <div>
                <div style={mystyles.root}>
                    <AppBar position="static">
                        <Toolbar style={mystyles.toolbar}>
                            <IconButton style={mystyles.menuButton} color="contrast" aria-label="Menu"
                                        onClick={this.toggleDrawer('left', true)}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" style={mystyles.flex}>
                                <Link to='/' style={{textDecoration: 'none', color: '#fff'}}>
                                    Gw2Wiki
                                </Link>
                            </Typography>
                            <FormControl style={mystyles.search}>
                                <Input id="qword" value={this.state.name} onChange={this.handleChange}
                                       onSubmit={this.handleSubmit}
                                       placeholder='搜索试试吧'
                                       fullWidth
                                       onKeyPress={this.handleEnter}
                                />
                            </FormControl>
                            <Button color="contrast" style={mystyles.btn}></Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <Drawer open={this.state.left} onRequestClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';

import ItemList from '../pages/ItemList';
import WikiList from '../pages/WikiLIst';

function TabContainer({children, dir}) {
    return (
        <div dir={dir} style={{padding: 8 * 3}}>
            {children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
});

class FullWidthTabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            qword: this.props.qword
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({qword: nextProps.qword});
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes, theme} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="物品"/>
                        <Tab label="wiki"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}><ItemList qword={this.state.qword}/></TabContainer>
                    <TabContainer dir={theme.direction}><WikiList qword={this.state.qword}/></TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(FullWidthTabs);
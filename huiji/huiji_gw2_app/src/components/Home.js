import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import green from 'material-ui/colors/green'
import ItemList from './Item/ItemList'

function TabContainer (props) {
	const {children, dir} = props

	return (
		<Typography component="div" dir={dir} style={{padding: 8 * 3}}>
			{children}
		</Typography>
	)
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
}

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
		position: 'relative',
		minHeight: 200,
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
	},
	fabGreen: {
		color: theme.palette.common.white,
		backgroundColor: green[500],
	},
})

class FloatingActionButtonZoom extends React.Component {
	state = {
		value: 0,
	}

	handleChange = (event, value) => {
		this.setState({value})
	}

	handleChangeIndex = index => {
		this.setState({value: index})
	}

	getMore = () => {
		console.log('mmmm')
	}

	render () {
		const {classes, theme} = this.props
		// const transitionDuration = {
		// 	enter: theme.transitions.duration.enteringScreen,
		// 	exit: theme.transitions.duration.leavingScreen,
		// }
		//
		// const fabs = [
		// 	{
		// 		color: 'primary',
		// 		className: classes.fab,
		// 		icon: <MoreIcon onClick={this.getMore}/>,
		// 	},
		// 	{
		// 		color: 'secondary',
		// 		className: classes.fab,
		// 		icon: <EditIcon/>,
		// 	},
		// 	{
		// 		color: 'inherit',
		// 		className: classNames(classes.fab, classes.fabGreen),
		// 		icon: <UpIcon/>,
		// 	},
		// ]

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
						<Tab label="技能"/>
						{/*<Tab label="计时器" />*/}
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.value}
					onChangeIndex={this.handleChangeIndex}
				>
					<TabContainer dir={theme.direction} style={{padding: 0}}>
						<ItemList/>
					</TabContainer>
					<TabContainer dir={theme.direction}>"马上"就做好了，敬请期待</TabContainer>
					{/*<TabContainer dir={theme.direction}>Item Three</TabContainer>*/}
				</SwipeableViews>
				{/*{fabs.map((fab, index) => (*/}
				{/*<Zoom*/}
				{/*key={fab.color}*/}
				{/*in={this.state.value === index}*/}
				{/*timeout={transitionDuration}*/}
				{/*style={{*/}
				{/*transitionDelay: this.state.value === index ? transitionDuration.exit : 0,*/}
				{/*}}*/}
				{/*unmountOnExit*/}
				{/*>*/}
				{/*<Button variant="fab" className={fab.className} color={fab.color}>*/}
				{/*{fab.icon}*/}
				{/*</Button>*/}
				{/*</Zoom>*/}
				{/*))}*/}
			</div>
		)
	}
}

FloatingActionButtonZoom.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(FloatingActionButtonZoom)
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from './Dialog';

const styles = {
	media: {
		height: 18,
		width: 18,
		float: 'left'
	},
	name: {
		lineHeight: '18px'
	},
	Junk: {
		color: '#aaa'
	},

	Basic: {
		color: '#000'
	},

	Fine: {
		color: '#62a4da'
	},

	Masterwork: {
		color: '#1a9306'
	},

	Rare: {
		color: '#fcd00b'
	},

	Exotic: {
		color: '#ffa405'
	},

	Ascended: {
		color: '#fb3e8d'
	},

	Legendary: {
		color: '#4c139d'
	}
};

class ItemCard extends React.Component {

	handleClickOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	render() {
		const {
			classes, data: {
				icon, name, rarity
			}
		} = this.props;
		return (
			<div>
				<div onClick={this.handleClickOpen}>
					<img
						className={classes.media}
						src={icon}
						title={name}
					/>
					<p className={`${classes[rarity]} ${classes.name}`}>
						{name}
					</p>
				</div>
				<Dialog
					open={this.state.open}
					handleClose={this.handleClose}
					data={this.props.data}
				/>
			</div>

		);
	}
}

ItemCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard);